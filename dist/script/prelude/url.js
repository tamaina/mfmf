"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = require("querystring");
function query(obj) {
    return querystring_1.stringify(Object.entries(obj)
        .filter(([, v]) => Array.isArray(v) ? v.length : v !== undefined)
        .reduce((a, [k, v]) => (a[k] = v, a), {}));
}
exports.query = query;
