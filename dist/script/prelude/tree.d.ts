export declare type Tree<T> = {
    node: T;
    children: Forest<T>;
};
export declare type Forest<T> = Tree<T>[];
export declare function createLeaf<T>(node: T): Tree<T>;
export declare function createTree<T>(node: T, children: Forest<T>): Tree<T>;
export declare function hasChildren<T>(t: Tree<T>): boolean;
export declare function preorder<T>(t: Tree<T>): T[];
export declare function preorderF<T>(ts: Forest<T>): T[];
export declare function countNodes<T>(t: Tree<T>): number;
export declare function countNodesF<T>(ts: Forest<T>): number;
