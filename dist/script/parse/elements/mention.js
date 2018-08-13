"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Mention
 */
var acct_parse_1 = require("../../misc/acct-parse");
function default_1(text) {
    var match = text.match(/^@[a-z0-9_]+(?:@[a-z0-9\.\-]+[a-z0-9])?/i);
    if (!match)
        return null;
    var mention = match[0];
    var _a = acct_parse_1.default(mention.substr(1)), username = _a.username, host = _a.host;
    return {
        type: 'mention',
        content: mention,
        username: username,
        host: host
    };
}
exports.default = default_1;
