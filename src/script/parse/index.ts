/**
 * Misskey Text Analyzer
 */

import { TextElementBold } from './elements/bold';
import { TextElementBig } from './elements/big';
import { TextElementCode } from './elements/code';
import { TextElementEmoji } from './elements/emoji';
import { TextElementHashtag } from './elements/hashtag';
import { TextElementInlineCode } from './elements/inline-code';
import { TextElementLink } from './elements/link';
import { TextElementMention } from './elements/mention';
import { TextElementQuote } from './elements/quote';
import { TextElementSearch } from './elements/search';
import { TextElementTitle } from './elements/title';
import { TextElementUrl } from './elements/url';
import { TextElementMotion } from './elements/motion';

const elements = [
	require('./elements/big'),
	require('./elements/bold'),
	require('./elements/title'),
	require('./elements/url'),
	require('./elements/link'),
	require('./elements/mention'),
	require('./elements/hashtag'),
	require('./elements/code'),
	require('./elements/inline-code'),
	require('./elements/quote'),
	require('./elements/emoji'),
	require('./elements/search'),
	require('./elements/motion')
].map(element => element.default as TextElementProcessor);

export type TextElement = { type: 'text', content: string, cover?: number }
	| TextElementBold
	| TextElementBig
	| TextElementCode
	| TextElementEmoji
	| TextElementHashtag
	| TextElementInlineCode
	| TextElementLink
	| TextElementMention
	| TextElementQuote
	| TextElementSearch
	| TextElementTitle
	| TextElementUrl
	| TextElementMotion;
export type TextElementProcessor = (text: string, i: number) => TextElement | TextElement[];

export default (source: string): TextElement[] => {
	if (source == null || source == '') {
		return null;
	}

	const tokens: TextElement[] = [];

	function push(token: TextElement) {
		if (token != null) {
			tokens.push(token);
			source = source.substr( token.cover ? token.cover : token.content.length);
		}
	}

	let i = 0;

	// パース
	while (source != '') {
		const parsed = elements.some(el => {
			let _tokens = el(source, i);
			if (_tokens) {
				if (!Array.isArray(_tokens)) {
					_tokens = [_tokens];
				}
				_tokens.forEach(push);
				return true;
			} else {
				return false;
			}
		});

		if (!parsed) {
			push({
				type: 'text',
				content: source[0]
			});
		}

		i++;
	}

	// テキストを纏める
	return tokens.reduce((a, b) => {
		if (a.length && a[a.length - 1].type == 'text' && b.type == 'text') {
			const tail = a.pop();
			return a.concat({
				type: 'text',
				content: tail.content + b.content
			});
		} else {
			return a.concat(b);
		}
	}, [] as TextElement[]);
};
