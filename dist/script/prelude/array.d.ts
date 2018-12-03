export declare function countIf<T>(f: (x: T) => boolean, xs: T[]): number;
export declare function count<T>(x: T, xs: T[]): number;
export declare function concat<T>(xss: T[][]): T[];
export declare function intersperse<T>(sep: T, xs: T[]): T[];
export declare function erase<T>(x: T, xs: T[]): T[];
/**
 * Finds the array of all elements in the first array not contained in the second array.
 * The order of result values are determined by the first array.
 */
export declare function difference<T>(includes: T[], excludes: T[]): T[];
export declare function unique<T>(xs: T[]): T[];
export declare function sum(xs: number[]): number;
export declare function groupBy<T>(f: (x: T, y: T) => boolean, xs: T[]): T[][];
export declare function groupOn<T, S>(f: (x: T) => S, xs: T[]): T[][];
export declare function lessThan(xs: number[], ys: number[]): boolean;
export declare function takeWhile<T>(f: (x: T) => boolean, xs: T[]): T[];
