export default function query(dbm) {
	"use strict";
	function t(t, e) {
		if (!t)
			throw new ReferenceError(
				"this hasn't been initialised - super() hasn't been called"
			);
		return !e || ("object" != typeof e && "function" != typeof e)
			? t
			: e;
	}
	function e(t, e) {
		if ("function" != typeof e && null !== e)
			throw new TypeError(
				"Super expression must either be null or a function, not " +
					typeof e
			);
		(t.prototype = Object.create(e && e.prototype, {
			constructor: {
				value: t,
				enumerable: !1,
				writable: !0,
				configurable: !0,
			},
		})),
			e &&
				(Object.setPrototypeOf
					? Object.setPrototypeOf(t, e)
					: (t.__proto__ = e));
	}
	function r(t, e) {
		if (!(t instanceof e))
			throw new TypeError(
				"Cannot call a class as a function"
			);
	}
	function n(t, e) {
		return t.length ? t + e : t;
	}
	function i(t) {
		for (
			var e = arguments.length,
				r = Array(e > 1 ? e - 1 : 0),
				n = 1;
			n < e;
			n++
		)
			r[n - 1] = arguments[n];
		if (t && r) {
			var i = function (e) {
					"object" ===
						("undefined" == typeof e
							? "undefined"
							: d(e)) &&
						Object.getOwnPropertyNames(
							e
						).forEach(function (r) {
							t[r] = e[r];
						});
				},
				o = !0,
				l = !1,
				a = void 0;
			try {
				for (
					var u, s = r[Symbol.iterator]();
					!(o = (u = s.next()).done);
					o = !0
				) {
					var c = u.value;
					i(c);
				}
			} catch (f) {
				(l = !0), (a = f);
			} finally {
				try {
					!o && s["return"] && s["return"]();
				} finally {
					if (l) throw a;
				}
			}
		}
		return t;
	}
	function o(t) {
		return t && t.constructor.prototype === Object.prototype;
	}
	function l(t) {
		return t && t.constructor.prototype === Array.prototype;
	}
	function a(t) {
		if (!t) return t;
		if ("function" == typeof t.clone) return t.clone();
		if (o(t) || l(t)) {
			var e = new t.constructor();
			return (
				Object.getOwnPropertyNames(t).forEach(function (
					r
				) {
					"function" != typeof t[r] &&
						(e[r] = a(t[r]));
				}),
				e
			);
		}
		return JSON.parse(JSON.stringify(t));
	}
	function u(t, e, r) {
		var n = "undefined" == typeof e ? "undefined" : d(e);
		if ("function" !== n && "string" !== n)
			throw new Error(
				"type must be a class constructor or string"
			);
		if ("function" != typeof r)
			throw new Error("handler must be a function");
		var i = !0,
			o = !1,
			l = void 0;
		try {
			for (
				var a, u = t[Symbol.iterator]();
				!(i = (a = u.next()).done);
				i = !0
			) {
				var s = a.value;
				if (s.type === e) return void (s.handler = r);
			}
		} catch (c) {
			(o = !0), (l = c);
		} finally {
			try {
				!i && u["return"] && u["return"]();
			} finally {
				if (o) throw l;
			}
		}
		t.push({ type: e, handler: r });
	}
	function s(t, e, r) {
		return c(t, e) || c(t, r);
	}
	function c(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			if (
				("undefined" == typeof t
					? "undefined"
					: d(t)) === n.type ||
				("string" != typeof n.type &&
					t instanceof n.type)
			)
				return n.handler;
		}
	}
	function f() {
		var c =
				arguments.length > 0 && void 0 !== arguments[0]
					? arguments[0]
					: null,
			f = {
				isSquelBuilder: function (t) {
					return t && !!t._toParamString;
				},
			},
			_ = function (t) {
				return (
					!f.isSquelBuilder(t) ||
					!t.options.rawNesting
				);
			};
		(f.DefaultQueryBuilderOptions = {
			autoQuoteTableNames: !1,
			autoQuoteFieldNames: !1,
			autoQuoteAliasNames: !0,
			useAsForTableAliasNames: !1,
			nameQuoteCharacter: "`",
			tableAliasQuoteCharacter: "`",
			fieldAliasQuoteCharacter: '"',
			valueHandlers: [],
			parameterCharacter: "?",
			numberedParameters: !1,
			numberedParametersPrefix: "$",
			numberedParametersStartAt: 1,
			replaceSingleQuotes: !1,
			singleQuoteReplacement: "''",
			separator: " ",
			stringFormatter: null,
			rawNesting: !1,
		}),
			(f.globalValueHandlers = []),
			(f.registerValueHandler = function (t, e) {
				u(f.globalValueHandlers, t, e);
			}),
			(f.Cloneable = (function () {
				function t() {
					r(this, t);
				}
				return (
					v(t, [
						{
							key: "clone",
							value: function () {
								var t =
									new this.constructor();
								return i(
									t,
									a(
										i(
											{},
											this
										)
									)
								);
							},
						},
					]),
					t
				);
			})()),
			(f.BaseBuilder = (function (n) {
				function o(e) {
					r(this, o);
					var n = t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).call(this)
						),
						l = JSON.parse(
							JSON.stringify(
								f.DefaultQueryBuilderOptions
							)
						);
					return (
						["stringFormatter"].forEach(
							function (t) {
								l[t] =
									f.DefaultQueryBuilderOptions[
										t
									];
							}
						),
						(n.options = i({}, l, e)),
						n
					);
				}
				return (
					e(o, n),
					v(o, [
						{
							key: "registerValueHandler",
							value: function (t, e) {
								return (
									u(
										this
											.options
											.valueHandlers,
										t,
										e
									),
									this
								);
							},
						},
						{
							key: "_sanitizeExpression",
							value: function (t) {
								if (
									!f.isSquelBuilder(
										t
									) &&
									"string" !=
										typeof t
								)
									throw new Error(
										"expression must be a string or builder instance"
									);
								return t;
							},
						},
						{
							key: "_sanitizeName",
							value: function (t, e) {
								if (
									"string" !=
									typeof t
								)
									throw new Error(
										e +
											" must be a string"
									);
								return t;
							},
						},
						{
							key: "_sanitizeField",
							value: function (t) {
								return (
									f.isSquelBuilder(
										t
									) ||
										(t =
											this._sanitizeName(
												t,
												"field name"
											)),
									t
								);
							},
						},
						{
							key: "_sanitizeBaseBuilder",
							value: function (t) {
								if (
									f.isSquelBuilder(
										t
									)
								)
									return t;
								throw new Error(
									"must be a builder instance"
								);
							},
						},
						{
							key: "_sanitizeTable",
							value: function (t) {
								if (
									"string" !=
									typeof t
								)
									try {
										t =
											this._sanitizeBaseBuilder(
												t
											);
									} catch (e) {
										throw new Error(
											"table name must be a string or a builder"
										);
									}
								else
									t =
										this._sanitizeName(
											t,
											"table"
										);
								return t;
							},
						},
						{
							key: "_sanitizeTableAlias",
							value: function (t) {
								return this._sanitizeName(
									t,
									"table alias"
								);
							},
						},
						{
							key: "_sanitizeFieldAlias",
							value: function (t) {
								return this._sanitizeName(
									t,
									"field alias"
								);
							},
						},
						{
							key: "_sanitizeLimitOffset",
							value: function (t) {
								if (
									((t =
										parseInt(
											t
										)),
									0 > t ||
										isNaN(
											t
										))
								)
									throw new Error(
										"limit/offset must be >= 0"
									);
								return t;
							},
						},
						{
							key: "_sanitizeValue",
							value: function (t) {
								var e =
									"undefined" ==
									typeof t
										? "undefined"
										: d(
												t
										  );
								if (null === t);
								else if (
									"string" ===
										e ||
									"number" ===
										e ||
									"boolean" ===
										e
								);
								else if (
									f.isSquelBuilder(
										t
									)
								);
								else {
									var r =
										!!s(
											t,
											this
												.options
												.valueHandlers,
											f.globalValueHandlers
										);
									if (!r)
										throw new Error(
											"field value must be a string, number, boolean, null or one of the registered custom value types"
										);
								}
								return t;
							},
						},
						{
							key: "_escapeValue",
							value: function (t) {
								return this
									.options
									.replaceSingleQuotes &&
									t
									? t.replace(
											/\'/g,
											this
												.options
												.singleQuoteReplacement
									  )
									: t;
							},
						},
						{
							key: "_formatTableName",
							value: function (t) {
								if (
									this
										.options
										.autoQuoteTableNames
								) {
									var e =
										this
											.options
											.nameQuoteCharacter;
									t =
										"" +
										e +
										t +
										e;
								}
								return t;
							},
						},
						{
							key: "_formatFieldAlias",
							value: function (t) {
								if (
									this
										.options
										.autoQuoteAliasNames
								) {
									var e =
										this
											.options
											.fieldAliasQuoteCharacter;
									t =
										"" +
										e +
										t +
										e;
								}
								return t;
							},
						},
						{
							key: "_formatTableAlias",
							value: function (t) {
								if (
									this
										.options
										.autoQuoteAliasNames
								) {
									var e =
										this
											.options
											.tableAliasQuoteCharacter;
									t =
										"" +
										e +
										t +
										e;
								}
								return this
									.options
									.useAsForTableAliasNames
									? "AS " +
											t
									: t;
							},
						},
						{
							key: "_formatFieldName",
							value: function (t) {
								var e =
									arguments.length >
										1 &&
									void 0 !==
										arguments[1]
										? arguments[1]
										: {};
								if (
									this
										.options
										.autoQuoteFieldNames
								) {
									var r =
										this
											.options
											.nameQuoteCharacter;
									t =
										e.ignorePeriodsForFieldNameQuotes
											? "" +
											  r +
											  t +
											  r
											: t
													.split(
														"."
													)
													.map(
														function (
															t
														) {
															return "*" ===
																t
																? t
																: "" +
																		r +
																		t +
																		r;
														}
													)
													.join(
														"."
													);
								}
								return t;
							},
						},
						{
							key: "_formatCustomValue",
							value: function (
								t,
								e,
								r
							) {
								var n = s(
									t,
									this
										.options
										.valueHandlers,
									f.globalValueHandlers
								);
								return n &&
									((t = n(
										t,
										e,
										r
									)),
									t &&
										t.rawNesting)
									? {
											formatted: !0,
											rawNesting: !0,
											value: t.value,
									  }
									: {
											formatted: !!n,
											value: t,
									  };
							},
						},
						{
							key: "_formatValueForParamArray",
							value: function (t) {
								var e = this,
									r =
										arguments.length >
											1 &&
										void 0 !==
											arguments[1]
											? arguments[1]
											: {};
								return l(t)
									? t.map(
											function (
												t
											) {
												return e._formatValueForParamArray(
													t,
													r
												);
											}
									  )
									: this._formatCustomValue(
											t,
											!0,
											r
									  )
											.value;
							},
						},
						{
							key: "_formatValueForQueryString",
							value: function (t) {
								var e = this,
									r =
										arguments.length >
											1 &&
										void 0 !==
											arguments[1]
											? arguments[1]
											: {},
									n =
										this._formatCustomValue(
											t,
											!1,
											r
										),
									i =
										n.rawNesting,
									o =
										n.formatted,
									a =
										n.value;
								if (o)
									return i
										? a
										: this._applyNestingFormatting(
												a,
												_(
													t
												)
										  );
								if (l(a))
									(a =
										a.map(
											function (
												t
											) {
												return e._formatValueForQueryString(
													t
												);
											}
										)),
										(a =
											this._applyNestingFormatting(
												a.join(
													", "
												),
												_(
													a
												)
											));
								else {
									var u =
										"undefined" ==
										typeof a
											? "undefined"
											: d(
													a
											  );
									if (
										null ===
										a
									)
										a =
											"NULL";
									else if (
										"boolean" ===
										u
									)
										a =
											a
												? "TRUE"
												: "FALSE";
									else if (
										f.isSquelBuilder(
											a
										)
									)
										a =
											this._applyNestingFormatting(
												a.toString(),
												_(
													a
												)
											);
									else if (
										"number" !==
										u
									) {
										if (
											"string" ===
												u &&
											this
												.options
												.stringFormatter
										)
											return this.options.stringFormatter(
												a
											);
										if (
											r.dontQuote
										)
											a =
												"" +
												a;
										else {
											var s =
												this._escapeValue(
													a
												);
											a =
												"'" +
												s +
												"'";
										}
									}
								}
								return a;
							},
						},
						{
							key: "_applyNestingFormatting",
							value: function (t) {
								var e =
									!(
										arguments.length >
											1 &&
										void 0 !==
											arguments[1]
									) ||
									arguments[1];
								if (
									t &&
									"string" ==
										typeof t &&
									e &&
									!this
										.options
										.rawNesting
								) {
									var r =
										"(" ===
											t.charAt(
												0
											) &&
										")" ===
											t.charAt(
												t.length -
													1
											);
									if (r)
										for (
											var n = 0,
												i = 1;
											t.length -
												1 >
											++n;

										) {
											var o =
												t.charAt(
													n
												);
											if (
												"(" ===
												o
											)
												i++;
											else if (
												")" ===
													o &&
												(i--,
												1 >
													i)
											) {
												r =
													!1;
												break;
											}
										}
									r ||
										(t =
											"(" +
											t +
											")");
								}
								return t;
							},
						},
						{
							key: "_buildString",
							value: function (t, e) {
								var r =
										arguments.length >
											2 &&
										void 0 !==
											arguments[2]
											? arguments[2]
											: {},
									n =
										r.nested,
									i =
										r.buildParameterized,
									o =
										r.formattingOptions;
								(e = e || []),
									(t =
										t ||
										"");
								for (
									var a =
											"",
										u =
											-1,
										s =
											[],
										c =
											this
												.options
												.parameterCharacter,
										h = 0;
									t.length >
									h;

								)
									if (
										t.substr(
											h,
											c.length
										) ===
										c
									) {
										var v =
											e[
												++u
											];
										if (
											i
										)
											if (
												f.isSquelBuilder(
													v
												)
											) {
												var d =
													v._toParamString(
														{
															buildParameterized:
																i,
															nested: !0,
														}
													);
												(a +=
													d.text),
													d.values.forEach(
														function (
															t
														) {
															return s.push(
																t
															);
														}
													);
											} else if (
												((v =
													this._formatValueForParamArray(
														v,
														o
													)),
												l(
													v
												))
											) {
												var _ =
													v
														.map(
															function () {
																return c;
															}
														)
														.join(
															", "
														);
												(a +=
													"(" +
													_ +
													")"),
													v.forEach(
														function (
															t
														) {
															return s.push(
																t
															);
														}
													);
											} else
												(a +=
													c),
													s.push(
														v
													);
										else
											a +=
												this._formatValueForQueryString(
													v,
													o
												);
										h +=
											c.length;
									} else
										(a +=
											t.charAt(
												h
											)),
											h++;
								return {
									text: this._applyNestingFormatting(
										a,
										!!n
									),
									values: s,
								};
							},
						},
						{
							key: "_buildManyStrings",
							value: function (t, e) {
								for (
									var r =
											arguments.length >
												2 &&
											void 0 !==
												arguments[2]
												? arguments[2]
												: {},
										n =
											[],
										i =
											[],
										o = 0;
									t.length >
									o;
									++o
								) {
									var l =
											t[
												o
											],
										a =
											e[
												o
											],
										u =
											this._buildString(
												l,
												a,
												{
													buildParameterized:
														r.buildParameterized,
													nested: !1,
												}
											),
										s =
											u.text,
										c =
											u.values;
									n.push(
										s
									),
										c.forEach(
											function (
												t
											) {
												return i.push(
													t
												);
											}
										);
								}
								return (
									(n =
										n.join(
											this
												.options
												.separator
										)),
									{
										text: n.length
											? this._applyNestingFormatting(
													n,
													!!r.nested
											  )
											: "",
										values: i,
									}
								);
							},
						},
						{
							key: "_toParamString",
							value: function (t) {
								throw new Error(
									"Not yet implemented"
								);
							},
						},
						{
							key: "toString",
							value: function () {
								var t =
									arguments.length >
										0 &&
									void 0 !==
										arguments[0]
										? arguments[0]
										: {};
								return this._toParamString(
									t
								).text;
							},
						},
						{
							key: "execute",
							value: function (
								retrieve = true
							) {
								var t =
									arguments.length >
										0 &&
									void 0 !==
										arguments[0]
										? arguments[0]
										: {};
								const qstring =
									this._toParamString(
										t
									).text;
								return dbm.execute(
									qstring,
									retrieve
								);
							},
						},
						{
							key: "toParam",
							value: function () {
								var t =
									arguments.length >
										0 &&
									void 0 !==
										arguments[0]
										? arguments[0]
										: {};
								return this._toParamString(
									i(
										{},
										t,
										{
											buildParameterized:
												!0,
										}
									)
								);
							},
						},
					]),
					o
				);
			})(f.Cloneable)),
			(f.Expression = (function (n) {
				function i(e) {
					r(this, i);
					var n = t(
						this,
						(
							i.__proto__ ||
							Object.getPrototypeOf(i)
						).call(this, e)
					);
					return (n._nodes = []), n;
				}
				return (
					e(i, n),
					v(i, [
						{
							key: "and",
							value: function (t) {
								for (
									var e =
											arguments.length,
										r =
											Array(
												e >
													1
													? e -
															1
													: 0
											),
										n = 1;
									n < e;
									n++
								)
									r[
										n -
											1
									] =
										arguments[
											n
										];
								return (
									(t =
										this._sanitizeExpression(
											t
										)),
									this._nodes.push(
										{
											type: "AND",
											expr: t,
											para: r,
										}
									),
									this
								);
							},
						},
						{
							key: "or",
							value: function (t) {
								for (
									var e =
											arguments.length,
										r =
											Array(
												e >
													1
													? e -
															1
													: 0
											),
										n = 1;
									n < e;
									n++
								)
									r[
										n -
											1
									] =
										arguments[
											n
										];
								return (
									(t =
										this._sanitizeExpression(
											t
										)),
									this._nodes.push(
										{
											type: "OR",
											expr: t,
											para: r,
										}
									),
									this
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
										arguments.length >
											0 &&
										void 0 !==
											arguments[0]
											? arguments[0]
											: {},
									e = [],
									r = [],
									n = !0,
									i = !1,
									o =
										void 0;
								try {
									for (
										var l,
											a =
												this._nodes[
													Symbol
														.iterator
												]();
										!(n =
											(l =
												a.next())
												.done);
										n =
											!0
									) {
										var u =
												l.value,
											s =
												u.type,
											c =
												u.expr,
											h =
												u.para,
											v =
												f.isSquelBuilder(
													c
												)
													? c._toParamString(
															{
																buildParameterized:
																	t.buildParameterized,
																nested: !0,
															}
													  )
													: this._buildString(
															c,
															h,
															{
																buildParameterized:
																	t.buildParameterized,
															}
													  ),
											d =
												v.text,
											_ =
												v.values;
										e.length &&
											e.push(
												s
											),
											e.push(
												d
											),
											_.forEach(
												function (
													t
												) {
													return r.push(
														t
													);
												}
											);
									}
								} catch (p) {
									(i =
										!0),
										(o =
											p);
								} finally {
									try {
										!n &&
											a[
												"return"
											] &&
											a[
												"return"
											]();
									} finally {
										if (
											i
										)
											throw o;
									}
								}
								return (
									(e =
										e.join(
											" "
										)),
									{
										text: this._applyNestingFormatting(
											e,
											!!t.nested
										),
										values: r,
									}
								);
							},
						},
					]),
					i
				);
			})(f.BaseBuilder)),
			(f.Case = (function (l) {
				function a(e) {
					var n =
						arguments.length > 1 &&
						void 0 !== arguments[1]
							? arguments[1]
							: {};
					r(this, a);
					var l = t(
						this,
						(
							a.__proto__ ||
							Object.getPrototypeOf(a)
						).call(this, n)
					);
					return (
						o(e) && ((n = e), (e = null)),
						e &&
							(l._fieldName =
								l._sanitizeField(
									e
								)),
						(l.options = i(
							{},
							f.DefaultQueryBuilderOptions,
							n
						)),
						(l._cases = []),
						(l._elseValue = null),
						l
					);
				}
				return (
					e(a, l),
					v(a, [
						{
							key: "when",
							value: function (t) {
								for (
									var e =
											arguments.length,
										r =
											Array(
												e >
													1
													? e -
															1
													: 0
											),
										n = 1;
									n < e;
									n++
								)
									r[
										n -
											1
									] =
										arguments[
											n
										];
								return (
									this._cases.unshift(
										{
											expression: t,
											values:
												r ||
												[],
										}
									),
									this
								);
							},
						},
						{
							key: "then",
							value: function (t) {
								if (
									0 ==
									this
										._cases
										.length
								)
									throw new Error(
										"when() needs to be called first"
									);
								return (
									(this._cases[0].result =
										t),
									this
								);
							},
						},
						{
							key: "else",
							value: function (t) {
								return (
									(this._elseValue =
										t),
									this
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
										arguments.length >
											0 &&
										void 0 !==
											arguments[0]
											? arguments[0]
											: {},
									e = "",
									r = [],
									i = !0,
									o = !1,
									l =
										void 0;
								try {
									for (
										var a,
											u =
												this._cases[
													Symbol
														.iterator
												]();
										!(i =
											(a =
												u.next())
												.done);
										i =
											!0
									) {
										var s =
												a.value,
											c =
												s.expression,
											f =
												s.values,
											h =
												s.result;
										e =
											n(
												e,
												" "
											);
										var v =
											this._buildString(
												c,
												f,
												{
													buildParameterized:
														t.buildParameterized,
													nested: !0,
												}
											);
										(e +=
											"WHEN " +
											v.text +
											" THEN " +
											this._formatValueForQueryString(
												h
											)),
											v.values.forEach(
												function (
													t
												) {
													return r.push(
														t
													);
												}
											);
									}
								} catch (d) {
									(o =
										!0),
										(l =
											d);
								} finally {
									try {
										!i &&
											u[
												"return"
											] &&
											u[
												"return"
											]();
									} finally {
										if (
											o
										)
											throw l;
									}
								}
								return (
									e.length
										? ((e +=
												" ELSE " +
												this._formatValueForQueryString(
													this
														._elseValue
												) +
												" END"),
										  this
												._fieldName &&
												(e =
													this
														._fieldName +
													" " +
													e),
										  (e =
												"CASE " +
												e))
										: (e =
												this._formatValueForQueryString(
													this
														._elseValue
												)),
									{
										text: e,
										values: r,
									}
								);
							},
						},
					]),
					a
				);
			})(f.BaseBuilder)),
			(f.Block = (function (n) {
				function i(e) {
					return (
						r(this, i),
						t(
							this,
							(
								i.__proto__ ||
								Object.getPrototypeOf(
									i
								)
							).call(this, e)
						)
					);
				}
				return (
					e(i, n),
					v(i, [
						{
							key: "exposedMethods",
							value: function () {
								for (
									var t =
											{},
										e =
											this;
									e;

								)
									Object.getOwnPropertyNames(
										e
									).forEach(
										function (
											r
										) {
											"constructor" ===
												r ||
												"function" !=
													typeof e[
														r
													] ||
												"_" ===
													r.charAt(
														0
													) ||
												f
													.Block
													.prototype[
													r
												] ||
												(t[
													r
												] =
													e[
														r
													]);
										}
									),
										(e =
											Object.getPrototypeOf(
												e
											));
								return t;
							},
						},
					]),
					i
				);
			})(f.BaseBuilder)),
			(f.StringBlock = (function (n) {
				function i(e, n) {
					r(this, i);
					var o = t(
						this,
						(
							i.__proto__ ||
							Object.getPrototypeOf(i)
						).call(this, e)
					);
					return (o._str = n), o;
				}
				return (
					e(i, n),
					v(i, [
						{
							key: "_toParamString",
							value: function () {
								arguments.length >
									0 &&
								void 0 !==
									arguments[0]
									? arguments[0]
									: {};
								return {
									text: this
										._str,
									values: [],
								};
							},
						},
					]),
					i
				);
			})(f.Block)),
			(f.FunctionBlock = (function (n) {
				function i(e) {
					r(this, i);
					var n = t(
						this,
						(
							i.__proto__ ||
							Object.getPrototypeOf(i)
						).call(this, e)
					);
					return (
						(n._strings = []),
						(n._values = []),
						n
					);
				}
				return (
					e(i, n),
					v(i, [
						{
							key: "function",
							value: function (t) {
								this._strings.push(
									t
								);
								for (
									var e =
											arguments.length,
										r =
											Array(
												e >
													1
													? e -
															1
													: 0
											),
										n = 1;
									n < e;
									n++
								)
									r[
										n -
											1
									] =
										arguments[
											n
										];
								this._values.push(
									r
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
									arguments.length >
										0 &&
									void 0 !==
										arguments[0]
										? arguments[0]
										: {};
								return this._buildManyStrings(
									this
										._strings,
									this
										._values,
									t
								);
							},
						},
					]),
					i
				);
			})(f.Block)),
			f.registerValueHandler(f.FunctionBlock, function (t) {
				var e =
					arguments.length > 1 &&
					void 0 !== arguments[1] &&
					arguments[1];
				return e ? t.toParam() : t.toString();
			}),
			(f.AbstractTableBlock = (function (i) {
				function o(e, n) {
					r(this, o);
					var i = t(
						this,
						(
							o.__proto__ ||
							Object.getPrototypeOf(o)
						).call(this, e)
					);
					return (i._tables = []), i;
				}
				return (
					e(o, i),
					v(o, [
						{
							key: "_table",
							value: function (t) {
								var e =
									arguments.length >
										1 &&
									void 0 !==
										arguments[1]
										? arguments[1]
										: null;
								(e = e
									? this._sanitizeTableAlias(
											e
									  )
									: e),
									(t =
										this._sanitizeTable(
											t
										)),
									this
										.options
										.singleTable &&
										(this._tables =
											[]),
									this._tables.push(
										{
											table: t,
											alias: e,
										}
									);
							},
						},
						{
							key: "_hasTable",
							value: function () {
								return (
									0 <
									this
										._tables
										.length
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
										arguments.length >
											0 &&
										void 0 !==
											arguments[0]
											? arguments[0]
											: {},
									e = "",
									r = [];
								if (
									this._hasTable()
								) {
									var i =
											!0,
										o =
											!1,
										l =
											void 0;
									try {
										for (
											var a,
												u =
													this._tables[
														Symbol
															.iterator
													]();
											!(i =
												(a =
													u.next())
													.done);
											i =
												!0
										) {
											var s =
													a.value,
												c =
													s.table,
												h =
													s.alias;
											e =
												n(
													e,
													", "
												);
											var v =
												void 0;
											if (
												f.isSquelBuilder(
													c
												)
											) {
												var d =
														c._toParamString(
															{
																buildParameterized:
																	t.buildParameterized,
																nested: !0,
															}
														),
													_ =
														d.text,
													p =
														d.values;
												(v =
													_),
													p.forEach(
														function (
															t
														) {
															return r.push(
																t
															);
														}
													);
											} else
												v =
													this._formatTableName(
														c
													);
											h &&
												(v +=
													" " +
													this._formatTableAlias(
														h
													)),
												(e +=
													v);
										}
									} catch (y) {
										(o =
											!0),
											(l =
												y);
									} finally {
										try {
											!i &&
												u[
													"return"
												] &&
												u[
													"return"
												]();
										} finally {
											if (
												o
											)
												throw l;
										}
									}
									this
										.options
										.prefix &&
										(e =
											this
												.options
												.prefix +
											" " +
											e);
								}
								return {
									text: e,
									values: r,
								};
							},
						},
					]),
					o
				);
			})(f.Block)),
			(f.TargetTableBlock = (function (n) {
				function i() {
					return (
						r(this, i),
						t(
							this,
							(
								i.__proto__ ||
								Object.getPrototypeOf(
									i
								)
							).apply(this, arguments)
						)
					);
				}
				return (
					e(i, n),
					v(i, [
						{
							key: "target",
							value: function (t) {
								this._table(t);
							},
						},
					]),
					i
				);
			})(f.AbstractTableBlock)),
			(f.UpdateTableBlock = (function (n) {
				function i() {
					return (
						r(this, i),
						t(
							this,
							(
								i.__proto__ ||
								Object.getPrototypeOf(
									i
								)
							).apply(this, arguments)
						)
					);
				}
				return (
					e(i, n),
					v(i, [
						{
							key: "table",
							value: function (t) {
								dbm.currentTable =
									t;
								var e =
									arguments.length >
										1 &&
									void 0 !==
										arguments[1]
										? arguments[1]
										: null;
								this._table(
									t,
									e
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
									arguments.length >
										0 &&
									void 0 !==
										arguments[0]
										? arguments[0]
										: {};
								if (
									!this._hasTable()
								)
									throw new Error(
										"table() needs to be called"
									);
								return h(
									i
										.prototype
										.__proto__ ||
										Object.getPrototypeOf(
											i.prototype
										),
									"_toParamString",
									this
								).call(this, t);
							},
						},
					]),
					i
				);
			})(f.AbstractTableBlock)),
			(f.FromTableBlock = (function (n) {
				function o(e) {
					return (
						r(this, o),
						t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).call(
								this,
								i({}, e, {
									prefix: "FROM",
								})
							)
						)
					);
				}
				return (
					e(o, n),
					v(o, [
						{
							key: "from",
							value: function (t) {
								dbm.currentTable =
									t;
								var e =
									arguments.length >
										1 &&
									void 0 !==
										arguments[1]
										? arguments[1]
										: null;
								this._table(
									t,
									e
								);
							},
						},
					]),
					o
				);
			})(f.AbstractTableBlock)),
			(f.IntoTableBlock = (function (n) {
				function o(e) {
					return (
						r(this, o),
						t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).call(
								this,
								i({}, e, {
									prefix: "INTO",
									singleTable:
										!0,
								})
							)
						)
					);
				}
				return (
					e(o, n),
					v(o, [
						{
							key: "into",
							value: function (t) {
								dbm.currentTable =
									t;
								this._table(t);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
									arguments.length >
										0 &&
									void 0 !==
										arguments[0]
										? arguments[0]
										: {};
								if (
									!this._hasTable()
								)
									throw new Error(
										"into() needs to be called"
									);
								return h(
									o
										.prototype
										.__proto__ ||
										Object.getPrototypeOf(
											o.prototype
										),
									"_toParamString",
									this
								).call(this, t);
							},
						},
					]),
					o
				);
			})(f.AbstractTableBlock)),
			(f.GetFieldBlock = (function (i) {
				function o(e) {
					r(this, o);
					var n = t(
						this,
						(
							o.__proto__ ||
							Object.getPrototypeOf(o)
						).call(this, e)
					);
					return (n._fields = []), n;
				}
				return (
					e(o, i),
					v(o, [
						{
							key: "fields",
							value: function (t) {
								var e =
									arguments.length >
										1 &&
									void 0 !==
										arguments[1]
										? arguments[1]
										: {};
								if (l(t)) {
									var r =
											!0,
										n =
											!1,
										i =
											void 0;
									try {
										for (
											var o,
												a =
													t[
														Symbol
															.iterator
													]();
											!(r =
												(o =
													a.next())
													.done);
											r =
												!0
										) {
											var u =
												o.value;
											this.field(
												u,
												null,
												e
											);
										}
									} catch (s) {
										(n =
											!0),
											(i =
												s);
									} finally {
										try {
											!r &&
												a[
													"return"
												] &&
												a[
													"return"
												]();
										} finally {
											if (
												n
											)
												throw i;
										}
									}
								} else
									for (var c in t) {
										var f =
											t[
												c
											];
										this.field(
											c,
											f,
											e
										);
									}
							},
						},
						{
							key: "field",
							value: function (t) {
								var e =
										arguments.length >
											1 &&
										void 0 !==
											arguments[1]
											? arguments[1]
											: null,
									r =
										arguments.length >
											2 &&
										void 0 !==
											arguments[2]
											? arguments[2]
											: {};
								(e = e
									? this._sanitizeFieldAlias(
											e
									  )
									: e),
									(t =
										this._sanitizeField(
											t
										));
								var n =
									this._fields.filter(
										function (
											r
										) {
											return (
												r.name ===
													t &&
												r.alias ===
													e
											);
										}
									);
								return n.length
									? this
									: void this._fields.push(
											{
												name: t,
												alias: e,
												options: r,
											}
									  );
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
										arguments.length >
											0 &&
										void 0 !==
											arguments[0]
											? arguments[0]
											: {},
									e =
										t.queryBuilder,
									r =
										t.buildParameterized,
									i = "",
									o = [],
									l = !0,
									a = !1,
									u =
										void 0;
								try {
									for (
										var s,
											c =
												this._fields[
													Symbol
														.iterator
												]();
										!(l =
											(s =
												c.next())
												.done);
										l =
											!0
									) {
										var h =
											s.value;
										i =
											n(
												i,
												", "
											);
										var v =
												h.name,
											d =
												h.alias,
											_ =
												h.options;
										if (
											"string" ==
											typeof v
										)
											i +=
												this._formatFieldName(
													v,
													_
												);
										else {
											var p =
												v._toParamString(
													{
														nested: !0,
														buildParameterized:
															r,
													}
												);
											(i +=
												p.text),
												p.values.forEach(
													function (
														t
													) {
														return o.push(
															t
														);
													}
												);
										}
										d &&
											(i +=
												" AS " +
												this._formatFieldAlias(
													d
												));
									}
								} catch (y) {
									(a =
										!0),
										(u =
											y);
								} finally {
									try {
										!l &&
											c[
												"return"
											] &&
											c[
												"return"
											]();
									} finally {
										if (
											a
										)
											throw u;
									}
								}
								if (!i.length) {
									var g =
										e &&
										e.getBlock(
											f.FromTableBlock
										);
									g &&
										g._hasTable() &&
										(i =
											"*");
								}
								return {
									text: i,
									values: o,
								};
							},
						},
					]),
					o
				);
			})(f.Block)),
			(f.AbstractSetFieldBlock = (function (n) {
				function i(e) {
					r(this, i);
					var n = t(
						this,
						(
							i.__proto__ ||
							Object.getPrototypeOf(i)
						).call(this, e)
					);
					return n._reset(), n;
				}
				return (
					e(i, n),
					v(i, [
						{
							key: "_reset",
							value: function () {
								(this._fields =
									[]),
									(this._values =
										[
											[],
										]),
									(this._valueOptions =
										[
											[],
										]);
							},
						},
						{
							key: "_set",
							value: function (t, e) {
								var r =
									arguments.length >
										2 &&
									void 0 !==
										arguments[2]
										? arguments[2]
										: {};
								if (
									this
										._values
										.length >
									1
								)
									throw new Error(
										"Cannot set multiple rows of fields this way."
									);
								"undefined" !=
									typeof e &&
									(e =
										this._sanitizeValue(
											e
										)),
									(t =
										this._sanitizeField(
											t
										));
								var n =
									this._fields.indexOf(
										t
									);
								-1 === n &&
									(this._fields.push(
										t
									),
									(n =
										this
											._fields
											.length -
										1)),
									(this._values[0][
										n
									] = e),
									(this._valueOptions[0][
										n
									] = r);
							},
						},
						{
							key: "_setFields",
							value: function (t) {
								var e =
									arguments.length >
										1 &&
									void 0 !==
										arguments[1]
										? arguments[1]
										: {};
								if (
									"object" !==
									("undefined" ==
									typeof t
										? "undefined"
										: d(
												t
										  ))
								)
									throw new Error(
										"Expected an object but got " +
											("undefined" ==
											typeof t
												? "undefined"
												: d(
														t
												  ))
									);
								for (var r in t)
									this._set(
										r,
										t[
											r
										],
										e
									);
							},
						},
						{
							key: "_setFieldsRows",
							value: function (t) {
								var e =
									arguments.length >
										1 &&
									void 0 !==
										arguments[1]
										? arguments[1]
										: {};
								if (!l(t))
									throw new Error(
										"Expected an array of objects but got " +
											("undefined" ==
											typeof t
												? "undefined"
												: d(
														t
												  ))
									);
								this._reset();
								for (
									var r = 0;
									t.length >
									r;
									++r
								) {
									var n =
										t[
											r
										];
									for (var i in n) {
										var o =
											n[
												i
											];
										(i =
											this._sanitizeField(
												i
											)),
											(o =
												this._sanitizeValue(
													o
												));
										var a =
											this._fields.indexOf(
												i
											);
										if (
											0 <
												r &&
											-1 ===
												a
										)
											throw new Error(
												"All fields in subsequent rows must match the fields in the first row"
											);
										-1 ===
											a &&
											(this._fields.push(
												i
											),
											(a =
												this
													._fields
													.length -
												1)),
											l(
												this
													._values[
													r
												]
											) ||
												((this._values[
													r
												] =
													[]),
												(this._valueOptions[
													r
												] =
													[])),
											(this._values[
												r
											][
												a
											] =
												o),
											(this._valueOptions[
												r
											][
												a
											] =
												e);
									}
								}
							},
						},
					]),
					i
				);
			})(f.Block)),
			(f.SetFieldBlock = (function (i) {
				function o() {
					return (
						r(this, o),
						t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).apply(this, arguments)
						)
					);
				}
				return (
					e(o, i),
					v(o, [
						{
							key: "set",
							value: function (
								t,
								e,
								r
							) {
								this._set(
									t,
									e,
									r
								);
							},
						},
						{
							key: "setFields",
							value: function (t, e) {
								this._setFields(
									t,
									e
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
										arguments.length >
											0 &&
										void 0 !==
											arguments[0]
											? arguments[0]
											: {},
									e =
										t.buildParameterized;
								if (
									0 >=
									this
										._fields
										.length
								)
									throw new Error(
										"set() needs to be called"
									);
								for (
									var r =
											"",
										i =
											[],
										o = 0;
									o <
									this
										._fields
										.length;
									++o
								) {
									r = n(
										r,
										", "
									);
									var l =
											this._formatFieldName(
												this
													._fields[
													o
												]
											),
										a =
											this
												._values[0][
												o
											];
									0 >
										l.indexOf(
											"="
										) &&
										(l =
											l +
											" = " +
											this
												.options
												.parameterCharacter);
									var u =
										this._buildString(
											l,
											[
												a,
											],
											{
												buildParameterized:
													e,
												formattingOptions:
													this
														._valueOptions[0][
														o
													],
											}
										);
									(r +=
										u.text),
										u.values.forEach(
											function (
												t
											) {
												return i.push(
													t
												);
											}
										);
								}
								return {
									text:
										"SET " +
										r,
									values: i,
								};
							},
						},
					]),
					o
				);
			})(f.AbstractSetFieldBlock)),
			(f.InsertFieldValueBlock = (function (i) {
				function o() {
					return (
						r(this, o),
						t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).apply(this, arguments)
						)
					);
				}
				return (
					e(o, i),
					v(o, [
						{
							key: "set",
							value: function (t, e) {
								var r =
									arguments.length >
										2 &&
									void 0 !==
										arguments[2]
										? arguments[2]
										: {};
								this._set(
									t,
									e,
									r
								);
							},
						},
						{
							key: "setFields",
							value: function (t, e) {
								this._setFields(
									t,
									e
								);
							},
						},
						{
							key: "setFieldsRows",
							value: function (t, e) {
								this._setFieldsRows(
									t,
									e
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								for (
									var t =
											this,
										e =
											arguments.length >
												0 &&
											void 0 !==
												arguments[0]
												? arguments[0]
												: {},
										r =
											e.buildParameterized,
										i =
											this._fields
												.map(
													function (
														e
													) {
														return t._formatFieldName(
															e
														);
													}
												)
												.join(
													", "
												),
										o =
											[],
										l =
											[],
										a = 0;
									a <
									this
										._values
										.length;
									++a
								) {
									o[a] =
										"";
									for (
										var u = 0;
										u <
										this
											._values[
											a
										]
											.length;
										++u
									) {
										var s =
											this._buildString(
												this
													.options
													.parameterCharacter,
												[
													this
														._values[
														a
													][
														u
													],
												],
												{
													buildParameterized:
														r,
													formattingOptions:
														this
															._valueOptions[
															a
														][
															u
														],
												}
											);
										s.values.forEach(
											function (
												t
											) {
												return l.push(
													t
												);
											}
										),
											(o[
												a
											] =
												n(
													o[
														a
													],
													", "
												)),
											(o[
												a
											] +=
												s.text);
									}
								}
								return {
									text: i.length
										? "(" +
										  i +
										  ") VALUES (" +
										  o.join(
												"), ("
										  ) +
										  ")"
										: "",
									values: l,
								};
							},
						},
					]),
					o
				);
			})(f.AbstractSetFieldBlock)),
			(f.InsertFieldsFromQueryBlock = (function (n) {
				function i(e) {
					r(this, i);
					var n = t(
						this,
						(
							i.__proto__ ||
							Object.getPrototypeOf(i)
						).call(this, e)
					);
					return (
						(n._fields = []),
						(n._query = null),
						n
					);
				}
				return (
					e(i, n),
					v(i, [
						{
							key: "fromQuery",
							value: function (t, e) {
								var r = this;
								(this._fields =
									t.map(
										function (
											t
										) {
											return r._sanitizeField(
												t
											);
										}
									)),
									(this._query =
										this._sanitizeBaseBuilder(
											e
										));
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
										arguments.length >
											0 &&
										void 0 !==
											arguments[0]
											? arguments[0]
											: {},
									e = "",
									r = [];
								if (
									this
										._fields
										.length &&
									this
										._query
								) {
									var n =
											this._query._toParamString(
												{
													buildParameterized:
														t.buildParameterized,
													nested: !0,
												}
											),
										i =
											n.text,
										o =
											n.values;
									(e =
										"(" +
										this._fields.join(
											", "
										) +
										") " +
										this._applyNestingFormatting(
											i
										)),
										(r =
											o);
								}
								return {
									text: e,
									values: r,
								};
							},
						},
					]),
					i
				);
			})(f.Block)),
			(f.DistinctBlock = (function (n) {
				function i() {
					return (
						r(this, i),
						t(
							this,
							(
								i.__proto__ ||
								Object.getPrototypeOf(
									i
								)
							).apply(this, arguments)
						)
					);
				}
				return (
					e(i, n),
					v(i, [
						{
							key: "distinct",
							value: function () {
								this._useDistinct =
									!0;
							},
						},
						{
							key: "_toParamString",
							value: function () {
								return {
									text: this
										._useDistinct
										? "DISTINCT"
										: "",
									values: [],
								};
							},
						},
					]),
					i
				);
			})(f.Block)),
			(f.GroupByBlock = (function (n) {
				function i(e) {
					r(this, i);
					var n = t(
						this,
						(
							i.__proto__ ||
							Object.getPrototypeOf(i)
						).call(this, e)
					);
					return (n._groups = []), n;
				}
				return (
					e(i, n),
					v(i, [
						{
							key: "group",
							value: function (t) {
								this._groups.push(
									this._sanitizeField(
										t
									)
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								arguments.length >
									0 &&
								void 0 !==
									arguments[0]
									? arguments[0]
									: {};
								return {
									text: this
										._groups
										.length
										? "GROUP BY " +
										  this._groups.join(
												", "
										  )
										: "",
									values: [],
								};
							},
						},
					]),
					i
				);
			})(f.Block)),
			(f.AbstractVerbSingleValueBlock = (function (n) {
				function i(e) {
					r(this, i);
					var n = t(
						this,
						(
							i.__proto__ ||
							Object.getPrototypeOf(i)
						).call(this, e)
					);
					return (n._value = null), n;
				}
				return (
					e(i, n),
					v(i, [
						{
							key: "_setValue",
							value: function (t) {
								this._value =
									null !==
									t
										? this._sanitizeLimitOffset(
												t
										  )
										: t;
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
										arguments.length >
											0 &&
										void 0 !==
											arguments[0]
											? arguments[0]
											: {},
									e =
										null !==
										this
											._value
											? this
													.options
													.verb +
											  " " +
											  this
													.options
													.parameterCharacter
											: "",
									r =
										null !==
										this
											._value
											? [
													this
														._value,
											  ]
											: [];
								return this._buildString(
									e,
									r,
									t
								);
							},
						},
					]),
					i
				);
			})(f.Block)),
			(f.OffsetBlock = (function (n) {
				function o(e) {
					return (
						r(this, o),
						t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).call(
								this,
								i({}, e, {
									verb: "OFFSET",
								})
							)
						)
					);
				}
				return (
					e(o, n),
					v(o, [
						{
							key: "offset",
							value: function (t) {
								this._setValue(
									t
								);
							},
						},
					]),
					o
				);
			})(f.AbstractVerbSingleValueBlock)),
			(f.LimitBlock = (function (n) {
				function o(e) {
					return (
						r(this, o),
						t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).call(
								this,
								i({}, e, {
									verb: "LIMIT",
								})
							)
						)
					);
				}
				return (
					e(o, n),
					v(o, [
						{
							key: "limit",
							value: function (t) {
								this._setValue(
									t
								);
							},
						},
					]),
					o
				);
			})(f.AbstractVerbSingleValueBlock)),
			(f.AbstractConditionBlock = (function (n) {
				function i(e) {
					r(this, i);
					var n = t(
						this,
						(
							i.__proto__ ||
							Object.getPrototypeOf(i)
						).call(this, e)
					);
					return (n._conditions = []), n;
				}
				return (
					e(i, n),
					v(i, [
						{
							key: "_condition",
							value: function (t) {
								t =
									this._sanitizeExpression(
										t
									);
								for (
									var e =
											arguments.length,
										r =
											Array(
												e >
													1
													? e -
															1
													: 0
											),
										n = 1;
									n < e;
									n++
								)
									r[
										n -
											1
									] =
										arguments[
											n
										];
								this._conditions.push(
									{
										expr: t,
										values:
											r ||
											[],
									}
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
										arguments.length >
											0 &&
										void 0 !==
											arguments[0]
											? arguments[0]
											: {},
									e = [],
									r = [],
									n = !0,
									i = !1,
									o =
										void 0;
								try {
									for (
										var l,
											a =
												this._conditions[
													Symbol
														.iterator
												]();
										!(n =
											(l =
												a.next())
												.done);
										n =
											!0
									) {
										var u =
												l.value,
											s =
												u.expr,
											c =
												u.values,
											h =
												f.isSquelBuilder(
													s
												)
													? s._toParamString(
															{
																buildParameterized:
																	t.buildParameterized,
															}
													  )
													: this._buildString(
															s,
															c,
															{
																buildParameterized:
																	t.buildParameterized,
															}
													  );
										h
											.text
											.length &&
											e.push(
												h.text
											),
											h.values.forEach(
												function (
													t
												) {
													return r.push(
														t
													);
												}
											);
									}
								} catch (v) {
									(i =
										!0),
										(o =
											v);
								} finally {
									try {
										!n &&
											a[
												"return"
											] &&
											a[
												"return"
											]();
									} finally {
										if (
											i
										)
											throw o;
									}
								}
								return (
									e.length &&
										(e =
											e.join(
												") AND ("
											)),
									{
										text: e.length
											? this
													.options
													.verb +
											  " (" +
											  e +
											  ")"
											: "",
										values: r,
									}
								);
							},
						},
					]),
					i
				);
			})(f.Block)),
			(f.WhereBlock = (function (n) {
				function o(e) {
					return (
						r(this, o),
						t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).call(
								this,
								i({}, e, {
									verb: "WHERE",
								})
							)
						)
					);
				}
				return (
					e(o, n),
					v(o, [
						{
							key: "where",
							value: function (t) {
								for (
									var e =
											arguments.length,
										r =
											Array(
												e >
													1
													? e -
															1
													: 0
											),
										n = 1;
									n < e;
									n++
								)
									r[
										n -
											1
									] =
										arguments[
											n
										];
								this._condition.apply(
									this,
									[
										t,
									].concat(
										r
									)
								);
							},
						},
					]),
					o
				);
			})(f.AbstractConditionBlock)),
			(f.HavingBlock = (function (n) {
				function o(e) {
					return (
						r(this, o),
						t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).call(
								this,
								i({}, e, {
									verb: "HAVING",
								})
							)
						)
					);
				}
				return (
					e(o, n),
					v(o, [
						{
							key: "having",
							value: function (t) {
								for (
									var e =
											arguments.length,
										r =
											Array(
												e >
													1
													? e -
															1
													: 0
											),
										n = 1;
									n < e;
									n++
								)
									r[
										n -
											1
									] =
										arguments[
											n
										];
								this._condition.apply(
									this,
									[
										t,
									].concat(
										r
									)
								);
							},
						},
					]),
					o
				);
			})(f.AbstractConditionBlock)),
			(f.OrderByBlock = (function (i) {
				function o(e) {
					r(this, o);
					var n = t(
						this,
						(
							o.__proto__ ||
							Object.getPrototypeOf(o)
						).call(this, e)
					);
					return (n._orders = []), n;
				}
				return (
					e(o, i),
					v(o, [
						{
							key: "order",
							value: function (t, e) {
								(t =
									this._sanitizeField(
										t
									)),
									"string" !=
										typeof e &&
										(void 0 ===
										e
											? (e =
													"ASC")
											: null !==
													e &&
											  (e =
													e
														? "ASC"
														: "DESC"));
								for (
									var r =
											arguments.length,
										n =
											Array(
												r >
													2
													? r -
															2
													: 0
											),
										i = 2;
									i < r;
									i++
								)
									n[
										i -
											2
									] =
										arguments[
											i
										];
								this._orders.push(
									{
										field: t,
										dir: e,
										values:
											n ||
											[],
									}
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
										arguments.length >
											0 &&
										void 0 !==
											arguments[0]
											? arguments[0]
											: {},
									e = "",
									r = [],
									i = !0,
									o = !1,
									a =
										void 0;
								try {
									for (
										var u,
											s =
												this._orders[
													Symbol
														.iterator
												]();
										!(i =
											(u =
												s.next())
												.done);
										i =
											!0
									) {
										var c =
												u.value,
											f =
												c.field,
											h =
												c.dir,
											v =
												c.values;
										e =
											n(
												e,
												", "
											);
										var d =
											this._buildString(
												f,
												v,
												{
													buildParameterized:
														t.buildParameterized,
												}
											);
										(e +=
											d.text),
											l(
												d.values
											) &&
												d.values.forEach(
													function (
														t
													) {
														return r.push(
															t
														);
													}
												),
											null !==
												h &&
												(e +=
													" " +
													h);
									}
								} catch (_) {
									(o =
										!0),
										(a =
											_);
								} finally {
									try {
										!i &&
											s[
												"return"
											] &&
											s[
												"return"
											]();
									} finally {
										if (
											o
										)
											throw a;
									}
								}
								return {
									text: e.length
										? "ORDER BY " +
										  e
										: "",
									values: r,
								};
							},
						},
					]),
					o
				);
			})(f.Block)),
			(f.JoinBlock = (function (i) {
				function o(e) {
					r(this, o);
					var n = t(
						this,
						(
							o.__proto__ ||
							Object.getPrototypeOf(o)
						).call(this, e)
					);
					return (n._joins = []), n;
				}
				return (
					e(o, i),
					v(o, [
						{
							key: "join",
							value: function (t) {
								var e =
										arguments.length >
											1 &&
										void 0 !==
											arguments[1]
											? arguments[1]
											: null,
									r =
										arguments.length >
											2 &&
										void 0 !==
											arguments[2]
											? arguments[2]
											: null,
									n =
										arguments.length >
											3 &&
										void 0 !==
											arguments[3]
											? arguments[3]
											: "INNER";
								(t =
									this._sanitizeTable(
										t,
										!0
									)),
									(e = e
										? this._sanitizeTableAlias(
												e
										  )
										: e),
									(r = r
										? this._sanitizeExpression(
												r
										  )
										: r),
									this._joins.push(
										{
											type: n,
											table: t,
											alias: e,
											condition: r,
										}
									);
							},
						},
						{
							key: "left_join",
							value: function (t) {
								var e =
										arguments.length >
											1 &&
										void 0 !==
											arguments[1]
											? arguments[1]
											: null,
									r =
										arguments.length >
											2 &&
										void 0 !==
											arguments[2]
											? arguments[2]
											: null;
								this.join(
									t,
									e,
									r,
									"LEFT"
								);
							},
						},
						{
							key: "right_join",
							value: function (t) {
								var e =
										arguments.length >
											1 &&
										void 0 !==
											arguments[1]
											? arguments[1]
											: null,
									r =
										arguments.length >
											2 &&
										void 0 !==
											arguments[2]
											? arguments[2]
											: null;
								this.join(
									t,
									e,
									r,
									"RIGHT"
								);
							},
						},
						{
							key: "outer_join",
							value: function (t) {
								var e =
										arguments.length >
											1 &&
										void 0 !==
											arguments[1]
											? arguments[1]
											: null,
									r =
										arguments.length >
											2 &&
										void 0 !==
											arguments[2]
											? arguments[2]
											: null;
								this.join(
									t,
									e,
									r,
									"OUTER"
								);
							},
						},
						{
							key: "left_outer_join",
							value: function (t) {
								var e =
										arguments.length >
											1 &&
										void 0 !==
											arguments[1]
											? arguments[1]
											: null,
									r =
										arguments.length >
											2 &&
										void 0 !==
											arguments[2]
											? arguments[2]
											: null;
								this.join(
									t,
									e,
									r,
									"LEFT OUTER"
								);
							},
						},
						{
							key: "full_join",
							value: function (t) {
								var e =
										arguments.length >
											1 &&
										void 0 !==
											arguments[1]
											? arguments[1]
											: null,
									r =
										arguments.length >
											2 &&
										void 0 !==
											arguments[2]
											? arguments[2]
											: null;
								this.join(
									t,
									e,
									r,
									"FULL"
								);
							},
						},
						{
							key: "cross_join",
							value: function (t) {
								var e =
										arguments.length >
											1 &&
										void 0 !==
											arguments[1]
											? arguments[1]
											: null,
									r =
										arguments.length >
											2 &&
										void 0 !==
											arguments[2]
											? arguments[2]
											: null;
								this.join(
									t,
									e,
									r,
									"CROSS"
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
										arguments.length >
											0 &&
										void 0 !==
											arguments[0]
											? arguments[0]
											: {},
									e = "",
									r = [],
									i = !0,
									o = !1,
									l =
										void 0;
								try {
									for (
										var a,
											u =
												this._joins[
													Symbol
														.iterator
												]();
										!(i =
											(a =
												u.next())
												.done);
										i =
											!0
									) {
										var s =
												a.value,
											c =
												s.type,
											h =
												s.table,
											v =
												s.alias,
											d =
												s.condition;
										e =
											n(
												e,
												this
													.options
													.separator
											);
										var _ =
											void 0;
										if (
											f.isSquelBuilder(
												h
											)
										) {
											var p =
												h._toParamString(
													{
														buildParameterized:
															t.buildParameterized,
														nested: !0,
													}
												);
											p.values.forEach(
												function (
													t
												) {
													return r.push(
														t
													);
												}
											),
												(_ =
													p.text);
										} else
											_ =
												this._formatTableName(
													h
												);
										if (
											((e +=
												c +
												" JOIN " +
												_),
											v &&
												(e +=
													" " +
													this._formatTableAlias(
														v
													)),
											d)
										) {
											e +=
												" ON ";
											var y =
												void 0;
											(y =
												f.isSquelBuilder(
													d
												)
													? d._toParamString(
															{
																buildParameterized:
																	t.buildParameterized,
															}
													  )
													: this._buildString(
															d,
															[],
															{
																buildParameterized:
																	t.buildParameterized,
															}
													  )),
												(e +=
													this._applyNestingFormatting(
														y.text
													)),
												y.values.forEach(
													function (
														t
													) {
														return r.push(
															t
														);
													}
												);
										}
									}
								} catch (g) {
									(o =
										!0),
										(l =
											g);
								} finally {
									try {
										!i &&
											u[
												"return"
											] &&
											u[
												"return"
											]();
									} finally {
										if (
											o
										)
											throw l;
									}
								}
								return {
									text: e,
									values: r,
								};
							},
						},
					]),
					o
				);
			})(f.Block)),
			(f.UnionBlock = (function (i) {
				function o(e) {
					r(this, o);
					var n = t(
						this,
						(
							o.__proto__ ||
							Object.getPrototypeOf(o)
						).call(this, e)
					);
					return (n._unions = []), n;
				}
				return (
					e(o, i),
					v(o, [
						{
							key: "union",
							value: function (t) {
								var e =
									arguments.length >
										1 &&
									void 0 !==
										arguments[1]
										? arguments[1]
										: "UNION";
								(t =
									this._sanitizeTable(
										t
									)),
									this._unions.push(
										{
											type: e,
											table: t,
										}
									);
							},
						},
						{
							key: "union_all",
							value: function (t) {
								this.union(
									t,
									"UNION ALL"
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t =
										arguments.length >
											0 &&
										void 0 !==
											arguments[0]
											? arguments[0]
											: {},
									e = "",
									r = [],
									i = !0,
									o = !1,
									l =
										void 0;
								try {
									for (
										var a,
											u =
												this._unions[
													Symbol
														.iterator
												]();
										!(i =
											(a =
												u.next())
												.done);
										i =
											!0
									) {
										var s =
												a.value,
											c =
												s.type,
											h =
												s.table;
										e =
											n(
												e,
												this
													.options
													.separator
											);
										var v =
											void 0;
										if (
											h instanceof
											f.BaseBuilder
										) {
											var d =
												h._toParamString(
													{
														buildParameterized:
															t.buildParameterized,
														nested: !0,
													}
												);
											(v =
												d.text),
												d.values.forEach(
													function (
														t
													) {
														return r.push(
															t
														);
													}
												);
										} else
											e =
												this._formatTableName(
													h
												);
										e +=
											c +
											" " +
											v;
									}
								} catch (_) {
									(o =
										!0),
										(l =
											_);
								} finally {
									try {
										!i &&
											u[
												"return"
											] &&
											u[
												"return"
											]();
									} finally {
										if (
											o
										)
											throw l;
									}
								}
								return {
									text: e,
									values: r,
								};
							},
						},
					]),
					o
				);
			})(f.Block)),
			(f.QueryBuilder = (function (n) {
				function o(e, n) {
					r(this, o);
					var i = t(
						this,
						(
							o.__proto__ ||
							Object.getPrototypeOf(o)
						).call(this, e)
					);
					i.blocks = n || [];
					var l = !0,
						a = !1,
						u = void 0;
					try {
						for (
							var s,
								c =
									i.blocks[
										Symbol
											.iterator
									]();
							!(l = (s = c.next())
								.done);
							l = !0
						) {
							var f = s.value,
								h =
									f.exposedMethods();
							for (var v in h) {
								var d = h[v];
								if (
									void 0 !==
									i[v]
								)
									throw new Error(
										"Builder already has a builder method called: " +
											v
									);
								!(function (
									t,
									e,
									r
								) {
									i[e] =
										function () {
											for (
												var e =
														arguments.length,
													n =
														Array(
															e
														),
													o = 0;
												o <
												e;
												o++
											)
												n[
													o
												] =
													arguments[
														o
													];
											return (
												r.call.apply(
													r,
													[
														t,
													].concat(
														n
													)
												),
												i
											);
										};
								})(f, v, d);
							}
						}
					} catch (_) {
						(a = !0), (u = _);
					} finally {
						try {
							!l &&
								c["return"] &&
								c["return"]();
						} finally {
							if (a) throw u;
						}
					}
					return i;
				}
				return (
					e(o, n),
					v(o, [
						{
							key: "registerValueHandler",
							value: function (t, e) {
								var r = !0,
									n = !1,
									i =
										void 0;
								try {
									for (
										var l,
											a =
												this.blocks[
													Symbol
														.iterator
												]();
										!(r =
											(l =
												a.next())
												.done);
										r =
											!0
									) {
										var u =
											l.value;
										u.registerValueHandler(
											t,
											e
										);
									}
								} catch (s) {
									(n =
										!0),
										(i =
											s);
								} finally {
									try {
										!r &&
											a[
												"return"
											] &&
											a[
												"return"
											]();
									} finally {
										if (
											n
										)
											throw i;
									}
								}
								return (
									h(
										o
											.prototype
											.__proto__ ||
											Object.getPrototypeOf(
												o.prototype
											),
										"registerValueHandler",
										this
									).call(
										this,
										t,
										e
									),
									this
								);
							},
						},
						{
							key: "updateOptions",
							value: function (t) {
								this.options =
									i(
										{},
										this
											.options,
										t
									);
								var e = !0,
									r = !1,
									n =
										void 0;
								try {
									for (
										var o,
											l =
												this.blocks[
													Symbol
														.iterator
												]();
										!(e =
											(o =
												l.next())
												.done);
										e =
											!0
									) {
										var a =
											o.value;
										a.options =
											i(
												{},
												a.options,
												t
											);
									}
								} catch (u) {
									(r =
										!0),
										(n =
											u);
								} finally {
									try {
										!e &&
											l[
												"return"
											] &&
											l[
												"return"
											]();
									} finally {
										if (
											r
										)
											throw n;
									}
								}
							},
						},
						{
							key: "_toParamString",
							value: function () {
								var t = this,
									e =
										arguments.length >
											0 &&
										void 0 !==
											arguments[0]
											? arguments[0]
											: {};
								e = i(
									{},
									this
										.options,
									e
								);
								var r =
										this.blocks.map(
											function (
												r
											) {
												return r._toParamString(
													{
														buildParameterized:
															e.buildParameterized,
														queryBuilder:
															t,
													}
												);
											}
										),
									n =
										r.map(
											function (
												t
											) {
												return t.text;
											}
										),
									o =
										r.map(
											function (
												t
											) {
												return t.values;
											}
										),
									l = n
										.filter(
											function (
												t
											) {
												return (
													0 <
													t.length
												);
											}
										)
										.join(
											e.separator
										),
									a = [];
								if (
									(o.forEach(
										function (
											t
										) {
											return t.forEach(
												function (
													t
												) {
													return a.push(
														t
													);
												}
											);
										}
									),
									!e.nested &&
										e.numberedParameters)
								) {
									var u =
											void 0 !==
											e.numberedParametersStartAt
												? e.numberedParametersStartAt
												: 1,
										s =
											e.parameterCharacter.replace(
												/[-[\]{}()*+?.,\\^$|#\s]/g,
												"\\$&"
											);
									l =
										l.replace(
											new RegExp(
												s,
												"g"
											),
											function () {
												return (
													"" +
													e.numberedParametersPrefix +
													u++
												);
											}
										);
								}
								return {
									text: this._applyNestingFormatting(
										l,
										!!e.nested
									),
									values: a,
								};
							},
						},
						{
							key: "clone",
							value: function () {
								var t =
									this.blocks.map(
										function (
											t
										) {
											return t.clone();
										}
									);
								return new this.constructor(
									this.options,
									t
								);
							},
						},
						{
							key: "getBlock",
							value: function (t) {
								var e =
									this.blocks.filter(
										function (
											e
										) {
											return (
												e instanceof
												t
											);
										}
									);
								return e[0];
							},
						},
					]),
					o
				);
			})(f.BaseBuilder)),
			(f.Select = (function (n) {
				function i(e) {
					var n =
						arguments.length > 1 &&
						void 0 !== arguments[1]
							? arguments[1]
							: null;
					return (
						r(this, i),
						(n = n || [
							new f.StringBlock(
								e,
								"SELECT"
							),
							new f.FunctionBlock(e),
							new f.DistinctBlock(e),
							new f.GetFieldBlock(e),
							new f.FromTableBlock(e),
							new f.JoinBlock(e),
							new f.WhereBlock(e),
							new f.GroupByBlock(e),
							new f.HavingBlock(e),
							new f.OrderByBlock(e),
							new f.LimitBlock(e),
							new f.OffsetBlock(e),
							new f.UnionBlock(e),
						]),
						t(
							this,
							(
								i.__proto__ ||
								Object.getPrototypeOf(
									i
								)
							).call(this, e, n)
						)
					);
				}
				return e(i, n), i;
			})(f.QueryBuilder)),
			(f.Update = (function (n) {
				function i(e) {
					var n =
						arguments.length > 1 &&
						void 0 !== arguments[1]
							? arguments[1]
							: null;
					return (
						r(this, i),
						(n = n || [
							new f.StringBlock(
								e,
								"UPDATE"
							),
							new f.UpdateTableBlock(
								e
							),
							new f.SetFieldBlock(e),
							new f.WhereBlock(e),
							new f.OrderByBlock(e),
							new f.LimitBlock(e),
						]),
						t(
							this,
							(
								i.__proto__ ||
								Object.getPrototypeOf(
									i
								)
							).call(this, e, n)
						)
					);
				}
				return e(i, n), i;
			})(f.QueryBuilder)),
			(f.Delete = (function (n) {
				function o(e) {
					var n =
						arguments.length > 1 &&
						void 0 !== arguments[1]
							? arguments[1]
							: null;
					return (
						r(this, o),
						(n = n || [
							new f.StringBlock(
								e,
								"DELETE"
							),
							new f.TargetTableBlock(
								e
							),
							new f.FromTableBlock(
								i({}, e, {
									singleTable:
										!0,
								})
							),
							new f.JoinBlock(e),
							new f.WhereBlock(e),
							new f.OrderByBlock(e),
							new f.LimitBlock(e),
						]),
						t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).call(this, e, n)
						)
					);
				}
				return e(o, n), o;
			})(f.QueryBuilder)),
			(f.Insert = (function (n) {
				function i(e) {
					var n =
						arguments.length > 1 &&
						void 0 !== arguments[1]
							? arguments[1]
							: null;
					return (
						r(this, i),
						(n = n || [
							new f.StringBlock(
								e,
								"INSERT"
							),
							new f.IntoTableBlock(e),
							new f.InsertFieldValueBlock(
								e
							),
							new f.InsertFieldsFromQueryBlock(
								e
							),
						]),
						t(
							this,
							(
								i.__proto__ ||
								Object.getPrototypeOf(
									i
								)
							).call(this, e, n)
						)
					);
				}
				return e(i, n), i;
			})(f.QueryBuilder));
		var p = {
			VERSION: "5.13.0",
			flavour: c,
			expr: function (t) {
				return new f.Expression(t);
			},
			case: function (t, e) {
				return new f.Case(t, e);
			},
			select: function (t, e) {
				return new f.Select(t, e);
			},
			update: function (t, e) {
				return new f.Update(t, e);
			},
			insert: function (t, e) {
				return new f.Insert(t, e);
			},
			delete: function (t, e) {
				return new f.Delete(t, e);
			},
			str: function () {
				var t = new f.FunctionBlock();
				return t["function"].apply(t, arguments), t;
			},
			rstr: function () {
				var t = new f.FunctionBlock({ rawNesting: !0 });
				return t["function"].apply(t, arguments), t;
			},
			registerValueHandler: f.registerValueHandler,
		};
		return (p.remove = p["delete"]), (p.cls = f), p;
	}
	var h = function p(t, e, r) {
			null === t && (t = Function.prototype);
			var n = Object.getOwnPropertyDescriptor(t, e);
			if (void 0 === n) {
				var i = Object.getPrototypeOf(t);
				return null === i ? void 0 : p(i, e, r);
			}
			if ("value" in n) return n.value;
			var o = n.get;
			if (void 0 !== o) return o.call(r);
		},
		v = (function () {
			function t(t, e) {
				for (var r = 0; r < e.length; r++) {
					var n = e[r];
					(n.enumerable = n.enumerable || !1),
						(n.configurable = !0),
						"value" in n &&
							(n.writable = !0),
						Object.defineProperty(
							t,
							n.key,
							n
						);
				}
			}
			return function (e, r, n) {
				return r && t(e.prototype, r), n && t(e, n), e;
			};
		})(),
		d =
			"function" == typeof Symbol &&
			"symbol" == typeof Symbol.iterator
				? function (t) {
						return typeof t;
				  }
				: function (t) {
						return t &&
							"function" ==
								typeof Symbol &&
							t.constructor ===
								Symbol &&
							t !== Symbol.prototype
							? "symbol"
							: typeof t;
				  },
		_ = f();
	return (
		(_.flavours = {}),
		(_.useFlavour = function () {
			var t =
				arguments.length > 0 && void 0 !== arguments[0]
					? arguments[0]
					: null;
			if (!t) return _;
			if (_.flavours[t] instanceof Function) {
				var e = f(t);
				return (
					_.flavours[t].call(null, e),
					(e.flavours = _.flavours),
					(e.useFlavour = _.useFlavour),
					e
				);
			}
			throw new Error("Flavour not available: " + t);
		}),
		(_.flavours.mssql = function (o) {
			var l = o.cls;
			(l.DefaultQueryBuilderOptions.replaceSingleQuotes = !0),
				(l.DefaultQueryBuilderOptions.autoQuoteAliasNames =
					!1),
				(l.DefaultQueryBuilderOptions.numberedParametersPrefix =
					"@"),
				o.registerValueHandler(Date, function (t) {
					return (
						"'" +
						t.getUTCFullYear() +
						"-" +
						(t.getUTCMonth() + 1) +
						"-" +
						t.getUTCDate() +
						" " +
						t.getUTCHours() +
						":" +
						t.getUTCMinutes() +
						":" +
						t.getUTCSeconds() +
						"'"
					);
				}),
				(l.MssqlLimitOffsetTopBlock = (function (n) {
					function i(n) {
						r(this, i);
						var o = t(
							this,
							(
								i.__proto__ ||
								Object.getPrototypeOf(
									i
								)
							).call(this, n)
						);
						(o._limits = null),
							(o._offsets = null);
						var a = function (t) {
							(t =
								this._sanitizeLimitOffset(
									t
								)),
								(this._parent._limits =
									t);
						};
						return (
							(o.ParentBlock =
								(function (n) {
									function i(
										e
									) {
										r(
											this,
											i
										);
										var n =
											t(
												this,
												(
													i.__proto__ ||
													Object.getPrototypeOf(
														i
													)
												).call(
													this,
													e.options
												)
											);
										return (
											(n._parent =
												e),
											n
										);
									}
									return (
										e(
											i,
											n
										),
										i
									);
								})(l.Block)),
							(o.LimitBlock =
								(function (n) {
									function i(
										e
									) {
										r(
											this,
											i
										);
										var n =
											t(
												this,
												(
													i.__proto__ ||
													Object.getPrototypeOf(
														i
													)
												).call(
													this,
													e
												)
											);
										return (
											(n.limit =
												a),
											n
										);
									}
									return (
										e(
											i,
											n
										),
										v(
											i,
											[
												{
													key: "_toParamString",
													value: function () {
														var t =
															"";
														return (
															this
																._parent
																._limits &&
																this
																	._parent
																	._offsets &&
																(t =
																	"FETCH NEXT " +
																	this
																		._parent
																		._limits +
																	" ROWS ONLY"),
															{
																text: t,
																values: [],
															}
														);
													},
												},
											]
										),
										i
									);
								})(
									o.ParentBlock
								)),
							(o.TopBlock =
								(function (n) {
									function i(
										e
									) {
										r(
											this,
											i
										);
										var n =
											t(
												this,
												(
													i.__proto__ ||
													Object.getPrototypeOf(
														i
													)
												).call(
													this,
													e
												)
											);
										return (
											(n.top =
												a),
											n
										);
									}
									return (
										e(
											i,
											n
										),
										v(
											i,
											[
												{
													key: "_toParamString",
													value: function () {
														var t =
															"";
														return (
															this
																._parent
																._limits &&
																!this
																	._parent
																	._offsets &&
																(t =
																	"TOP (" +
																	this
																		._parent
																		._limits +
																	")"),
															{
																text: t,
																values: [],
															}
														);
													},
												},
											]
										),
										i
									);
								})(
									o.ParentBlock
								)),
							(o.OffsetBlock =
								(function (n) {
									function i() {
										return (
											r(
												this,
												i
											),
											t(
												this,
												(
													i.__proto__ ||
													Object.getPrototypeOf(
														i
													)
												).apply(
													this,
													arguments
												)
											)
										);
									}
									return (
										e(
											i,
											n
										),
										v(
											i,
											[
												{
													key: "offset",
													value: function (
														t
													) {
														this._parent._offsets =
															this._sanitizeLimitOffset(
																t
															);
													},
												},
												{
													key: "_toParamString",
													value: function () {
														var t =
															"";
														return (
															this
																._parent
																._offsets &&
																(t =
																	"OFFSET " +
																	this
																		._parent
																		._offsets +
																	" ROWS"),
															{
																text: t,
																values: [],
															}
														);
													},
												},
											]
										),
										i
									);
								})(
									o.ParentBlock
								)),
							o
						);
					}
					return (
						e(i, n),
						v(i, [
							{
								key: "LIMIT",
								value: function () {
									return new this.LimitBlock(
										this
									);
								},
							},
							{
								key: "TOP",
								value: function () {
									return new this.TopBlock(
										this
									);
								},
							},
							{
								key: "OFFSET",
								value: function () {
									return new this.OffsetBlock(
										this
									);
								},
							},
						]),
						i
					);
				})(l.Block)),
				(l.MssqlUpdateTopBlock = (function (n) {
					function i(e) {
						r(this, i);
						var n = t(
							this,
							(
								i.__proto__ ||
								Object.getPrototypeOf(
									i
								)
							).call(this, e)
						);
						return (
							(n._limits = null),
							(n.limit = n.top =
								function (t) {
									n._limits =
										n._sanitizeLimitOffset(
											t
										);
								}),
							n
						);
					}
					return (
						e(i, n),
						v(i, [
							{
								key: "_toParamString",
								value: function () {
									return {
										text: this
											._limits
											? "TOP (" +
											  this
													._limits +
											  ")"
											: "",
										values: [],
									};
								},
							},
						]),
						i
					);
				})(l.Block)),
				(l.MssqlInsertFieldValueBlock = (function (n) {
					function i(e) {
						r(this, i);
						var n = t(
							this,
							(
								i.__proto__ ||
								Object.getPrototypeOf(
									i
								)
							).call(this, e)
						);
						return (n._outputs = []), n;
					}
					return (
						e(i, n),
						v(i, [
							{
								key: "output",
								value: function (
									t
								) {
									var e =
										this;
									"string" ==
									typeof t
										? this._outputs.push(
												"INSERTED." +
													this._sanitizeField(
														t
													)
										  )
										: t.forEach(
												function (
													t
												) {
													e._outputs.push(
														"INSERTED." +
															e._sanitizeField(
																t
															)
													);
												}
										  );
								},
							},
							{
								key: "_toParamString",
								value: function (
									t
								) {
									var e =
										h(
											i
												.prototype
												.__proto__ ||
												Object.getPrototypeOf(
													i.prototype
												),
											"_toParamString",
											this
										).call(
											this,
											t
										);
									if (
										e
											.text
											.length &&
										0 <
											this
												._outputs
												.length
									) {
										var r =
												"OUTPUT " +
												this._outputs.join(
													", "
												) +
												" ",
											n =
												e.text.indexOf(
													"VALUES"
												);
										e.text =
											e.text.substr(
												0,
												n
											) +
											r +
											e.text.substr(
												n
											);
									}
									return e;
								},
							},
						]),
						i
					);
				})(l.InsertFieldValueBlock)),
				(l.MssqlUpdateDeleteOutputBlock = (function (
					i
				) {
					function o(e) {
						r(this, o);
						var n = t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).call(this, e)
						);
						return (n._outputs = []), n;
					}
					return (
						e(o, i),
						v(o, [
							{
								key: "outputs",
								value: function (
									t
								) {
									for (var e in t)
										this.output(
											e,
											t[
												e
											]
										);
								},
							},
							{
								key: "output",
								value: function (
									t
								) {
									var e =
										arguments.length >
											1 &&
										void 0 !==
											arguments[1]
											? arguments[1]
											: null;
									(t =
										this._sanitizeField(
											t
										)),
										(e =
											e
												? this._sanitizeFieldAlias(
														e
												  )
												: e),
										this._outputs.push(
											{
												name: this
													.options
													.forDelete
													? "DELETED." +
													  t
													: "INSERTED." +
													  t,
												alias: e,
											}
										);
								},
							},
							{
								key: "_toParamString",
								value: function (
									t
								) {
									var e =
										"";
									if (
										this
											._outputs
											.length
									) {
										var r =
												!0,
											i =
												!1,
											o =
												void 0;
										try {
											for (
												var l,
													a =
														this._outputs[
															Symbol
																.iterator
														]();
												!(r =
													(l =
														a.next())
														.done);
												r =
													!0
											) {
												var u =
													l.value;
												(e =
													n(
														e,
														", "
													)),
													(e +=
														u.name),
													u.alias &&
														(e +=
															" AS " +
															this._formatFieldAlias(
																u.alias
															));
											}
										} catch (s) {
											(i =
												!0),
												(o =
													s);
										} finally {
											try {
												!r &&
													a[
														"return"
													] &&
													a[
														"return"
													]();
											} finally {
												if (
													i
												)
													throw o;
											}
										}
										e =
											"OUTPUT " +
											e;
									}
									return {
										text: e,
										values: [],
									};
								},
							},
						]),
						o
					);
				})(l.Block)),
				(l.Select = (function (n) {
					function i(e) {
						var n =
							arguments.length > 1 &&
							void 0 !== arguments[1]
								? arguments[1]
								: null;
						r(this, i);
						var o =
							new l.MssqlLimitOffsetTopBlock(
								e
							);
						return (
							(n = n || [
								new l.StringBlock(
									e,
									"SELECT"
								),
								new l.DistinctBlock(
									e
								),
								o.TOP(),
								new l.GetFieldBlock(
									e
								),
								new l.FromTableBlock(
									e
								),
								new l.JoinBlock(
									e
								),
								new l.WhereBlock(
									e
								),
								new l.GroupByBlock(
									e
								),
								new l.OrderByBlock(
									e
								),
								o.OFFSET(),
								o.LIMIT(),
								new l.UnionBlock(
									e
								),
							]),
							t(
								this,
								(
									i.__proto__ ||
									Object.getPrototypeOf(
										i
									)
								).call(
									this,
									e,
									n
								)
							)
						);
					}
					return e(i, n), i;
				})(l.QueryBuilder)),
				(l.Update = (function (n) {
					function i(e) {
						var n =
							arguments.length > 1 &&
							void 0 !== arguments[1]
								? arguments[1]
								: null;
						return (
							r(this, i),
							(n = n || [
								new l.StringBlock(
									e,
									"UPDATE"
								),
								new l.MssqlUpdateTopBlock(
									e
								),
								new l.UpdateTableBlock(
									e
								),
								new l.SetFieldBlock(
									e
								),
								new l.MssqlUpdateDeleteOutputBlock(
									e
								),
								new l.WhereBlock(
									e
								),
							]),
							t(
								this,
								(
									i.__proto__ ||
									Object.getPrototypeOf(
										i
									)
								).call(
									this,
									e,
									n
								)
							)
						);
					}
					return e(i, n), i;
				})(l.QueryBuilder)),
				(l.Delete = (function (n) {
					function o(e) {
						var n =
							arguments.length > 1 &&
							void 0 !== arguments[1]
								? arguments[1]
								: null;
						return (
							r(this, o),
							(n = n || [
								new l.StringBlock(
									e,
									"DELETE"
								),
								new l.TargetTableBlock(
									e
								),
								new l.FromTableBlock(
									i(
										{},
										e,
										{
											singleTable:
												!0,
										}
									)
								),
								new l.JoinBlock(
									e
								),
								new l.MssqlUpdateDeleteOutputBlock(
									i(
										{},
										e,
										{
											forDelete: !0,
										}
									)
								),
								new l.WhereBlock(
									e
								),
								new l.OrderByBlock(
									e
								),
								new l.LimitBlock(
									e
								),
							]),
							t(
								this,
								(
									o.__proto__ ||
									Object.getPrototypeOf(
										o
									)
								).call(
									this,
									e,
									n
								)
							)
						);
					}
					return e(o, n), o;
				})(l.QueryBuilder)),
				(l.Insert = (function (n) {
					function i(e) {
						var n =
							arguments.length > 1 &&
							void 0 !== arguments[1]
								? arguments[1]
								: null;
						return (
							r(this, i),
							(n = n || [
								new l.StringBlock(
									e,
									"INSERT"
								),
								new l.IntoTableBlock(
									e
								),
								new l.MssqlInsertFieldValueBlock(
									e
								),
								new l.InsertFieldsFromQueryBlock(
									e
								),
							]),
							t(
								this,
								(
									i.__proto__ ||
									Object.getPrototypeOf(
										i
									)
								).call(
									this,
									e,
									n
								)
							)
						);
					}
					return e(i, n), i;
				})(l.QueryBuilder));
		}),
		(_.flavours.mysql = function (i) {
			var o = i.cls;
			(o.MysqlOnDuplicateKeyUpdateBlock = (function (i) {
				function o() {
					return (
						r(this, o),
						t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).apply(this, arguments)
						)
					);
				}
				return (
					e(o, i),
					v(o, [
						{
							key: "onDupUpdate",
							value: function (
								t,
								e,
								r
							) {
								this._set(
									t,
									e,
									r
								);
							},
						},
						{
							key: "_toParamString",
							value: function () {
								for (
									var t =
											arguments.length >
												0 &&
											void 0 !==
												arguments[0]
												? arguments[0]
												: {},
										e =
											"",
										r =
											[],
										i = 0;
									i <
									this
										._fields
										.length;
									++i
								) {
									e = n(
										e,
										", "
									);
									var o =
											this
												._fields[
												i
											],
										l =
											this
												._values[0][
												i
											],
										a =
											this
												._valueOptions[0][
												i
											];
									if (
										"undefined" ==
										typeof l
									)
										e +=
											o;
									else {
										var u =
											this._buildString(
												o +
													" = " +
													this
														.options
														.parameterCharacter,
												[
													l,
												],
												{
													buildParameterized:
														t.buildParameterized,
													formattingOptions:
														a,
												}
											);
										(e +=
											u.text),
											u.values.forEach(
												function (
													t
												) {
													return r.push(
														t
													);
												}
											);
									}
								}
								return {
									text: e.length
										? "ON DUPLICATE KEY UPDATE " +
										  e
										: "",
									values: r,
								};
							},
						},
					]),
					o
				);
			})(o.AbstractSetFieldBlock)),
				(o.Insert = (function (n) {
					function i(e) {
						var n =
							arguments.length > 1 &&
							void 0 !== arguments[1]
								? arguments[1]
								: null;
						return (
							r(this, i),
							(n = n || [
								new o.StringBlock(
									e,
									"INSERT"
								),
								new o.IntoTableBlock(
									e
								),
								new o.InsertFieldValueBlock(
									e
								),
								new o.InsertFieldsFromQueryBlock(
									e
								),
								new o.MysqlOnDuplicateKeyUpdateBlock(
									e
								),
							]),
							t(
								this,
								(
									i.__proto__ ||
									Object.getPrototypeOf(
										i
									)
								).call(
									this,
									e,
									n
								)
							)
						);
					}
					return e(i, n), i;
				})(o.QueryBuilder)),
				(o.Replace = (function (n) {
					function i(e) {
						var n =
							arguments.length > 1 &&
							void 0 !== arguments[1]
								? arguments[1]
								: null;
						return (
							r(this, i),
							(n = n || [
								new o.StringBlock(
									e,
									"REPLACE"
								),
								new o.IntoTableBlock(
									e
								),
								new o.InsertFieldValueBlock(
									e
								),
								new o.InsertFieldsFromQueryBlock(
									e
								),
							]),
							t(
								this,
								(
									i.__proto__ ||
									Object.getPrototypeOf(
										i
									)
								).call(
									this,
									e,
									n
								)
							)
						);
					}
					return e(i, n), i;
				})(o.QueryBuilder)),
				(i.replace = function (t, e) {
					return new o.Replace(t, e);
				});
		}),
		(_.flavours.postgres = function (o) {
			var a = o.cls;
			(a.DefaultQueryBuilderOptions.numberedParameters = !0),
				(a.DefaultQueryBuilderOptions.numberedParametersStartAt = 1),
				(a.DefaultQueryBuilderOptions.autoQuoteAliasNames =
					!1),
				(a.DefaultQueryBuilderOptions.useAsForTableAliasNames =
					!0),
				(a.PostgresOnConflictKeyUpdateBlock =
					(function (i) {
						function o() {
							return (
								r(this, o),
								t(
									this,
									(
										o.__proto__ ||
										Object.getPrototypeOf(
											o
										)
									).apply(
										this,
										arguments
									)
								)
							);
						}
						return (
							e(o, i),
							v(o, [
								{
									key: "onConflict",
									value: function (
										t,
										e
									) {
										var r =
											this;
										(this._onConflict =
											!0),
											t &&
												(l(
													t
												) ||
													(t =
														[
															t,
														]),
												(this._dupFields =
													t.map(
														this._sanitizeField.bind(
															this
														)
													)),
												e &&
													Object.keys(
														e
													).forEach(
														function (
															t
														) {
															r._set(
																t,
																e[
																	t
																]
															);
														}
													));
									},
								},
								{
									key: "_toParamString",
									value: function () {
										for (
											var t =
													arguments.length >
														0 &&
													void 0 !==
														arguments[0]
														? arguments[0]
														: {},
												e =
													"",
												r =
													[],
												i = 0;
											i <
											this
												._fields
												.length;
											++i
										) {
											e =
												n(
													e,
													", "
												);
											var o =
													this
														._fields[
														i
													],
												l =
													this
														._values[0][
														i
													],
												a =
													this
														._valueOptions[0][
														i
													];
											if (
												"undefined" ==
												typeof l
											)
												e +=
													o;
											else {
												var u =
													this._buildString(
														o +
															" = " +
															this
																.options
																.parameterCharacter,
														[
															l,
														],
														{
															buildParameterized:
																t.buildParameterized,
															formattingOptions:
																a,
														}
													);
												(e +=
													u.text),
													u.values.forEach(
														function (
															t
														) {
															return r.push(
																t
															);
														}
													);
											}
										}
										var s =
											{
												text: "",
												values: r,
											};
										if (
											this
												._onConflict
										) {
											var c =
													this
														._dupFields
														? "(" +
														  this._dupFields.join(
																", "
														  ) +
														  ") "
														: "",
												f =
													e.length
														? "UPDATE SET " +
														  e
														: "NOTHING";
											s.text =
												"ON CONFLICT " +
												c +
												"DO " +
												f;
										}
										return s;
									},
								},
							]),
							o
						);
					})(a.AbstractSetFieldBlock)),
				(a.ReturningBlock = (function (i) {
					function o(e) {
						r(this, o);
						var n = t(
							this,
							(
								o.__proto__ ||
								Object.getPrototypeOf(
									o
								)
							).call(this, e)
						);
						return (n._fields = []), n;
					}
					return (
						e(o, i),
						v(o, [
							{
								key: "returning",
								value: function (
									t
								) {
									var e =
											arguments.length >
												1 &&
											void 0 !==
												arguments[1]
												? arguments[1]
												: null,
										r =
											arguments.length >
												2 &&
											void 0 !==
												arguments[2]
												? arguments[2]
												: {};
									(e = e
										? this._sanitizeFieldAlias(
												e
										  )
										: e),
										(t =
											this._sanitizeField(
												t
											));
									var n =
										this._fields.filter(
											function (
												r
											) {
												return (
													r.name ===
														t &&
													r.alias ===
														e
												);
											}
										);
									return n.length
										? this
										: void this._fields.push(
												{
													name: t,
													alias: e,
													options: r,
												}
										  );
								},
							},
							{
								key: "_toParamString",
								value: function () {
									var t =
											arguments.length >
												0 &&
											void 0 !==
												arguments[0]
												? arguments[0]
												: {},
										e =
											(t.queryBuilder,
											t.buildParameterized),
										r =
											"",
										i =
											[],
										o =
											!0,
										l =
											!1,
										a =
											void 0;
									try {
										for (
											var u,
												s =
													this._fields[
														Symbol
															.iterator
													]();
											!(o =
												(u =
													s.next())
													.done);
											o =
												!0
										) {
											var c =
												u.value;
											r =
												n(
													r,
													", "
												);
											var f =
													c.name,
												h =
													c.alias,
												v =
													c.options;
											if (
												"string" ==
												typeof f
											)
												r +=
													this._formatFieldName(
														f,
														v
													);
											else {
												var d =
													f._toParamString(
														{
															nested: !0,
															buildParameterized:
																e,
														}
													);
												(r +=
													d.text),
													d.values.forEach(
														function (
															t
														) {
															return i.push(
																t
															);
														}
													);
											}
											h &&
												(r +=
													" AS " +
													this._formatFieldAlias(
														h
													));
										}
									} catch (_) {
										(l =
											!0),
											(a =
												_);
									} finally {
										try {
											!o &&
												s[
													"return"
												] &&
												s[
													"return"
												]();
										} finally {
											if (
												l
											)
												throw a;
										}
									}
									return {
										text:
											r.length >
											0
												? "RETURNING " +
												  r
												: "",
										values: i,
									};
								},
							},
						]),
						o
					);
				})(a.Block)),
				(a.WithBlock = (function (n) {
					function i(e) {
						r(this, i);
						var n = t(
							this,
							(
								i.__proto__ ||
								Object.getPrototypeOf(
									i
								)
							).call(this, e)
						);
						return (n._tables = []), n;
					}
					return (
						e(i, n),
						v(i, [
							{
								key: "with",
								value: function (
									t,
									e
								) {
									this._tables.push(
										{
											alias: t,
											table: e,
										}
									);
								},
							},
							{
								key: "_toParamString",
								value: function () {
									var t =
											arguments.length >
												0 &&
											void 0 !==
												arguments[0]
												? arguments[0]
												: {},
										e =
											[],
										r =
											[],
										n =
											!0,
										i =
											!1,
										o =
											void 0;
									try {
										for (
											var l,
												a =
													this._tables[
														Symbol
															.iterator
													]();
											!(n =
												(l =
													a.next())
													.done);
											n =
												!0
										) {
											var u =
													l.value,
												s =
													u.alias,
												c =
													u.table,
												f =
													c._toParamString(
														{
															buildParameterized:
																t.buildParameterized,
															nested: !0,
														}
													);
											e.push(
												s +
													" AS " +
													f.text
											),
												f.values.forEach(
													function (
														t
													) {
														return r.push(
															t
														);
													}
												);
										}
									} catch (h) {
										(i =
											!0),
											(o =
												h);
									} finally {
										try {
											!n &&
												a[
													"return"
												] &&
												a[
													"return"
												]();
										} finally {
											if (
												i
											)
												throw o;
										}
									}
									return {
										text: e.length
											? "WITH " +
											  e.join(
													", "
											  )
											: "",
										values: r,
									};
								},
							},
						]),
						i
					);
				})(a.Block)),
				(a.DistinctOnBlock = (function (n) {
					function i(e) {
						r(this, i);
						var n = t(
							this,
							(
								i.__proto__ ||
								Object.getPrototypeOf(
									i
								)
							).call(this, e)
						);
						return (
							(n._distinctFields =
								[]),
							n
						);
					}
					return (
						e(i, n),
						v(i, [
							{
								key: "distinct",
								value: function () {
									var t =
										this;
									this._useDistinct =
										!0;
									for (
										var e =
												arguments.length,
											r =
												Array(
													e
												),
											n = 0;
										n <
										e;
										n++
									)
										r[
											n
										] =
											arguments[
												n
											];
									r.forEach(
										function (
											e
										) {
											t._distinctFields.push(
												t._sanitizeField(
													e
												)
											);
										}
									);
								},
							},
							{
								key: "_toParamString",
								value: function () {
									var t =
										"";
									return (
										this
											._useDistinct &&
											((t =
												"DISTINCT"),
											this
												._distinctFields
												.length &&
												(t +=
													" ON (" +
													this._distinctFields.join(
														", "
													) +
													")")),
										{
											text: t,
											values: [],
										}
									);
								},
							},
						]),
						i
					);
				})(a.Block)),
				(a.Select = (function (n) {
					function i(e) {
						var n =
							arguments.length > 1 &&
							void 0 !== arguments[1]
								? arguments[1]
								: null;
						return (
							r(this, i),
							(n = n || [
								new a.WithBlock(
									e
								),
								new a.StringBlock(
									e,
									"SELECT"
								),
								new a.FunctionBlock(
									e
								),
								new a.DistinctOnBlock(
									e
								),
								new a.GetFieldBlock(
									e
								),
								new a.FromTableBlock(
									e
								),
								new a.JoinBlock(
									e
								),
								new a.WhereBlock(
									e
								),
								new a.GroupByBlock(
									e
								),
								new a.HavingBlock(
									e
								),
								new a.OrderByBlock(
									e
								),
								new a.LimitBlock(
									e
								),
								new a.OffsetBlock(
									e
								),
								new a.UnionBlock(
									e
								),
							]),
							t(
								this,
								(
									i.__proto__ ||
									Object.getPrototypeOf(
										i
									)
								).call(
									this,
									e,
									n
								)
							)
						);
					}
					return e(i, n), i;
				})(a.QueryBuilder)),
				(a.Insert = (function (n) {
					function i(e) {
						var n =
							arguments.length > 1 &&
							void 0 !== arguments[1]
								? arguments[1]
								: null;
						return (
							r(this, i),
							(n = n || [
								new a.WithBlock(
									e
								),
								new a.StringBlock(
									e,
									"INSERT"
								),
								new a.IntoTableBlock(
									e
								),
								new a.InsertFieldValueBlock(
									e
								),
								new a.InsertFieldsFromQueryBlock(
									e
								),
								new a.PostgresOnConflictKeyUpdateBlock(
									e
								),
								new a.ReturningBlock(
									e
								),
							]),
							t(
								this,
								(
									i.__proto__ ||
									Object.getPrototypeOf(
										i
									)
								).call(
									this,
									e,
									n
								)
							)
						);
					}
					return e(i, n), i;
				})(a.QueryBuilder)),
				(a.Update = (function (n) {
					function i(e) {
						var n =
							arguments.length > 1 &&
							void 0 !== arguments[1]
								? arguments[1]
								: null;
						return (
							r(this, i),
							(n = n || [
								new a.WithBlock(
									e
								),
								new a.StringBlock(
									e,
									"UPDATE"
								),
								new a.UpdateTableBlock(
									e
								),
								new a.SetFieldBlock(
									e
								),
								new a.FromTableBlock(
									e
								),
								new a.WhereBlock(
									e
								),
								new a.OrderByBlock(
									e
								),
								new a.LimitBlock(
									e
								),
								new a.ReturningBlock(
									e
								),
							]),
							t(
								this,
								(
									i.__proto__ ||
									Object.getPrototypeOf(
										i
									)
								).call(
									this,
									e,
									n
								)
							)
						);
					}
					return e(i, n), i;
				})(a.QueryBuilder)),
				(a.Delete = (function (n) {
					function o(e) {
						var n =
							arguments.length > 1 &&
							void 0 !== arguments[1]
								? arguments[1]
								: null;
						return (
							r(this, o),
							(n = n || [
								new a.WithBlock(
									e
								),
								new a.StringBlock(
									e,
									"DELETE"
								),
								new a.TargetTableBlock(
									e
								),
								new a.FromTableBlock(
									i(
										{},
										e,
										{
											singleTable:
												!0,
										}
									)
								),
								new a.JoinBlock(
									e
								),
								new a.WhereBlock(
									e
								),
								new a.OrderByBlock(
									e
								),
								new a.LimitBlock(
									e
								),
								new a.ReturningBlock(
									e
								),
							]),
							t(
								this,
								(
									o.__proto__ ||
									Object.getPrototypeOf(
										o
									)
								).call(
									this,
									e,
									n
								)
							)
						);
					}
					return e(o, n), o;
				})(a.QueryBuilder));
		}),
		_
	);
}
