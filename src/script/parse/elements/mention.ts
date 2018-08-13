/**
 * Mention
 */
import parseAcct from '../../misc/acct-parse';

export type TextElementMention = {
	type: 'mention'
	content: string
	username: string
	host: string
};

export default function(text: string) {
	const match = text.match(/^@[a-z0-9_]+(?:@[a-z0-9\.\-]+[a-z0-9])?/i);
	if (!match) return null;
	const mention = match[0];
	const { username, host } = parseAcct(mention.substr(1));
	return {
		type: 'mention',
		content: mention,
		username,
		host
	} as TextElementMention;
}
