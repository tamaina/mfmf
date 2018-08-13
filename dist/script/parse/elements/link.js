"use strict";
/**
 * Link
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(text) {
    var match = text.match(/^\??\[([^\[\]]+?)\]\((https?:\/\/[\w\/:%#@\$&\?!\(\)\[\]~\.=\+\-]+?)\)/);
    if (!match)
        return null;
    var silent = text[0] == '?';
    var link = match[0];
    var title = match[1];
    var url = match[2];
    return {
        type: 'link',
        content: link,
        title: title,
        url: url,
        silent: silent
    };
}
exports.default = default_1;
