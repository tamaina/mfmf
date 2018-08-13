/**
 * Code (block)
 */
export declare type TextElementCode = {
    type: 'code';
    content: string;
    cover: number;
    code: string;
    html: string;
};
export default function (text: string): TextElementCode | null;
