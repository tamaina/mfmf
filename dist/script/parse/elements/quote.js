"use strict";
/**
 * Quoted text
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(text, index) {
    var match = text.match(/^"([\s\S]+?)\n"/) || text.match(/^\n>([\s\S]+?)(\n\n|$)/) ||
        (index == 0 ? text.match(/^>([\s\S]+?)(\n\n|$)/) : null);
    if (!match)
        return null;
    var quote = match[1]
        .split('\n')
        .map(function (line) { return line.replace(/^>+/g, '').trim(); })
        .join('\n')
        .trim();
    return {
        type: 'quote',
        content: match[0],
        quote: quote,
    };
}
exports.default = default_1;
