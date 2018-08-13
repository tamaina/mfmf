/**
 * Quoted text
 */
export declare type TextElementQuote = {
    type: 'quote';
    content: string;
    cover: number;
    quote: string;
};
export default function (text: string): TextElementQuote | null;
