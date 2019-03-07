"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (acct) => {
    if (acct.startsWith('@'))
        acct = acct.substr(1);
    const split = acct.split('@', 2);
    return { username: split[0], host: split[1] || null };
};
