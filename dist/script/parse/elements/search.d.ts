/**
 * Search
 */
export declare type TextElementSearch = {
    type: 'search';
    content: string;
    query: string;
};
export default function (text: string): {
    type: string;
    content: string;
    query: string;
    search: string;
} | null;
