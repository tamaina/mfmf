"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function just(value) {
    return {
        isJust: () => true,
        get: () => value
    };
}
exports.just = just;
function nothing() {
    return {
        isJust: () => false,
    };
}
exports.nothing = nothing;
