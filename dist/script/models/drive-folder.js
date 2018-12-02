"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidFolderName(name) {
    return ((name.trim().length > 0) &&
        (name.length <= 200));
}
exports.isValidFolderName = isValidFolderName;
