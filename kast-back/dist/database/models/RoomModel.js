"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("./Common");
const UserModel_1 = require("./UserModel");
const Room_1 = require("../../entities/Room");
const Participant_1 = __importDefault(require("../entities/Participant"));
exports.RoomSchema = Common_1.createSchema('room', {
    name: { type: String, required: true },
    closed: { type: Date },
    type: { type: Room_1.RoomType, enum: Room_1.RoomType, required: true },
    user: { type: String, ref: UserModel_1.UserSchema.name, required: true },
    passwordProtected: { type: Boolean, required: true },
    password: { type: String },
    inviteLink: { type: String, required: true },
    recordingId: { type: String, required: false },
});
var ViewModeEnum;
(function (ViewModeEnum) {
    ViewModeEnum["CameraAndScreen"] = "CameraAndScreen";
    ViewModeEnum["CameraMain"] = "CameraMain";
    ViewModeEnum["ScreenMain"] = "ScreenMain";
    ViewModeEnum["None"] = "None";
})(ViewModeEnum = exports.ViewModeEnum || (exports.ViewModeEnum = {}));
var ViewModeScale;
(function (ViewModeScale) {
    ViewModeScale["oneX"] = "1x";
    ViewModeScale["twoX"] = "2x";
    ViewModeScale["threeX"] = "3x";
})(ViewModeScale = exports.ViewModeScale || (exports.ViewModeScale = {}));
//# sourceMappingURL=RoomModel.js.map