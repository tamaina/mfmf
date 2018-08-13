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
    var code = match[0];
    return {
        type: 'inline-code',
        content: code,
        code: code.substr(1, code.length - 2).trim(),
        html: syntax_highlighter_1.default(code.substr(1, code.length - 2).trim())
    };
}
exports.default = default_1;
