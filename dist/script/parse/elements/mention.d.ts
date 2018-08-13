export declare type TextElementMention = {
    type: 'mention';
    content: string;
    username: string;
    host: string;
};
export default function (text: string): TextElementMention | null;
