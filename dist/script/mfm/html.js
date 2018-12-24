"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const array_1 = require("../prelude/array");
const punycode_1 = require("punycode");
exports.default = (tokens, mentionedRemoteUsers = [], config = {}) => {
    if (tokens == null) {
        return null;
    }
    const { window } = new JSDOM('');
    const doc = window.document;
    let bigcnt = 0, motcnt = 0;
    function appendChildren(children, targetElement) {
        for (const child of children.map(t => handlers[t.node.type](t)))
            targetElement.appendChild(child);
    }
    const handlers = {
        bold(token) {
            const el = config.jmstyle ? doc.createElement('span') : doc.createElement('b');
            appendChildren(token.children, el);
            el.setAttribute('data-mfm', 'bold');
            return el;
        },
        big(token) {
            bigcnt++;
            const el = config.jmstyle ? doc.createElement('span') : doc.createElement('strong');
            appendChildren(token.children, el);
            el.setAttribute('data-mfm', 'big');
            if (config.animate && bigcnt <= 3)
                el.setAttribute('class', 'animated tada');
            return el;
        },
        small(token) {
            const el = config.jmstyle ? doc.createElement('span') : doc.createElement('small');
            appendChildren(token.children, el);
            el.setAttribute('data-mfm', 'small');
            return el;
        },
        strike(token) {
            const el = config.jmstyle ? doc.createElement('span') : doc.createElement('del');
            appendChildren(token.children, el);
            el.setAttribute('data-mfm', 'strike');
            return el;
        },
        italic(token) {
            const el = config.jmstyle ? doc.createElement('span') : doc.createElement('i');
            appendChildren(token.children, el);
            el.setAttribute('data-mfm', 'i');
            return el;
        },
        motion(token) {
            motcnt++;
            const el = config.jmstyle ? doc.createElement('span') : doc.createElement('i');
            appendChildren(token.children, el);
            el.setAttribute('data-mfm', 'motion');
            if (config.animate && motcnt <= 3)
                el.setAttribute('class', 'animated rubberBand');
            return el;
        },
        blockCode(token) {
            const pre = config.codeTagAsDiv ? doc.createElement('div') : doc.createElement('pre');
            const inner = config.codeTagAsDiv ? doc.createElement('div') : doc.createElement('code');
            inner.innerHTML = token.node.props.code;
            pre.appendChild(inner);
            inner.setAttribute('data-mfm', 'blockCode-inner');
            inner.setAttribute('class', 'mfm-highlight');
            pre.setAttribute('data-mfm', 'blockCode');
            return pre;
        },
        center(token) {
            const el = doc.createElement('div');
            appendChildren(token.children, el);
            el.setAttribute('data-mfm', 'center');
            return el;
        },
        emoji(token) {
            return doc.createTextNode(token.node.props.emoji ? token.node.props.emoji : `:${token.node.props.name}:`);
        },
        hashtag(token) {
            const a = doc.createElement('a');
            a.href = `${config.url || ''}/tags/${token.node.props.hashtag}`;
            a.textContent = `#${token.node.props.hashtag}`;
            a.setAttribute('rel', 'tag');
            a.setAttribute('data-mfm', 'hashtag');
            return a;
        },
        inlineCode(token) {
            const el = config.jmstyle ? doc.createElement('span') : doc.createElement('code');
            el.textContent = token.node.props.code;
            el.setAttribute('data-mfm', 'inlineCode');
            el.setAttribute('class', 'mfm-highlight');
            return el;
        },
        math(token) {
            const el = config.jmstyle ? doc.createElement('span') : doc.createElement('code');
            el.textContent = token.node.props.formula;
            el.setAttribute('data-mfm', 'math');
            return el;
        },
        link(token) {
            const a = doc.createElement('a');
            a.href = token.node.props.url;
            appendChildren(token.children, a);
            a.setAttribute('data-mfm', 'link');
            return a;
        },
        mention(token) {
            const a = doc.createElement('a');
            const { username, host, acct } = token.node.props;
            switch (host) {
                case 'github.com':
                    a.href = `https://github.com/${username}`;
                    break;
                case 'twitter.com':
                    a.href = `https://twitter.com/${username}`;
                    break;
                default:
                    const remoteUserInfo = mentionedRemoteUsers.find(remoteUser => remoteUser.username === username && remoteUser.host === host);
                    a.href = remoteUserInfo ? remoteUserInfo.uri : `${config.url}/${acct}`;
                    break;
            }
            a.textContent = acct;
            a.setAttribute('data-mfm', 'mention');
            return a;
        },
        quote(token) {
            const el = config.jmstyle ? doc.createElement('div') : doc.createElement('blockquote');
            appendChildren(token.children, el);
            el.setAttribute('data-mfm', 'quote');
            return el;
        },
        title(token) {
            const el = config.jmstyle ? doc.createElement('div') : doc.createElement('h1');
            appendChildren(token.children, el);
            el.setAttribute('data-mfm', 'title');
            return el;
        },
        text(token) {
            const el = doc.createElement('span');
            const nodes = token.node.props.text.split('\n').map(x => doc.createTextNode(x));
            for (const x of array_1.intersperse('br', nodes)) {
                el.appendChild(x === 'br' ? doc.createElement('br') : x);
            }
            el.setAttribute('data-mfm', 'text');
            return el;
        },
        url(token) {
            const a = doc.createElement('a');
            a.href = token.node.props.url;
            if (config.jmstyle) {
                const u = new URL(token.node.props.url);
                a.innerHTML = `
					<span data-mfm="url-schema">${u.protocol}//</span>
					<span data-mfm="url-hostname">${punycode_1.toUnicode(u.hostname)}</span>
					<span data-mfm="url-port">${u.port ? ':' + u.port : ''}</span>
					<span data-mfm="url-pathname">${u.pathname ? decodeURIComponent(u.pathname) : ''}</span>
					<span data-mfm="url-icon">${decodeURIComponent(u.search)}</span>
					<span data-mfm="url-hash">${decodeURIComponent(u.hash)}</span>
					<i class="fas fa-external-link-square-alt" data-mfm="url-icon"${config.faJm ? ' data-fa-prefix="fas" data-fa-icon-name="external-link-square-alt"' : ''}/>`
                    .replace(/[\n\t]/g, '');
            }
            else {
                a.textContent = token.node.props.url;
            }
            a.setAttribute('data-mfm', 'url');
            return a;
        },
        search(token) {
            if (!config.jmstyle) {
                const a = doc.createElement('a');
                a.href = `https://www.google.com/search?q=${token.node.props.query}`;
                a.textContent = token.node.props.content;
                return a;
            }
            else {
                const outer = doc.createElement('div');
                outer.setAttribute('data-mfm', 'search');
                const input = doc.createElement('input');
                input.setAttribute('data-mfm', 'search-input');
                const button = doc.createElement('button');
                button.setAttribute('data-mfm', 'search-button');
                input.setAttribute('type', 'search');
                input.setAttribute('placeholder', token.node.props.query);
                input.setAttribute('value', token.node.props.query);
                const i = doc.createElement('i');
                i.setAttribute('class', 'fas fa-search');
                i.setAttribute('data-mfm', 'search-button-icon');
                if (config.faJm) {
                    i.setAttribute('data-fa-prefix', 'fas');
                    i.setAttribute('data-fa-icon-name', 'search');
                }
                const text = doc.createElement('span');
                text.textContent = ' ' + (config.search || '検索');
                button.appendChild(i);
                button.appendChild(text);
                outer.appendChild(input);
                outer.appendChild(button);
                return outer;
            }
        }
    };
    appendChildren(tokens, doc.body);
    const ttag = config.rootTagName || config.jmstyle ? 'div' : 'p';
    return `<${ttag} data-mfm="root">${doc.body.innerHTML}</${ttag}>`;
};
