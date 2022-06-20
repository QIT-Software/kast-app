"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("./Common");
const UserModel_1 = require("./UserModel");
const Participant_1 = require("../../entities/Participant");
const RoomModel_1 = require("./RoomModel");
exports.ParticipantSchema = Common_1.createSchema('participant', {
    user: { type: String, ref: UserModel_1.UserSchema.name, required: true },
    room: { type: String, ref: RoomModel_1.RoomSchema.name, required: true },
    role: { type: Participant_1.ParticipantRole, enum: Participant_1.ParticipantRole, required: true },
    media: { type: Object, required: true },
    raiseHand: { type: Boolean },
    kicked: { type: Boolean },
    muted: { type: Boolean },
});
//# sourceMappingURL=ParticipantModel.js.map