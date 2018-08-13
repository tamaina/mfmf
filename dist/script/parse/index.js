"use strict";
/**
 * Misskey Text Analyzer
 */
Object.defineProperty(exports, "__esModule", { value: true });
var elements = [
    require('./elements/big'),
    require('./elements/bold'),
    require('./elements/title'),
    require('./elements/url'),
    require('./elements/link'),
    require('./elements/mention'),
    require('./elements/hashtag'),
    require('./elements/code'),
    require('./elements/inline-code'),
    require('./elements/quote'),
    require('./elements/emoji'),
    require('./elements/search'),
    require('./elements/motion')
].map(function (element) { return element.default; });
exports.default = (function (source) {
    if (source == null || source == '') {
        return null;
    }
    var tokens = [];
    function push(token) {
        if (token != null) {
            tokens.push(token);
            source = source.substr(token.cover ? token.cover : token.content.length);
        }
    }
    var i = 0;
    // パース
    while (source != '') {
        var parsed = elements.some(function (el) {
            var _tokens = el(source, i);
            if (_tokens) {
                if (!Array.isArray(_tokens)) {
                    _tokens = [_tokens];
                }
                _tokens.forEach(push);
                return true;
            }
            else {
                return false;
            }
        });
        if (!parsed) {
            push({
                type: 'text',
                content: source[0]
            });
        }
        i++;
    }
    // テキストを纏める
    return tokens.reduce(function (a, b) {
        if (a.length && a[a.length - 1].type == 'text' && b.type == 'text') {
            var tail = a.pop();
            return a.concat({
                type: 'text',
                content: tail.content + b.content
            });
        }
        else {
            return a.concat(b);
        }
    }, []);
});
