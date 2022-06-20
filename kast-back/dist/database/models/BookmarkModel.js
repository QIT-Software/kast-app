"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("./Common");
const UserModel_1 = require("./UserModel");
const schemaName = 'bookmark';
exports.BookmarkSchema = Common_1.createSchema(schemaName, {
    id: { type: String, required: true },
    date: { type: Date, required: true },
    topic: { type: String, required: true },
    text: { type: String, required: true },
    user: { type: String, ref: UserModel_1.UserSchema.name },
});
//# sourceMappingURL=BookmarkModel.js.map