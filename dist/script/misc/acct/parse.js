"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (acct) => {
    if (acct.startsWith('@'))
        acct = acct.substr(1);
    const splitted = acct.split('@', 2);
    return { username: splitted[0], host: splitted[1] || null };
};
