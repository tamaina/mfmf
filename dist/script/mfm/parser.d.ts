import * as P from 'parsimmon';
import { Tree } from '../prelude/tree';
export declare const emojiRegex: RegExp;
declare type Node<T, P> = {
    type: T;
    props: P;
};
export declare type MentionNode = Node<'mention', {
    canonical: string;
    username: string;
    host: string;
    acct: string;
}>;
export declare type HashtagNode = Node<'hashtag', {
    hashtag: string;
}>;
export declare type EmojiNode = Node<'emoji', {
    name: string;
}>;
export declare type MfmNode = MentionNode | HashtagNode | EmojiNode | Node<string, any>;
export declare type MfmTree = Tree<MfmNode>;
export declare type MfmForest = MfmTree[];
export declare function createLeaf(type: string, props: any): MfmTree;
export declare function createTree(type: string, children: MfmForest, props: any): MfmTree;
export declare function removeOrphanedBrackets(s: string): string;
export declare const plainParser: P.Language;
declare const mfm: P.Language;
export default mfm;
