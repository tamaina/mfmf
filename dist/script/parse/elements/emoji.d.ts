/**
 * Emoji
 */
export declare type TextElementEmoji = {
    type: 'emoji';
    content: string;
    emoji: string;
};
export default function (text: string): TextElementEmoji | null;
