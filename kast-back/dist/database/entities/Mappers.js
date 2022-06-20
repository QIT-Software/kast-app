"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Room_1 = __importDefault(require("../../entities/Room"));
const Bookmark_1 = __importDefault(require("../../entities/Bookmark"));
const Participant_1 = __importStar(require("../../entities/Participant"));
const AvikastFile_1 = require("../../entities/AvikastFile");
const Message_1 = __importDefault(require("../../entities/Message"));
const Record_1 = __importDefault(require("../../entities/Record"));
exports.mapUserFromDb = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    country: user.country,
    city: user.city,
    position: user.position,
    telephone: user.position,
    dateOfBirth: user.dateOfBirth,
    avatarUrl: user.avatarUrl,
    tags: user.tags,
    skills: user.skills,
    mission: user.mission,
    vision: user.vision,
    interests: user.interests,
    referralCode: user.referralCode,
    referrer: user.referrer ? exports.mapUserFromDb(user.referrer) : undefined,
    banUntilDate: user.banUntilDate,
    banForever: user.banForever,
    logoUrl: user.logoUrl,
    backgroundUrl: user.backgroundUrl,
    resumeUrl: user.resumeUrl,
});
exports.mapUsersFromDB = (users) => users.map(exports.mapUserFromDb);
exports.mapPreferencesFromDB = (user) => ({
    allowNotifications: user.allowNotifications,
});
exports.mapAccountFromDB = (account) => ({
    user: exports.mapUserFromDb(account),
    preferences: exports.mapPreferencesFromDB(account),
});
exports.mapMessageFromDB = (message) => ({
    id: message.id,
    sender: exports.mapUserFromDb(message.sender),
    roomId: message.roomId,
    body: message.body,
    date: message.date,
    receiverId: message.receiverId,
});
exports.mapMessagesFromDB = (messages) => messages.map(exports.mapMessageFromDB);
exports.mapRoomFromDB = (room) => ({
    id: room.id,
    closed: room.closed,
    name: room.name,
    inviteLink: room.inviteLink,
    type: room.type,
    user: exports.mapUserFromDb(room.user),
});
exports.mapRoomsFromDB = (rooms) => rooms.map(exports.mapRoomFromDB);
exports.mapBookmarkFromDB = (bookmark) => ({
    id: bookmark.id,
    date: bookmark.date,
    topic: bookmark.topic,
    text: bookmark.text,
    user: exports.mapUserFromDb(bookmark.user),
});
exports.mapBookmarksFromDB = (bookmarks) => bookmarks.map(exports.mapBookmarkFromDB);
exports.mapParticipantFromDB = (participant) => {
    var _a;
    return ({
        id: participant.id,
        user: exports.mapUserFromDb(participant.user),
        role: participant.role,
        media: participant.media,
        webinarOptions: participant.webinarOptions,
        raiseHand: (_a = participant.raiseHand) !== null && _a !== void 0 ? _a : undefined,
        kicked: participant.kicked,
        muted: participant.muted,
    });
};
exports.mapParticipantTrackFromDB = (participantMedia) => ({
    userName: participantMedia.userName,
    audio: participantMedia.audio,
    video: participantMedia.video,
    screen: participantMedia.screen,
});
exports.mapParticipantsTracksFromDB = (participantMedia) => participantMedia.map(exports.mapParticipantTrackFromDB);
exports.mapParticipantsFromDB = (participants) => participants.map(exports.mapParticipantFromDB);
exports.mapAvikastFileFromDB = (avikastFile) => ({
    id: avikastFile.id,
    name: avikastFile.name,
    type: avikastFile.type,
    user: exports.mapUserFromDb(avikastFile.user),
    fileId: avikastFile.file ? avikastFile.file.id : undefined,
});
exports.mapAvikastFilesFromDB = (avikastFiles) => avikastFiles.map(exports.mapAvikastFileFromDB);
exports.mapRecordFromDB = (record) => ({
    id: record.id,
    date: record.date,
    name: record.name,
    fileId: record.fileId,
    user: exports.mapUserFromDb(record.user),
});
exports.mapRecordsFromDb = (records) => records.map(exports.mapRecordFromDB);
//# sourceMappingURL=Mappers.js.map