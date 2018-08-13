/**
 * Quoted text
 */

export type TextElementQuote = {
	type: 'quote'
	content: string
	cover: number
	quote: string
};

export default function(text: string) {
	const match = text.match(/^"([\s\S]+?)\n"\n/);
	if (!match) return null;
	const quote = match[0].slice(0, -1);
	return {
		type: 'quote',
		content: quote,
		cover: quote.length + 1,
		quote: quote.substr(1, quote.length - 2).trim(),
	} as TextElementQuote;
}
