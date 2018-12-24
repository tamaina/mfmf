"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("./array");
function createLeaf(node) {
    return { node, children: [] };
}
exports.createLeaf = createLeaf;
function createTree(node, children) {
    return { node, children };
}
exports.createTree = createTree;
function hasChildren(t) {
    return t.children.length !== 0;
}
exports.hasChildren = hasChildren;
function preorder(t) {
    return [t.node, ...preorderF(t.children)];
}
exports.preorder = preorder;
function preorderF(ts) {
    return array_1.concat(ts.map(preorder));
}
exports.preorderF = preorderF;
function countNodes(t) {
    return preorder(t).length;
}
exports.countNodes = countNodes;
function countNodesF(ts) {
    return array_1.sum(ts.map(countNodes));
}
exports.countNodesF = countNodesF;
