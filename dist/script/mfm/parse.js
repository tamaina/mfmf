"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
const A = require("../prelude/array");
const S = require("../prelude/string");
exports.default = (source, plainText = false) => {
    if (source == null || source == '') {
        return [];
    }
    let nodes = plainText ? parser_1.plainParser.root.tryParse(source) : parser_1.default.root.tryParse(source);
    const combineText = (es) => ({ name: 'text', children: [], props: { text: S.concat(es.map(e => e.props.text)) } });
    const concatText = (nodes) => A.concat(A.groupOn(x => x.name, nodes).map(es => es[0].name === 'text' ? [combineText(es)] : es));
    const concatTextRecursive = (es) => {
        for (const x of es.filter(x => x.children.length > 0)) {
            x.children = concatText(x.children);
            concatTextRecursive(x.children);
        }
    };
    nodes = concatText(nodes);
    concatTextRecursive(nodes);
    const removeEmptyTextNodes = (nodes) => {
        for (const n of nodes.filter(n => n.children.length > 0)) {
            n.children = removeEmptyTextNodes(n.children);
        }
        return nodes.filter(n => !(n.name == 'text' && n.props.text == ''));
    };
    nodes = removeEmptyTextNodes(nodes);
    return nodes;
};
