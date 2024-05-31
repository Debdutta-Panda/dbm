import Dbm from "./dbm.mjs";

const dbm = new Dbm({
	host: "gstappdb.ctsem28govhi.ap-south-1.rds.amazonaws.com",
	user: "admin",
	password: "90029732aA",
	database: "gstappdb",
});
await dbm.start();
console.log(
	await dbm.query
		.insert()
		.into("TestTable")
		.setFieldsRows([{ name: "Thomas" }, { name: "Jane" }])
		.execute()
);
////////////////////////
await dbm.end();
