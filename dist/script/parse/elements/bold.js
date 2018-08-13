"use strict";
/**
 * Bold
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(text) {
    var match = text.match(/^\*\*(.+?)\*\*/);
    if (!match)
        return null;
    var bold = match[0];
    return {
        type: 'bold',
        content: bold,
        bold: bold.substr(2, bold.length - 4)
    };
}
exports.default = default_1;
