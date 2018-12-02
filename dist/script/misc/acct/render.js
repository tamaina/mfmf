"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (user) => {
    return user.host === null ? user.username : `${user.username}@${user.host}`;
};
