"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse5 = require('parse5');
function default_1(html) {
    if (html == null)
        return '';
    var dom = parse5.parseFragment(html);
    var text = '';
    dom.childNodes.forEach(function (n) { return analyze(n); });
    return text.trim();
    function getText(node) {
        if (node.nodeName == '#text')
            return node.value;
        if (node.childNodes) {
            return node.childNodes.map(function (n) { return getText(n); }).join('');
        }
        return '';
    }
    function analyze(node) {
        switch (node.nodeName) {
            case '#text':
                text += node.value;
                break;
            case 'br':
                text += '\n';
                break;
            case 'a':
                var txt = getText(node);
                var rel = node.attrs.find(function (x) { return x.name == 'rel'; });
                // メンション
                if (txt.startsWith('@')) {
                    var part = txt.split('@');
                    if (part.length == 2) {
                        //#region ホスト名部分が省略されているので復元する
                        var href = new URL(node.attrs.find(function (x) { return x.name == 'href'; }).value);
                        var acct = txt + '@' + href.hostname;
                        text += acct;
                        break;
                        //#endregion
                    }
                    else if (part.length == 3) {
                        text += txt;
                        break;
                    }
                    // ハッシュタグ
                }
                else if (rel && rel.value.match('tag') !== null) {
                    text += txt;
                    // その他
                }
                else {
                    text += "[" + txt + "](" + node.attrs.find(function (x) { return x.name == 'href'; }).value + ")";
                }
                break;
            case 'p':
                text += '\n';
                if (node.childNodes) {
                    node.childNodes.forEach(function (n) { return analyze(n); });
                }
                break;
            default:
                if (node.childNodes) {
                    node.childNodes.forEach(function (n) { return analyze(n); });
                }
                break;
        }
    }
}
exports.default = default_1;
