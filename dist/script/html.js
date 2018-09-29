"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emojilib = require('emojilib').lib;
var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;
var parse_1 = require("./parse");
var fontawesome = require("@fortawesome/fontawesome-svg-core");
fontawesome.library.add(require("@fortawesome/free-solid-svg-icons").fas);
function intersperse(sep, xs) {
    return [].concat.apply([], xs.map(function (x) { return [sep, x]; })).slice(1);
}
var handlers = {
    bold: function (_a, _b, _c) {
        var document = _a.document;
        var bold = _b.bold;
        var nostyle = _c.nostyle;
        var b = document.createElement('b');
        if (!nostyle)
            b.setAttribute('class', 'mfm-bold');
        b.textContent = bold;
        document.body.appendChild(b);
    },
    big: function (_a, _b, _c) {
        var document = _a.document;
        var big = _b.big;
        var nostyle = _c.nostyle, disableAnimate = _c.disableAnimate;
        var b = document.createElement('strong');
        if (!nostyle)
            b.setAttribute('class', "mfm-big" + (disableAnimate ? '' : ' animated tada'));
        b.textContent = big;
        document.body.appendChild(b);
    },
    motion: function (_a, _b, _c) {
        var document = _a.document;
        var motion = _b.motion;
        var nostyle = _c.nostyle, disableAnimate = _c.disableAnimate;
        var b = document.createElement('span');
        if (!nostyle)
            b.setAttribute('class', "mfm-motion" + (disableAnimate ? '' : ' animated rubberBand'));
        b.textContent = motion;
        document.body.appendChild(b);
    },
    code: function (_a, _b, _c) {
        var document = _a.document;
        var code = _b.code;
        var nostyle = _c.nostyle, codeTagAsDiv = _c.codeTagAsDiv;
        var outer = document.createElement(codeTagAsDiv ? 'div' : 'pre');
        var inner = document.createElement(codeTagAsDiv ? 'div' : 'code');
        if (!nostyle)
            outer.setAttribute('class', "mfm-code" + (codeTagAsDiv ? ' pre' : ''));
        if (codeTagAsDiv)
            inner.setAttribute('class', 'code');
        inner.innerHTML = code;
        outer.appendChild(inner);
        document.body.appendChild(outer);
    },
    emoji: function (_a, _b) {
        var document = _a.document;
        var content = _b.content, emoji = _b.emoji;
        var found = emojilib[emoji];
        var node = document.createTextNode(found ? found.char : content);
        document.body.appendChild(node);
    },
    hashtag: function (_a, _b, _c) {
        var document = _a.document;
        var hashtag = _b.hashtag;
        var baseUrl = _c.baseUrl;
        var a = document.createElement('a');
        a.href = (baseUrl ? baseUrl : '') + "tags/" + hashtag;
        a.textContent = "#" + hashtag;
        a.setAttribute('rel', 'tag');
        document.body.appendChild(a);
    },
    'inline-code': function (_a, _b, _c) {
        var document = _a.document;
        var code = _b.code;
        var nostyle = _c.nostyle, codeTagAsDiv = _c.codeTagAsDiv;
        var e = document.createElement(codeTagAsDiv ? 'div' : 'code');
        if (!nostyle)
            e.setAttribute('class', "mfm-inline-code" + (codeTagAsDiv ? ' code' : ''));
        e.textContent = code;
        document.body.appendChild(e);
    },
    link: function (_a, _b) {
        var document = _a.document;
        var url = _b.url, title = _b.title;
        var a = document.createElement('a');
        a.href = url;
        a.textContent = title;
        document.body.appendChild(a);
    },
    mention: function (_a, _b, _c) {
        var document = _a.document;
        var content = _b.content;
        var baseUrl = _c.baseUrl;
        var a = document.createElement('a');
        a.href = "" + (baseUrl ? baseUrl : '') + content;
        a.textContent = content;
        document.body.appendChild(a);
    },
    quote: function (_a, _b, _c) {
        var document = _a.document;
        var quote = _b.quote;
        var nostyle = _c.nostyle;
        console.log(quote);
        var blockquote = document.createElement('blockquote');
        if (!nostyle)
            blockquote.setAttribute('class', 'mfm-quote');
        var nodes = quote.split('\n').map(function (x) { return document.createTextNode(x); });
        for (var _i = 0, _d = intersperse('br', nodes); _i < _d.length; _i++) {
            var x = _d[_i];
            if (x === 'br') {
                blockquote.appendChild(document.createElement('br'));
            }
            else {
                blockquote.appendChild(x);
            }
        }
        document.body.appendChild(blockquote);
    },
    title: function (_a, _b, _c) {
        var document = _a.document;
        var content = _b.content, title = _b.title;
        var nostyle = _c.nostyle;
        var e = document.createElement(nostyle ? 'h1' : 'div');
        if (!nostyle)
            e.setAttribute('class', 'mfm-title');
        e.textContent = nostyle ? content : title;
        document.body.appendChild(e);
    },
    text: function (_a, _b) {
        var document = _a.document;
        var content = _b.content;
        var nodes = content.split('\n').map(function (x) { return document.createTextNode(x); });
        for (var _i = 0, _c = intersperse('br', nodes); _i < _c.length; _i++) {
            var x = _c[_i];
            if (x === 'br') {
                document.body.appendChild(document.createElement('br'));
            }
            else {
                document.body.appendChild(x);
            }
        }
    },
    url: function (_a, _b, _c) {
        var document = _a.document;
        var url = _b.url;
        var nostyle = _c.nostyle;
        var a = document.createElement('a');
        a.href = url;
        if (nostyle) {
            a.textContent = url;
        }
        else {
            a.setAttribute('class', 'mk-url');
            var u = new URL(url);
            a.innerHTML = ("\n\t\t\t\t<span class=\"schema\">" + u.protocol + "//</span>\n\t\t\t\t<span class=\"hostname\">" + u.hostname + "</span>\n\t\t\t\t<span class=\"port\">" + (u.port ? ':' + u.port : '') + "</span>\n\t\t\t\t<span class=\"pathname\">" + (u.pathname ? u.pathname : '') + "</span>\n\t\t\t\t<span class=\"query\">" + u.search + "</span>\n\t\t\t\t<span class=\"hash\">" + u.hash + "</span>" + fontawesome.icon({ prefix: "fas", iconName: "external-link-square-alt" }, {}).html[0]).replace(/[\n\t]/g, '');
        }
        document.body.appendChild(a);
    },
    search: function (_a, _b, _c) {
        var document = _a.document;
        var content = _b.content, query = _b.query, search = _b.search;
        var nostyle = _c.nostyle;
        if (nostyle) {
            var a = document.createElement('a');
            a.href = "https://www.google.com/search?q=" + query;
            a.textContent = content;
            document.body.appendChild(a);
        }
        else {
            var outer = document.createElement('div');
            outer.setAttribute('class', 'mfm-google');
            var input = document.createElement('input');
            var button = document.createElement('button');
            input.setAttribute('type', 'search');
            input.setAttribute('placeholder', query);
            input.setAttribute('value', query);
            button.innerHTML = fontawesome.icon({ prefix: "fas", iconName: "search" }, {}).html[0] + " " + search;
            outer.appendChild(input);
            outer.appendChild(button);
            document.body.appendChild(outer);
        }
    }
};
exports.default = function (input, options) {
    var tokens;
    if (input == null) {
        return '';
    }
    else if (typeof input == 'string') {
        tokens = parse_1.default(input);
    }
    else if (typeof input == 'object') {
        tokens = input;
    }
    var window = new JSDOM('').window;
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        handlers[token.type](window, token, options);
    }
    if (options.nostyle) {
        return window.document.body.innerHTML;
    }
    else {
        return "<div class=\"mfm\">" + window.document.body.innerHTML + "</div>";
    }
};
