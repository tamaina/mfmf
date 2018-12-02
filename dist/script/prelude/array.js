"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function countIf(f, xs) {
    return xs.filter(f).length;
}
exports.countIf = countIf;
function count(x, xs) {
    return countIf(y => x === y, xs);
}
exports.count = count;
function concat(xss) {
    return [].concat(...xss);
}
exports.concat = concat;
function intersperse(sep, xs) {
    return concat(xs.map(x => [sep, x])).slice(1);
}
exports.intersperse = intersperse;
function erase(x, xs) {
    return xs.filter(y => x !== y);
}
exports.erase = erase;
/**
 * Finds the array of all elements in the first array not contained in the second array.
 * The order of result values are determined by the first array.
 */
function difference(includes, excludes) {
    return includes.filter(x => !excludes.includes(x));
}
exports.difference = difference;
function unique(xs) {
    return [...new Set(xs)];
}
exports.unique = unique;
function sum(xs) {
    return xs.reduce((a, b) => a + b, 0);
}
exports.sum = sum;
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
function groupOn(f, xs) {
    return groupBy((a, b) => f(a) === f(b), xs);
}
exports.groupOn = groupOn;
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
