"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = require("mongodb");
const cafy_1 = require("cafy");
const is_objectid_1 = require("./is-objectid");
exports.isAnId = (x) => mongo.ObjectID.isValid(x);
exports.isNotAnId = (x) => !exports.isAnId(x);
exports.transform = (x) => {
    if (x == null)
        return null;
    if (exports.isAnId(x) && !is_objectid_1.default(x)) {
        return new mongo.ObjectID(x);
    }
    else {
        return x;
    }
};
exports.transformMany = (xs) => {
    if (xs == null)
        return [];
    return xs.map(x => exports.transform(x));
};
/**
 * ID
 */
class ID extends cafy_1.Context {
    constructor() {
        super();
        this.push((v) => {
            if (!is_objectid_1.default(v) && exports.isNotAnId(v)) {
                return new Error('must-be-an-id');
            }
            return true;
        });
    }
    getType() {
        return super.getType('string');
    }
}
exports.default = ID;
