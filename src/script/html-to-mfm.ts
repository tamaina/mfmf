const parse5 = require('parse5');

export default function(html: string): string {
	if (html == null) return '';

	const dom = parse5.parseFragment(html);

	let text = '';

	dom.childNodes.forEach((n: any) => analyze(n));

	return text.trim();

	function getText(node: any) {
		if (node.nodeName == '#text') return node.value;

		if (node.childNodes) {
			return node.childNodes.map((n: any) => getText(n)).join('');
		}

		return '';
	}

	function analyze(node: any) {
		switch (node.nodeName) {
			case '#text':
				text += node.value;
				break;

			case 'br':
				text += '\n';
				break;

			case 'a':
				const txt = getText(node);

				// メンション
				if (txt.startsWith('@')) {
					const part = txt.split('@');

					if (part.length == 2) {
						//#region ホスト名部分が省略されているので復元する
						const href = new URL(node.attrs.find((x: any) => x.name == 'href').value);
						const acct = txt + '@' + href.hostname;
						text += acct;
						break;
						//#endregion
					} else if (part.length == 3) {
						text += txt;
						break;
					}
				// ハッシュタグ
				} else if (node.attrs.find((x: any) => x.name == 'rel').value.match('tag') !== null) {
					text += txt;
				// その他
				} else {
					text += `[${txt}](${node.attrs.find((x: any) => x.name == 'href').value})`;
				}
				break;

			case 'p':
				text += '\n';
				if (node.childNodes) {
					node.childNodes.forEach((n: any) => analyze(n));
				}
				break;

			default:
				if (node.childNodes) {
					node.childNodes.forEach((n: any) => analyze(n));
				}
				break;
		}
	}
}
