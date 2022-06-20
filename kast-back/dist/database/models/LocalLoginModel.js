"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("./Common");
exports.LocalLoginSchema = Common_1.createSchema('localLogin', {
    user: { type: String, ref: 'user' },
    email: { type: String, unique: true },
    passwordHash: String,
});
//# sourceMappingURL=LocalLoginModel.js.map