"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const A = require("../prelude/array");
const S = require("../prelude/string");
const tree_1 = require("../prelude/tree");
function isEmptyTextTree(t) {
    return t.node.type == 'text' && t.node.props.text === '';
}
function concatTextTrees(ts) {
    return tree_1.createLeaf({ type: 'text', props: { text: S.concat(ts.map(x => x.node.props.text)) } });
}
function concatIfTextTrees(ts) {
    return ts[0].node.type === 'text' ? [concatTextTrees(ts)] : ts;
}
function concatConsecutiveTextTrees(ts) {
    const us = A.concat(A.groupOn(t => t.node.type, ts).map(concatIfTextTrees));
    return us.map(t => tree_1.createTree(t.node, concatConsecutiveTextTrees(t.children)));
}
function removeEmptyTextNodes(ts) {
    return ts
        .filter(t => !isEmptyTextTree(t))
        .map(t => tree_1.createTree(t.node, removeEmptyTextNodes(t.children)));
}
function normalize(ts) {
    return removeEmptyTextNodes(concatConsecutiveTextTrees(ts));
}
exports.normalize = normalize;
