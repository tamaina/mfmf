"use strict";
/**
 * Emoji
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(text) {
    var match = text.match(/^:[a-zA-Z0-9+-_]+:/);
    if (!match)
        return null;
    var emoji = match[0];
    return {
        type: 'emoji',
        content: emoji,
        emoji: emoji.substr(1, emoji.length - 2)
    };
}
exports.default = default_1;
