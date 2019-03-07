"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_1 = require("./language");
const normalize_1 = require("./normalize");
function parse(source) {
    if (source == null || source == '') {
        return [];
    }
    return normalize_1.normalize(language_1.mfmLanguage.root.tryParse(source));
}
exports.parse = parse;
function parsePlain(source) {
    if (source == null || source == '') {
        return [];
    }
    return normalize_1.normalize(language_1.mfmLanguage.plain.tryParse(source));
}
exports.parsePlain = parsePlain;
