"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (acct) {
    var splitted = acct.split('@', 2);
    return { username: splitted[0], host: splitted[1] || null };
});
