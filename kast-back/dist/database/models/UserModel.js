"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("./Common");
const schemaName = 'user';
exports.UserSchema = Common_1.createSchema(schemaName, {
    name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    position: { type: String, required: true },
    telephone: { type: String, required: true },
    dateOfBirth: { type: Date },
    avatarUrl: { type: String, required: true },
    tags: { type: [String], required: true },
    skills: { type: [String], required: true },
    mission: { type: [String], required: true },
    vision: { type: [String], required: true },
    interests: { type: [String], required: true },
    allowNotifications: { type: Boolean, required: true, default: true },
    referralCode: { type: String, required: true },
    referrer: { type: String, ref: schemaName },
    banUntilDate: { type: Date, required: false },
    banForever: { type: Boolean, required: false },
    logoUrl: { type: String, required: false },
    backgroundUrl: { type: String, required: false },
    resumeUrl: { type: String, required: false },
});
//# sourceMappingURL=UserModel.js.map