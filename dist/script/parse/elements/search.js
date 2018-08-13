"use strict";
/**
 * Search
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(text) {
    var match = text.match(/^(.+?) (検索|search)(\n|$)/i);
    if (!match)
        return null;
    return {
        type: 'search',
        content: match[0],
        query: match[1],
        search: match[2]
    };
}
exports.default = default_1;
