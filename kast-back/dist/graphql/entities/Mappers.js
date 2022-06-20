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
const Preferences_1 = __importDefault(require("../../entities/Preferences"));
const Room_1 = __importDefault(require("../../entities/Room"));
const Mediasoup_1 = require("../../entities/Mediasoup");
const Participant_1 = __importStar(require("../../entities/Participant"));
const AvikastFile_1 = require("../../entities/AvikastFile");
const Message_1 = __importDefault(require("../../entities/Message"));
const Record_1 = __importDefault(require("../../entities/Record"));
exports.mapUserToGQL = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        country: user.country,
        city: user.city,
        position: user.position,
        telephone: user.telephone,
        dateOfBirth: user.dateOfBirth,
        avatarUrl: user.avatarUrl,
        tags: user.tags,
        skills: user.skills,
        mission: user.mission,
        vision: user.vision,
        interests: user.interests,
        referralCode: user.referralCode,
        banUntilDate: user.banUntilDate,
        banForever: user.banForever,
        referrer: user.referrer ? exports.mapUserToGQL(user.referrer) : undefined,
        logoUrl: user.logoUrl,
        backgroundUrl: user.backgroundUrl,
        resumeUrl: user.resumeUrl,
    };
};
exports.mapUsersToGQL = (users) => users.map(exports.mapUserToGQL);
exports.mapPreferencesToGQL = (preferences) => ({
    allowNotifications: false,
});
exports.mapAccountToGQL = (account) => ({
    user: exports.mapUserToGQL(account.user),
    preferences: exports.mapPreferencesToGQL(account.preferences),
});
exports.mapRoomToGQL = (room) => ({
    id: room.id,
    closed: room.closed,
    name: room.name,
    inviteLink: room.inviteLink,
    type: room.type,
    user: exports.mapUserToGQL(room.user),
});
exports.mapRoomsToGQL = (rooms) => rooms.map(exports.mapRoomToGQL);
exports.mapBookmarkToGQL = (bookmark) => ({
    id: bookmark.id,
    date: bookmark.date,
    topic: bookmark.topic,
    text: bookmark.text,
    user: exports.mapUserToGQL(bookmark.user),
});
exports.mapBookmarksToGQL = (bookmarks) => bookmarks.map(exports.mapBookmarkToGQL);
exports.mapParticipantsTrackToGQL = (track) => ({
    userName: track.userName,
    audio: track.audio,
    video: track.video,
    screen: track.screen,
});
exports.mapParticipantsTracksToGQL = (tracks) => tracks.map(exports.mapParticipantsTrackToGQL);
exports.mapParticipantToGQL = (participant) => ({
    id: participant.id,
    user: exports.mapUserToGQL(participant.user),
    role: participant.role,
    media: exports.mapParticipantsTrackToGQL(participant.media),
    raiseHand: participant.raiseHand,
    kicked: participant.kicked,
    muted: participant.muted,
});
exports.mapParticipantsToGQL = (participants) => participants.map(exports.mapParticipantToGQL);
exports.mapAvikastFileToGQL = (avikastFile) => ({
    id: avikastFile.id,
    name: avikastFile.name,
    type: avikastFile.type,
    user: exports.mapUserToGQL(avikastFile.user),
    fileId: avikastFile.fileId,
});
exports.mapAvikastFilesToGQL = (avikastFiles) => avikastFiles.map(exports.mapAvikastFileToGQL);
exports.mapMessageToGQL = (message) => ({
    id: message.id,
    sender: exports.mapUserToGQL(message.sender),
    roomId: message.roomId,
    body: message.body,
    date: message.date,
    receiverId: message.receiverId,
});
exports.mapMessagesToGQL = (messages) => messages.map(exports.mapMessageToGQL);
exports.mapProducerToGQL = (producer) => ({
    id: producer.id,
    kind: producer.kind,
    rtpParameters: producer.rtpParameters,
    appData: producer.appData,
});
exports.mapProducersToGQL = (producers) => producers.map(exports.mapProducerToGQL);
exports.mapRecordToGQL = (record) => ({
    id: record.id,
    name: record.name,
    date: record.date,
    fileId: record.fileId,
});
exports.mapRecordsToGQL = (records) => records.map(exports.mapRecordToGQL);
//# sourceMappingURL=Mappers.js.map