const jsdom = require('jsdom');
const { JSDOM } = jsdom;
//import config from '../config';
import { INote } from '../models/note';
import { Node } from './parser';
import { intersperse } from '../prelude/array';
import { Source } from '../config/types'
import { toUnicode as punyToUnicode } from 'punycode'

export type mfmfHTMLConf = {
	url?: string;
	jmstyle?: boolean;
	animate?: boolean;
	codeTagAsDiv?: boolean;
	rootTagName?: boolean;
	faJm?: boolean;
}

export default (tokens: Node[], mentionedRemoteUsers: INote['mentionedRemoteUsers'] = [], conf?: mfmfHTMLConf | Source ) => {
	if (tokens == null) {
		return null;
	}

	const config = conf === undefined ? {} : conf

	const { window } = new JSDOM('');

	const doc = window.document;

	let bigcnt = 0, motcnt = 0;

	function dive(nodes: Node[] | undefined): Node[] {
		return nodes === undefined ? [] : nodes.map(n => handlers[n.name](n));
	}
	
	function appendChildren(children: Node[] | undefined, targetElement: any): void {
		for(const child of dive(children)) targetElement.appendChild(child)
	}

	const handlers: { [key: string]: (token: Node) => any } = {
		bold(token) {
			const el = config.jmstyle ? doc.createElement('span') : doc.createElement('b');
			appendChildren(token.children, el);
			el.setAttribute('data-mfm', 'bold');
			return el;
		},

		big(token) {
			bigcnt++
			const el = config.jmstyle ? doc.createElement('span') : doc.createElement('strong');
			appendChildren(token.children, el);
			el.setAttribute('data-mfm', 'big');
			if(config.animate && bigcnt <= 3) el.setAttribute('class', 'animated tada')
			return el;
		},

		strike(token) {
			const el = doc.createElement('del');
			dive(token.children).forEach(child => el.appendChild(child));
			el.setAttribute('data-mfm', 'strike');
			return el;
		},

		motion(token) {
			motcnt++
			const el = config.jmstyle ? doc.createElement('span') : doc.createElement('i');
			appendChildren(token.children, el);
			el.setAttribute('data-mfm', 'motion');
			if(config.animate && motcnt <= 3) el.setAttribute('class', 'animated rubberBand')
			return el;
		},

		blockCode(token) {
			const pre = config.codeTagAsDiv ? doc.createElement('div') : doc.createElement('pre');
			const inner = config.codeTagAsDiv ? doc.createElement('div') : doc.createElement('code');
			inner.innerHTML = token.props.code;
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
			return doc.createTextNode(token.props.emoji ? token.props.emoji : `:${token.props.name}:`);
		},

		hashtag(token) {
			const a = doc.createElement('a');
			a.href = `${config.url || ''}/tags/${token.props.hashtag}`;
			a.textContent = `#${token.props.hashtag}`;
			a.setAttribute('rel', 'tag');
			a.setAttribute('data-mfm', 'hashtag');
			return a;
		},

		inlineCode(token) {
			const el = config.jmstyle ? doc.createElement('span') : doc.createElement('code');
			el.textContent = token.props.code;
			el.setAttribute('data-mfm', 'inlineCode');
			el.setAttribute('class', 'mfm-highlight');
			return el;
		},

		math(token) {
			const el = config.jmstyle ? doc.createElement('span') : doc.createElement('code');
			el.textContent = token.props.formula;
			el.setAttribute('data-mfm', 'math');
			return el;
		},

		link(token) {
			const a = doc.createElement('a');
			a.href = token.props.url;
			appendChildren(token.children, a);
			a.setAttribute('data-mfm', 'link');
			return a;
		},

		mention(token) {
			const a = doc.createElement('a');
			const { username, host, acct } = token.props;
			const remoteUserInfo = mentionedRemoteUsers.find(remoteUser => remoteUser.username === username && remoteUser.host === host);
			a.href = remoteUserInfo ? remoteUserInfo.uri : `${config.url}/${acct}`;
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
			const nodes = (token.props.text as string).split('\n').map(x => doc.createTextNode(x));

			for (const x of intersperse('br', nodes)) {
				if (x === 'br') {
					el.appendChild(doc.createElement('br'));
				} else {
					el.appendChild(x);
				}
			}
			el.setAttribute('data-mfm', 'text');
			return el;
		},

		url(token) {
			const a = doc.createElement('a');
			a.href = token.props.url;
			if (config.jmstyle) {
				const u = new URL(token.props.url);
				a.innerHTML = `
					<span data-mfm="url-schema">${u.protocol}//</span>
					<span data-mfm="url-hostname">${punyToUnicode(u.hostname)}</span>
					<span data-mfm="url-port">${u.port ? ':' + u.port : ''}</span>
					<span data-mfm="url-pathname">${u.pathname ? decodeURIComponent(u.pathname) : ''}</span>
					<span data-mfm="url-icon">${decodeURIComponent(u.search)}</span>
					<span data-mfm="url-hash">${decodeURIComponent(u.hash)}</span>
					<i class="fas fa-external-link-square-alt" data-mfm="url-icon"${config.faJm ? ' data-fa-prefix="fas" data-fa-icon-name="external-link-square-alt"' : ''}/>`
					.replace(/[\n\t]/g, '');
			} else {
				a.textContent = token.props.url;
			}
			a.setAttribute('data-mfm', 'url');
			return a;
		},

		search(token) {
			if (!config.jmstyle){
				const a = doc.createElement('a');
				a.href = `https://www.google.com/search?q=${token.props.query}`;
				a.textContent = token.props.content;
				return a;
			} else {
				const outer = doc.createElement('div');
				outer.setAttribute('data-mfm', 'search');
				const input = doc.createElement('input');
				input.setAttribute('data-mfm', 'search-input');
				const button = doc.createElement('button');
				button.setAttribute('data-mfm', 'search-button');
				input.setAttribute('type', 'search');
				input.setAttribute('placeholder', token.props.query);
				input.setAttribute('value', token.props.query);
				const i = doc.createElement('i');
				i.setAttribute('class', 'fas fa-search');
				i.setAttribute('data-mfm', 'search-button-icon');
				if(config.faJm){
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

	appendChildren(tokens, doc.body)

	const ttag = config.rootTagName || config.jmstyle ? 'div' : 'p'

	return `<${ttag} data-mfm="root">${doc.body.innerHTML}</${ttag}>`;
};
