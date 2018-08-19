const emojilib = require('emojilib').lib
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
import parse, { TextElement } from './parse';
const fontawesome = require("@fortawesome/fontawesome-svg-core")
fontawesome.library.add(require("@fortawesome/free-solid-svg-icons").fas)

type options = {
	baseUrl?: string
	nostyle?: boolean
	disableAnimate?: boolean
	codeTagAsDiv?: boolean
}

const handlers: { [key: string]: (window: any, token: any, options: options) => void } = {
	bold({ document }, { bold }, { nostyle }) {
		const b = document.createElement('b');
		if (!nostyle) b.setAttribute('class', 'mfm-bold');
		b.textContent = bold;
		document.body.appendChild(b);
	},

	big({ document }, { big }, { nostyle, disableAnimate }) {
		const b = document.createElement('strong');
		if (!nostyle) b.setAttribute('class', `mfm-big${ disableAnimate ? '' : ' animated tada'}`);
		b.textContent = big;
		document.body.appendChild(b);
	},

	motion({ document }, { motion }, { nostyle, disableAnimate }) {
		const b = document.createElement('span');
		if (!nostyle) b.setAttribute('class', `mfm-motion${ disableAnimate ? '' : ' animated rubberBand'}`);
		b.textContent = motion;
		document.body.appendChild(b);
	},

	code({ document }, { code }, { nostyle, codeTagAsDiv }) {
		const outer = document.createElement(codeTagAsDiv ? 'div' : 'pre');
		const inner = document.createElement(codeTagAsDiv ? 'div' : 'code');
		if (!nostyle) outer.setAttribute('class', `mfm-code${codeTagAsDiv ? ' pre' : ''}`);
		if (codeTagAsDiv) inner.setAttribute('class', 'code')
		inner.innerHTML = code;
		outer.appendChild(inner);
		document.body.appendChild(outer);
	},

	emoji({ document }, { content, emoji }) {
		const found = emojilib[emoji];
		const node = document.createTextNode(found ? found.char : content);
		document.body.appendChild(node);
	},

	hashtag({ document }, { hashtag }, { baseUrl }) {
		const a = document.createElement('a');
		a.href = `${baseUrl ? baseUrl : ''}tags/${hashtag}`;
		a.textContent = `#${hashtag}`;
		a.setAttribute('rel', 'tag');
		document.body.appendChild(a);
	},

	'inline-code'({ document }, { code }, { nostyle, codeTagAsDiv }) {
		const e = document.createElement(codeTagAsDiv ? 'div' : 'code');
		if (!nostyle) e.setAttribute('class', `mfm-inline-code${codeTagAsDiv ? ' code' : ''}`);
		e.textContent = code;
		document.body.appendChild(e);
	},

	link({ document }, { url, title }) {
		const a = document.createElement('a');
		a.href = url;
		a.textContent = title;
		document.body.appendChild(a);
	},

	mention({ document }, { content }, { baseUrl }) {
		const a = document.createElement('a');
		a.href = `${baseUrl ? baseUrl : ''}${content}`;
		a.textContent = content;
		document.body.appendChild(a);
	},

	quote({ document }, { quote }, { nostyle }) {
		const blockquote = document.createElement('blockquote');
		if (!nostyle) blockquote.setAttribute('class', 'mfm-quote');
		blockquote.textContent = quote;
		document.body.appendChild(blockquote);
	},

	title({ document }, { content, title }, { nostyle }) {
		const e = document.createElement( nostyle ? 'h1' : 'div' );
		if (!nostyle) e.setAttribute('class', 'mfm-title');
		e.textContent = nostyle ? content : title;
		document.body.appendChild(e);
	},

	text({ document }, { content }) {
		const t = content.split('\n');
		for (let i = 0; i < t.length; i++) {
			document.body.appendChild(document.createTextNode(t[i]));
			if (i != t.length - 1) {
				document.body.appendChild(document.createElement('br'));
			}
		}
	},

	url({ document }, { url }, { nostyle }) {
		const a = document.createElement('a');
		a.href = url;
		if (nostyle) {
			a.textContent = url;
		} else {
			a.setAttribute('class', 'mk-url');
			const u = new URL(url);
			a.innerHTML = `
				<span class="schema">${u.protocol}//</span>
				<span class="hostname">${u.hostname}</span>
				<span class="port">${u.port ? ':' + u.port : ''}</span>
				<span class="pathname">${u.pathname ? u.pathname : ''}</span>
				<span class="query">${u.search}</span>
				<span class="hash">${u.hash}</span>${fontawesome.icon({ prefix: "fas", iconName: "external-link-square-alt" },{}).html[0]}`.replace(/[\n\t]/g, '');
		}
		document.body.appendChild(a);

	},

	search({ document }, { content, query, search }, { nostyle }) {
		if (nostyle){
			const a = document.createElement('a');
			a.href = `https://www.google.com/search?q=${query}`;
			a.textContent = content;
			document.body.appendChild(a);
		} else {
			const outer = document.createElement('div');
			outer.setAttribute('class', 'mfm-google');
			const input = document.createElement('input');
			const button = document.createElement('button');
			input.setAttribute('type', 'search');
			input.setAttribute('placeholder', query);
			input.setAttribute('value', query);
			button.innerHTML = `${fontawesome.icon({ prefix: "fas", iconName: "search" },{}).html[0]} ${search}`
			outer.appendChild(input);
			outer.appendChild(button);
			document.body.appendChild(outer);
		}
	}
};

export default (input: TextElement[] | string, options: options): string => {
	let tokens: TextElement[]

	if (input == null) {
		return '';
	} else if ( typeof input == 'string' ) {
		tokens = parse(input)
	} else if ( typeof input == 'object' ){
		tokens = input
	}

	const { window } = new JSDOM('');

	for (const token of tokens) {
		handlers[token.type](window, token, options);
	}

	if (options.nostyle){
		return window.document.body.innerHTML;
	} else {
		return `<div class="mfm">${window.document.body.innerHTML}</div>`;
	}
};
