/**
 * Title
 */
export declare type TextElementTitle = {
    type: 'title';
    content: string;
    title: string;
};
export default function (text: string): TextElementTitle | null;
