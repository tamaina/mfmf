"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringz_1 = require("stringz");
function isValidCw(text) {
    return stringz_1.length(text.trim()) <= 100;
}
exports.isValidCw = isValidCw;
