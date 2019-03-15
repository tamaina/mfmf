"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;'
};
const beginingOfCDATA = '<![CDATA[';
const endOfCDATA = ']]>';
function escapeValue(x) {
    let insideOfCDATA = false;
    let builder = '';
    for (let i = 0; i < x.length;) {
        if (insideOfCDATA) {
            if (x.slice(i, i + beginingOfCDATA.length) === beginingOfCDATA) {
                insideOfCDATA = true;
                i += beginingOfCDATA.length;
            }
            else {
                builder += x[i++];
            }
        }
        else {
            if (x.slice(i, i + endOfCDATA.length) === endOfCDATA) {
                insideOfCDATA = false;
                i += endOfCDATA.length;
            }
            else {
                const b = x[i++];
                builder += map[b] || b;
            }
        }
    }
    return builder;
}
exports.escapeValue = escapeValue;
function escapeAttribute(x) {
    return Object.entries(map).reduce((a, [k, v]) => a.replace(k, v), x);
}
exports.escapeAttribute = escapeAttribute;
