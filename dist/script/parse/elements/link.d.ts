/**
 * Link
 */
export declare type TextElementLink = {
    type: 'link';
    content: string;
    title: string;
    url: string;
    silent: boolean;
};
export default function (text: string): TextElementLink | null;
