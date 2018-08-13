"use strict";
/**
 * Title
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(text) {
    var match = text.match(/^(【|\[)(.+?)(】|])\n/);
    if (!match)
        return null;
    var title = match[0];
    return {
        type: 'title',
        content: title,
        title: title.substr(1, title.length - 3)
    };
}
exports.default = default_1;
