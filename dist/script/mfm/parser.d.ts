import * as P from 'parsimmon';
export declare const emojiRegex: RegExp;
export declare type Node = {
    name: string;
    children: Node[];
    props?: any;
};
export declare const plainParser: P.Language;
declare const mfm: P.Language;
export default mfm;
