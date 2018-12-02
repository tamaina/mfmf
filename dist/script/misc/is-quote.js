"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(note) {
    return note.renoteId != null && (note.text != null || note.poll != null || (note.fileIds != null && note.fileIds.length > 0));
}
exports.default = default_1;
