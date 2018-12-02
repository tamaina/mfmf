"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function concat(xs) {
    return xs.reduce((a, b) => a + b, "");
}
exports.concat = concat;
function capitalize(s) {
    return toUpperCase(s.charAt(0)) + toLowerCase(s.slice(1));
}
exports.capitalize = capitalize;
function toUpperCase(s) {
    return s.toUpperCase();
}
exports.toUpperCase = toUpperCase;
function toLowerCase(s) {
    return s.toLowerCase();
}
exports.toLowerCase = toLowerCase;
