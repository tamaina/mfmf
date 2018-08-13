/**
 * Motion
 */
export declare type TextElementMotion = {
    type: 'motion';
    content: string;
    motion: string;
};
export default function (text: string): TextElementMotion | null;
