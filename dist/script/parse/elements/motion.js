"use strict";
/**
 * Motion
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(text) {
    var match = text.match(/^\(\(\((.+?)\)\)\)/) || text.match(/^<motion>(.+?)<\/motion>/);
    if (!match)
        return null;
    var motion = match[0];
    return {
        type: 'motion',
        content: motion,
        motion: match[1]
    };
}
exports.default = default_1;
