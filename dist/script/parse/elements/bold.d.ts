/**
 * Bold
 */
export declare type TextElementBold = {
    type: 'bold';
    content: string;
    bold: string;
};
export default function (text: string): TextElementBold | null;
