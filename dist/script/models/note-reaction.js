"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cafy_1 = require("cafy");
exports.validateReaction = cafy_1.default.str.or([
    'like',
    'love',
    'laugh',
    'hmm',
    'surprise',
    'congrats',
    'angry',
    'confused',
    'rip',
    'pudding'
]);
