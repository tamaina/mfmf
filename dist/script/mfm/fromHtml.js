"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse5_1 = require("parse5");
const url_1 = require("url");
function fromHtml(html) {
    if (html == null)
        return null;
    const dom = parse5_1.parseFragment(html);
    let text = '';
    for (const n of dom.childNodes) {
        analyze(n);
    }
    return text.trim();
    function getText(node) {
        if (node.nodeName == '#text')
            return node.value;
        if (node.childNodes) {
            return node.childNodes.map((n) => getText(n)).join('');
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
                const txt = getText(node);
                const rel = node.attrs.find((x) => x.name == 'rel');
                const href = node.attrs.find((x) => x.name == 'href');
                // ハッシュタグ / hrefがない / txtがURL
                if ((rel && rel.value.match('tag') !== null) || !href || href.value == txt) {
                    text += txt;
                    // メンション
                }
                else if (txt.startsWith('@') && !(rel && rel.value.match(/^me /))) {
                    const part = txt.split('@');
                    if (part.length == 2) {
                        //#region ホスト名部分が省略されているので復元する
                        const acct = `${txt}@${(new url_1.URL(href.value)).hostname}`;
                        text += acct;
                        //#endregion
                    }
                    else if (part.length == 3) {
                        text += txt;
                    }
                    // その他
                }
                else {
                    text += `[${txt}](${href.value})`;
                }
                break;
            case 'p':
                text += '\n\n';
                if (node.childNodes) {
                    for (const n of node.childNodes) {
                        analyze(n);
                    }
                }
                break;
            default:
                if (node.childNodes) {
                    for (const n of node.childNodes) {
                        analyze(n);
                    }
                }
                break;
        }
    }
}
exports.fromHtml = fromHtml;
