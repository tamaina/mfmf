"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringz_1 = require("stringz");
function isValidText(text) {
    return stringz_1.length(text.trim()) <= 1000 && text.trim() != '';
}
exports.isValidText = isValidText;
