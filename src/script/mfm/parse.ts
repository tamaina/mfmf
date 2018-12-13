import parser, { Node, plainParser } from './parser';
import * as A from '../prelude/array';
import * as S from '../prelude/string';

export default (source: string, plainText = false): Node[] => {
	if (source == null || source == '') {
		return [];
	}

	let nodes: Node[] = plainText ? plainParser.root.tryParse(source) : parser.root.tryParse(source);

	const combineText = (es: Node[]): Node =>
		({ name: 'text', children: [], props: { text: S.concat(es.map(e => e.props.text)) } });

	const concatText = (nodes: Node[]): Node[] =>
		A.concat(A.groupOn(x => x.name, nodes).map(es =>
			es[0].name === 'text' ? [combineText(es)] : es
		));

	const concatTextRecursive = (es: Node[]): void => {
		for (const x of es.filter(x => x.children.length > 0)) {
			x.children = concatText(x.children);
			concatTextRecursive(x.children);
		}
	};

	nodes = concatText(nodes);
	concatTextRecursive(nodes);

	const removeEmptyTextNodes = (nodes: Node[]) => {
		for (const n of nodes.filter(n => n.children.length > 0)) {
			n.children = removeEmptyTextNodes(n.children);
		}
		return nodes.filter(n => !(n.name == 'text' && n.props.text == ''));
	};

	nodes = removeEmptyTextNodes(nodes);

	return nodes;
};
