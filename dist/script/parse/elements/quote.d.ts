/**
 * Quoted text
 */
export declare type TextElementQuote = {
    type: 'quote';
    content: string;
    quote: string;
};
export default function (text: string, index: number): TextElementQuote | null;
