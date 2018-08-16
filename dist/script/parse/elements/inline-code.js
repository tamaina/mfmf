"use strict";
/**
 * Code (inline)
 */
Object.defineProperty(exports, "__esModule", { value: true });
var syntax_highlighter_1 = require("../core/syntax-highlighter");
function default_1(text) {
    var match = text.match(/^`(.+?)`/);
    if (!match)
        return null;
    if (match[1].includes('´'))
        return null;
    var code = match[0];
    return {
        type: 'inline-code',
        content: code,
        code: match[1],
        html: syntax_highlighter_1.default(match[1])
    };
}
exports.default = default_1;
