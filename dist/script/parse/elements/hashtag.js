"use strict";
/**
 * Hashtag
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(text, i) {
    if (!(/^\s#[^\s\.,]+/.test(text) || (i == 0 && /^#[^\s\.,]+/.test(text))))
        return null;
    var isHead = text.startsWith('#');
    var hashtag = text.match(/^\s?#[^\s\.,]+/)[0];
    var res = !isHead ? [{
            type: 'text',
            content: text[0]
        }] : [];
    res.push({
        type: 'hashtag',
        content: isHead ? hashtag : hashtag.substr(1),
        hashtag: isHead ? hashtag.substr(1) : hashtag.substr(2)
    });
    return res;
}
exports.default = default_1;
