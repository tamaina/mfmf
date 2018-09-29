export declare type TextElementInlineCode = {
    type: 'inline-code';
    content: string;
    code: string;
    html: string;
};
export default function (text: string): TextElementInlineCode | null;
