"use strict";
/**
 * Quoted text
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(text) {
    var match = text.match(/^"([\s\S]+?)\n"\n/);
    if (!match)
        return null;
    var quote = match[0].slice(0, -1);
    return {
        type: 'quote',
        content: quote,
        cover: quote.length + 1,
        quote: quote.substr(1, quote.length - 2).trim(),
    };
}
exports.default = default_1;
