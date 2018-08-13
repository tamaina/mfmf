"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function escape(text) {
    return text
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;');
}
// 文字数が多い順にソートします
// そうしないと、「function」という文字列が与えられたときに「func」が先にマッチしてしまう可能性があるためです
var _keywords = [
    'true',
    'false',
    'null',
    'nil',
    'undefined',
    'void',
    'var',
    'const',
    'let',
    'mut',
    'dim',
    'if',
    'then',
    'else',
    'switch',
    'match',
    'case',
    'default',
    'for',
    'each',
    'in',
    'while',
    'loop',
    'continue',
    'break',
    'do',
    'goto',
    'next',
    'end',
    'sub',
    'throw',
    'try',
    'catch',
    'finally',
    'enum',
    'delegate',
    'function',
    'func',
    'fun',
    'fn',
    'return',
    'yield',
    'async',
    'await',
    'require',
    'include',
    'import',
    'imports',
    'export',
    'exports',
    'from',
    'as',
    'using',
    'use',
    'internal',
    'module',
    'namespace',
    'where',
    'select',
    'struct',
    'union',
    'new',
    'delete',
    'this',
    'super',
    'base',
    'class',
    'interface',
    'abstract',
    'static',
    'public',
    'private',
    'protected',
    'virtual',
    'partial',
    'override',
    'extends',
    'implements',
    'constructor'
];
var keywords = _keywords
    .concat(_keywords.map(function (k) { return k[0].toUpperCase() + k.substr(1); }))
    .concat(_keywords.map(function (k) { return k.toUpperCase(); }))
    .sort(function (a, b) { return b.length - a.length; });
var symbols = [
    '=',
    '+',
    '-',
    '*',
    '/',
    '%',
    '~',
    '^',
    '&',
    '|',
    '>',
    '<',
    '!',
    '?'
];
var elements = [
    // comment
    function (code) {
        if (code.substr(0, 2) != '//')
            return null;
        var match = code.match(/^\/\/(.+?)(\n|$)/);
        if (!match)
            return null;
        var comment = match[0];
        return {
            html: "<span class=\"comment\">" + escape(comment) + "</span>",
            next: comment.length
        };
    },
    // block comment
    function (code) {
        var match = code.match(/^\/\*([\s\S]+?)\*\//);
        if (!match)
            return null;
        return {
            html: "<span class=\"comment\">" + escape(match[0]) + "</span>",
            next: match[0].length
        };
    },
    // string
    function (code) {
        if (!/^['"`]/.test(code))
            return null;
        var begin = code[0];
        var str = begin;
        var thisIsNotAString = false;
        for (var i = 1; i < code.length; i++) {
            var char = code[i];
            if (char == '\\') {
                str += char;
                str += code[i + 1] || '';
                i++;
                continue;
            }
            else if (char == begin) {
                str += char;
                break;
            }
            else if (char == '\n' || i == (code.length - 1)) {
                thisIsNotAString = true;
                break;
            }
            else {
                str += char;
            }
        }
        if (thisIsNotAString) {
            return null;
        }
        else {
            return {
                html: "<span class=\"string\">" + escape(str) + "</span>",
                next: str.length
            };
        }
    },
    // regexp
    function (code) {
        if (code[0] != '/')
            return null;
        var regexp = '';
        var thisIsNotARegexp = false;
        for (var i = 1; i < code.length; i++) {
            var char = code[i];
            if (char == '\\') {
                regexp += char;
                regexp += code[i + 1] || '';
                i++;
                continue;
            }
            else if (char == '/') {
                break;
            }
            else if (char == '\n' || i == (code.length - 1)) {
                thisIsNotARegexp = true;
                break;
            }
            else {
                regexp += char;
            }
        }
        if (thisIsNotARegexp)
            return null;
        if (regexp == '')
            return null;
        if (regexp[0] == ' ' && regexp[regexp.length - 1] == ' ')
            return null;
        return {
            html: "<span class=\"regexp\">/" + escape(regexp) + "/</span>",
            next: regexp.length + 2
        };
    },
    // label
    function (code) {
        if (code[0] != '@')
            return null;
        var match = code.match(/^@([a-zA-Z_-]+?)\n/);
        if (!match)
            return null;
        var label = match[0];
        return {
            html: "<span class=\"label\">" + label + "</span>",
            next: label.length
        };
    },
    // number
    function (code, i, source) {
        var prev = source[i - 1];
        if (prev && /[a-zA-Z]/.test(prev))
            return null;
        if (!/^[\-\+]?[0-9\.]+/.test(code))
            return null;
        var match = code.match(/^[\-\+]?[0-9\.]+/)[0];
        if (match) {
            return {
                html: "<span class=\"number\">" + match + "</span>",
                next: match.length
            };
        }
        else {
            return null;
        }
    },
    // nan
    function (code, i, source) {
        var prev = source[i - 1];
        if (prev && /[a-zA-Z]/.test(prev))
            return null;
        if (code.substr(0, 3) == 'NaN') {
            return {
                html: "<span class=\"nan\">NaN</span>",
                next: 3
            };
        }
        else {
            return null;
        }
    },
    // method
    function (code) {
        var match = code.match(/^([a-zA-Z_-]+?)\(/);
        if (!match)
            return null;
        if (match[1] == '-')
            return null;
        return {
            html: "<span class=\"method\">" + match[1] + "</span>",
            next: match[1].length
        };
    },
    // property
    function (code, i, source) {
        var prev = source[i - 1];
        if (prev != '.')
            return null;
        var match = code.match(/^[a-zA-Z0-9_-]+/);
        if (!match)
            return null;
        return {
            html: "<span class=\"property\">" + match[0] + "</span>",
            next: match[0].length
        };
    },
    // keyword
    function (code, i, source) {
        var prev = source[i - 1];
        if (prev && /[a-zA-Z]/.test(prev))
            return null;
        var match = keywords.filter(function (k) { return code.substr(0, k.length) == k; })[0];
        if (match) {
            if (/^[a-zA-Z]/.test(code.substr(match.length)))
                return null;
            return {
                html: "<span class=\"keyword " + match + "\">" + match + "</span>",
                next: match.length
            };
        }
        else {
            return null;
        }
    },
    // symbol
    function (code) {
        var match = symbols.filter(function (s) { return code[0] == s; })[0];
        if (match) {
            return {
                html: "<span class=\"symbol\">" + match + "</span>",
                next: 1
            };
        }
        else {
            return null;
        }
    }
];
// specify lang is todo
exports.default = (function (source, lang) {
    var code = source;
    var html = '';
    var i = 0;
    function push(token) {
        html += token.html;
        code = code.substr(token.next);
        i += token.next;
    }
    while (code != '') {
        var parsed = elements.some(function (el) {
            var e = el(code, i, source);
            if (e) {
                push(e);
                return true;
            }
            else {
                return false;
            }
        });
        if (!parsed) {
            push({
                html: escape(code[0]),
                next: 1
            });
        }
    }
    return html;
});
