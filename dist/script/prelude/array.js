"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Count the number of elements that satisfy the predicate
 */
function countIf(f, xs) {
    return xs.filter(f).length;
}
exports.countIf = countIf;
/**
 * Count the number of elements that is equal to the element
 */
function count(a, xs) {
    return countIf(x => x === a, xs);
}
exports.count = count;
/**
 * Concatenate an array of arrays
 */
function concat(xss) {
    return [].concat(...xss);
}
exports.concat = concat;
/**
 * Intersperse the element between the elements of the array
 * @param sep The element to be interspersed
 */
function intersperse(sep, xs) {
    return concat(xs.map(x => [sep, x])).slice(1);
}
exports.intersperse = intersperse;
/**
 * Returns the array of elements that is not equal to the element
 */
function erase(a, xs) {
    return xs.filter(x => x !== a);
}
exports.erase = erase;
/**
 * Finds the array of all elements in the first array not contained in the second array.
 * The order of result values are determined by the first array.
 */
function difference(xs, ys) {
    return xs.filter(x => !ys.includes(x));
}
exports.difference = difference;
/**
 * Remove all but the first element from every group of equivalent elements
 */
function unique(xs) {
    return [...new Set(xs)];
}
exports.unique = unique;
function sum(xs) {
    return xs.reduce((a, b) => a + b, 0);
}
exports.sum = sum;
function maximum(xs) {
    return Math.max(...xs);
}
exports.maximum = maximum;
/**
 * Splits an array based on the equivalence relation.
 * The concatenation of the result is equal to the argument.
 */
function groupBy(f, xs) {
    const groups = [];
    for (const x of xs) {
        if (groups.length !== 0 && f(groups[groups.length - 1][0], x)) {
            groups[groups.length - 1].push(x);
        }
        else {
            groups.push([x]);
        }
    }
    return groups;
}
exports.groupBy = groupBy;
/**
 * Splits an array based on the equivalence relation induced by the function.
 * The concatenation of the result is equal to the argument.
 */
function groupOn(f, xs) {
    return groupBy((a, b) => f(a) === f(b), xs);
}
exports.groupOn = groupOn;
/**
 * Compare two arrays by lexicographical order
 */
function lessThan(xs, ys) {
    for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
        if (xs[i] < ys[i])
            return true;
        if (xs[i] > ys[i])
            return false;
    }
    return xs.length < ys.length;
}
exports.lessThan = lessThan;
/**
 * Returns the longest prefix of elements that satisfy the predicate
 */
function takeWhile(f, xs) {
    const ys = [];
    for (const x of xs) {
        if (f(x)) {
            ys.push(x);
        }
        else {
            break;
        }
    }
    return ys;
}
exports.takeWhile = takeWhile;
function cumulativeSum(xs) {
    const ys = Array.from(xs); // deep copy
    for (let i = 1; i < ys.length; i++)
        ys[i] += ys[i - 1];
    return ys;
}
exports.cumulativeSum = cumulativeSum;
