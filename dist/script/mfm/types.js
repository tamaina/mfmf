"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const T = require("../prelude/tree");
function createLeaf(type, props) {
    return T.createLeaf({ type, props });
}
exports.createLeaf = createLeaf;
function createTree(type, children, props) {
    return T.createTree({ type, props }, children);
}
exports.createTree = createTree;
