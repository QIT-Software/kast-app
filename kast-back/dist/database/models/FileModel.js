"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("./Common");
const schemaName = 'file';
exports.FileSchema = Common_1.createSchema(schemaName, {
    mediaLink: { type: String, required: true },
    name: { type: String, required: true },
    mimeType: { type: String, required: true },
});
//# sourceMappingURL=FileModel.js.map