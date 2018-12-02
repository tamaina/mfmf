"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_objectid_1 = require("./is-objectid");
function toString(id) {
    return is_objectid_1.default(id) ? id.toHexString() : id;
}
function default_1(note, mutedUserIds) {
    if (mutedUserIds.includes(toString(note.userId))) {
        return true;
    }
    if (note.reply != null && mutedUserIds.includes(toString(note.reply.userId))) {
        return true;
    }
    if (note.renote != null && mutedUserIds.includes(toString(note.renote.userId))) {
        return true;
    }
    return false;
}
exports.default = default_1;
