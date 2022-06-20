"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("./Common");
const UserModel_1 = require("./UserModel");
exports.SessionSchema = Common_1.createSchema('Session', {
    token: String,
    refreshToken: String,
    user: { type: String, ref: UserModel_1.UserSchema.name },
    appType: String,
    platform: String,
    firebaseRegistrationId: String,
});
//# sourceMappingURL=SessionModel.js.map