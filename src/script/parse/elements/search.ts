/**
 * Search
 */

export type TextElementSearch = {
	type: 'search'
	content: string
	query: string
};

export default function(text: string) {
	const match = text.match(/^(.+?)( |　)\[?(検索|Search)\]?(\n|$)/i);
	if (!match) return null;
	return {
		type: 'search',
		content: match[0],
		query: match[1],
		search: match[3]
	};
}
