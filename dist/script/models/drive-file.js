"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateFileName(name) {
    return ((name.trim().length > 0) &&
        (name.length <= 200) &&
        (name.indexOf('\\') === -1) &&
        (name.indexOf('/') === -1) &&
        (name.indexOf('..') === -1));
}
exports.validateFileName = validateFileName;
