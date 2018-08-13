/**
 * URL
 */
export declare type TextElementUrl = {
    type: 'url';
    content: string;
    url: string;
};
export default function (text: string): TextElementUrl | null;
