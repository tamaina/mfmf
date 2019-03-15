import { toHtml } from './mfm/toHtml';
import { parse } from './mfm/parse';
import { fromHtml } from './mfm/fromHtml';
import { emojiRegex, removeOrphanedBrackets, mfmLanguage } from './mfm/language'
import * as types from './mfm/prelude'

const render = toHtml
const htmlToMfm = fromHtml

import * as Ar from './prelude/array'
import * as St from './prelude/string'
import * as Ma from './prelude/math'
import * as Re from './prelude/relation'
import * as Tr from './prelude/tree'
import * as Ur from './prelude/url'
import * as Sy from './prelude/symbol'
import * as Xm from './prelude/xml'

export {
	render, toHtml,
	htmlToMfm, fromHtml,
	parse,
	emojiRegex, removeOrphanedBrackets, mfmLanguage,
	types,

	Ar,
	St,
	Ma,
	Re,
	Tr,
	Ur,
	Sy,
	Xm
}
