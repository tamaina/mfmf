"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}
exports.gcd = gcd;
