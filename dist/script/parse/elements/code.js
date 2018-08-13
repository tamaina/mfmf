"use strict";
/**
 * Code (block)
 */
Object.defineProperty(exports, "__esModule", { value: true });
var syntax_highlighter_1 = require("../core/syntax-highlighter");
function default_1(text) {
    var match = text.match(/^```([\s\S]+?)```\n/);
    if (!match)
        return null;
    var code = match[0].slice(0, -1);
    return {
        type: 'code',
        content: code,
        cover: code.length + 1,
        code: code.substr(3, code.length - 6).trim(),
        html: syntax_highlighter_1.default(code.substr(3, code.length - 6).trim())
    };
}
exports.default = default_1;
