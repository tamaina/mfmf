import { EndoRelation, Predicate } from './relation';
/**
 * Count the number of elements that satisfy the predicate
 */
export declare function countIf<T>(f: Predicate<T>, xs: T[]): number;
/**
 * Count the number of elements that is equal to the element
 */
export declare function count<T>(a: T, xs: T[]): number;
/**
 * Concatenate an array of arrays
 */
export declare function concat<T>(xss: T[][]): T[];
/**
 * Intersperse the element between the elements of the array
 * @param sep The element to be interspersed
 */
export declare function intersperse<T>(sep: T, xs: T[]): T[];
/**
 * Returns the array of elements that is not equal to the element
 */
export declare function erase<T>(a: T, xs: T[]): T[];
/**
 * Finds the array of all elements in the first array not contained in the second array.
 * The order of result values are determined by the first array.
 */
export declare function difference<T>(xs: T[], ys: T[]): T[];
/**
 * Remove all but the first element from every group of equivalent elements
 */
export declare function unique<T>(xs: T[]): T[];
export declare function sum(xs: number[]): number;
export declare function maximum(xs: number[]): number;
/**
 * Splits an array based on the equivalence relation.
 * The concatenation of the result is equal to the argument.
 */
export declare function groupBy<T>(f: EndoRelation<T>, xs: T[]): T[][];
/**
 * Splits an array based on the equivalence relation induced by the function.
 * The concatenation of the result is equal to the argument.
 */
export declare function groupOn<T, S>(f: (x: T) => S, xs: T[]): T[][];
/**
 * Compare two arrays by lexicographical order
 */
export declare function lessThan(xs: number[], ys: number[]): boolean;
/**
 * Returns the longest prefix of elements that satisfy the predicate
 */
export declare function takeWhile<T>(f: Predicate<T>, xs: T[]): T[];
export declare function cumulativeSum(xs: number[]): number[];
