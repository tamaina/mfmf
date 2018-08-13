"use strict";
/**
 * URL
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(text) {
    var match = text.match(/^https?:\/\/[\w\/:%#@\$&\?!\(\)\[\]~\.=\+\-]+/);
    if (!match)
        return null;
    var url = match[0];
    return {
        type: 'url',
        content: url,
        url: url
    };
}
exports.default = default_1;
