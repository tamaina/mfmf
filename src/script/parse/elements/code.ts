/**
 * Code (block)
 */

import genHtml from '../core/syntax-highlighter';

export type TextElementCode = {
	type: 'code'
	content: string
	cover: number
	code: string
	html: string
};

export default function(text: string) {
	const match = text.match(/^```([\s\S]+?)```\n/);
	if (!match) return null;
	const code = match[0].slice(0, -1);
	return {
		type: 'code',
		content: code,
		cover: code.length + 1,
		code: code.substr(3, code.length - 6).trim(),
		html: genHtml(code.substr(3, code.length - 6).trim())
	} as TextElementCode;
}
