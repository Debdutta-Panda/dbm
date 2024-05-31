import mysql from "mysql";
import query from "./q.mjs";
import util from "util";

export default class Dbm {
	constructor(config) {
		this.config = config;
		this.connection = undefined;
		this.lastError = undefined;
		this.connected = false;
		this.query = query(this);
	}
	extractWhereClause(query) {
		const wherePattern = /where\s+(.+)$/i;
		const match = query.match(wherePattern);
		if (match) {
			return match[1];
		} else {
			return null;
		}
	}
	async _connect() {
		this.lastError = undefined;
		if (!this.connection) {
			return;
		}
		return new Promise((resolve) => {
			this.connection.connect((err) => {
				if (err) {
					this.lastError = err;
					this.connected = false;
					resolve(false);
				} else {
					this.connected = true;
					resolve(true);
				}
			});
		});
	}
	async start() {
		this.lastError = undefined;
		if (this.started) {
			this.lastError = new Error("Already started");
			return;
		}
		this.connection = mysql.createConnection({
			host: this.config.host,
			user: this.config.user,
			password: this.config.password,
			database: this.config.database,
		});
		this.started = true;
		return await this._connect();
	}

	async end() {
		this.lastError = undefined;
		if (!this.started) {
			this.lastError = new Error("Not started yet");
			return false;
		}
		if (!this.connected) {
			this.lastError = new Error("Not connected yet");
			return false;
		}
		return new Promise((resolve) => {
			this.connection.end((err) => {
				if (err) {
					this.lastError = err;
					resolve(false);
				} else {
					resolve(true);
				}
			});
		});
	}
	async execute(query, retrieve) {
		if (typeof query !== "string") {
			return null;
		}
		const ql = query.toLowerCase();
		let type = "none";
		if (ql.startsWith("select")) {
			type = "select";
		} else if (ql.startsWith("update")) {
			type = "update";
		} else if (ql.startsWith("insert")) {
			type = "insert";
		} else if (ql.startsWith("delete")) {
			type = "delete";
		} else {
			return null;
		}
		return this.executeTypedQuery(type, query, retrieve);
	}
	async executeTypedQuery(type, query, retrieve) {
		switch (type) {
			case "select":
				return this.executeSelectQuery(query, retrieve);
			case "update":
				return this.executeUpdateQuery(query, retrieve);
			case "insert":
				return this.executeInsertQuery(query, retrieve);
			case "delete":
				return this.executeDeleteQuery(query, retrieve);
		}
	}
	async executeDeleteQuery(query, retrieve) {
		if (!retrieve) {
			const [error, results, fields] =
				await this.rawQueryExecute(query);
			if (error) {
				return false;
			}
			return results.affectedRows > 0;
		}
		const where = this.extractWhereClause(query);
		const table = this.currentTable;
		this.currentTable = undefined;
		///////////////////
		let selectQuery = `select * from ${table}`;
		if (where) {
			selectQuery += ` where ${where}`;
		}
		const items = await this.executeSelectQuery(selectQuery);
		///////////////////
		const [error, results, fields] = await this.rawQueryExecute(
			query
		);
		if (error) {
			return null;
		}
		return items;
	}
	async executeInsertQuery(query, retrieve) {
		if (!retrieve) {
			const [error, results, fields] =
				await this.rawQueryExecute(query);
			if (error) {
				return false;
			}
			return true;
		}
		const table = this.currentTable;
		this.currentTable = undefined;
		const [error, results, fields] = await this.rawQueryExecute(
			query
		);
		if (error) {
			return null;
		}
		const primaryColumn = await this.primaryColumn(table);
		const insertId = results.insertId;
		const affectedRows = results.affectedRows;

		let selectQuery;
		if (affectedRows === 1) {
			selectQuery = `select * from ${table} where ${primaryColumn} = ${insertId}`;
		} else if (affectedRows > 1) {
			const first = insertId - affectedRows + 1;
			const indices = [];
			for (let i = first; i <= insertId; ++i) {
				indices.push(i);
			}
			const inListString = indices.join(",");
			selectQuery = `select * from ${table} where ${primaryColumn} in (${inListString})`;
		}
		const lastError = this.lastError;
		const items = await this.executeSelectQuery(selectQuery);
		this.lastError = lastError;
		return items;
	}

	async executeSelectQuery(query, retrieve) {
		const [error, results, fields] = await this.rawQueryExecute(
			query
		);
		if (error) {
			return null;
		}
		return results;
	}

	async executeUpdateQuery(query, retrieve) {
		if (!retrieve) {
			const [error, results, fields] =
				await this.rawQueryExecute(query);
			if (error) {
				return 0;
			}
			return results.changedRows;
		}
		const where = this.extractWhereClause(query);
		const table = this.currentTable;
		this.currentTable = undefined;
		const [error, results, fields] = await this.rawQueryExecute(
			query
		);
		if (error) {
			return null;
		}
		let selectQuery = `select * from ${table}`;
		if (where) {
			selectQuery += ` where ${where}`;
		}
		const lastError = this.lastError;
		const items = await this.executeSelectQuery(selectQuery);
		this.lastError = lastError;
		return items;
	}

	async primaryColumn(table) {
		const [error, results, fields] = await this.rawQueryExecute(`
			SELECT
				COLUMN_NAME
			FROM
				INFORMATION_SCHEMA.KEY_COLUMN_USAGE
			WHERE
				TABLE_SCHEMA = '${this.config.database}'
				AND TABLE_NAME = '${table}'
				AND CONSTRAINT_NAME = 'PRIMARY'
		`);
		if (error) {
			return null;
		}
		return results[0].COLUMN_NAME;
	}

	async rawQueryExecute(query) {
		this.lastError = undefined;
		return new Promise((resolve) => {
			this.connection.query(query, (err, result, fields) => {
				if (err) {
					this.lastError = err;
				}
				console.log(err, result, fields);
				resolve([err, result, fields]);
			});
		});
	}
	////////////////////////
	async startTransaction() {
		const connection = this.connection;
		await util.promisify(connection.query).bind(connection)(
			"SET TRANSACTION ISOLATION LEVEL READ COMMITTED"
		);
		await util.promisify(connection.query).bind(connection)(
			"SET autocommit = 0"
		);
		await util.promisify(connection.query).bind(connection)(
			"START TRANSACTION"
		);
		connection.INTRANSACTION = true;
		connection.COMMITTED = false;
	}

	async commit() {
		const connection = this.connection;
		await util.promisify(connection.query).bind(connection)(
			"COMMIT"
		);
		await util.promisify(connection.query).bind(connection)(
			"SET autocommit = 1"
		);
		connection.INTRANSACTION = false;
		connection.COMMITTED = true;
		release(connection);
	}

	async rollback() {
		const connection = this.connection;
		await util.promisify(connection.query).bind(connection)(
			"ROLLBACK"
		);
		await connection.destroy();
	}
}
