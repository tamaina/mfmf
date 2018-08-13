"use strict";
/**
 * Big
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(text) {
    var match = text.match(/^\*\*\*(.+?)\*\*\*/);
    if (!match)
        return null;
    var big = match[0];
    return {
        type: 'big',
        content: big,
        big: match[1]
    };
}
exports.default = default_1;
