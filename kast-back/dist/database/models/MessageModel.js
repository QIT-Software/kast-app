"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("./Common");
const UserModel_1 = require("./UserModel");
const schemaName = 'message';
exports.MessageSchema = Common_1.createSchema(schemaName, {
    sender: { type: String, ref: UserModel_1.UserSchema.name, required: true },
    roomId: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    receiverId: { type: String },
});
//# sourceMappingURL=MessageModel.js.map