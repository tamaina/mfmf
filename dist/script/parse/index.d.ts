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
export declare type TextElement = {
    type: 'text';
    content: string;
    cover?: number;
} | TextElementBold | TextElementBig | TextElementCode | TextElementEmoji | TextElementHashtag | TextElementInlineCode | TextElementLink | TextElementMention | TextElementQuote | TextElementSearch | TextElementTitle | TextElementUrl | TextElementMotion;
export declare type TextElementProcessor = (text: string, i: number) => TextElement | TextElement[];
declare const _default: (source: string) => TextElement[];
export default _default;
