"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Platform_1 = require("../../entities/Platform");
const RoomModel_1 = __importDefault(require("./RoomModel"));
const Room_1 = __importDefault(require("../entities/Room"));
const ParticipantModel_1 = __importDefault(require("./ParticipantModel"));
const Participant_1 = __importDefault(require("../entities/Participant"));
const FileModel_1 = __importDefault(require("./FileModel"));
const File_1 = __importDefault(require("../entities/File"));
const RecordModel_1 = __importDefault(require("./RecordModel"));
const Record_1 = __importDefault(require("../entities/Record"));
const ResumeModel_1 = __importDefault(require("./ResumeModel"));
const Resume_1 = __importDefault(require("../../entities/Resume"));
exports.extractIdFromModel = (model) => model._id.toString();
exports.mapUserFromModel = (user) => {
    if (user.referrer && typeof user.referrer !== 'object')
        throw new Error('referrer should be an object');
    if (user.referrer) {
        const referrer = user.referrer;
        referrer.referrer = undefined;
    }
    return {
        id: exports.extractIdFromModel(user),
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
        allowNotifications: user.allowNotifications,
        referralCode: user.referralCode,
        referrer: user.referrer ? exports.mapUserFromModel(user.referrer) : undefined,
        banUntilDate: user.banUntilDate,
        banForever: user.banForever,
        logoUrl: user.logoUrl,
        backgroundUrl: user.backgroundUrl,
        resumeUrl: user.resumeUrl,
    };
};
exports.mapUsersFromModel = (users) => users.map(exports.mapUserFromModel);
exports.mapLocalLoginToModel = (user, email, passwordHash) => {
    return {
        user: user.id,
        email,
        passwordHash,
    };
};
exports.mapLocalLoginFromModel = (localLogin, overrideUser) => {
    let user = overrideUser;
    if (!user) {
        if (!localLogin.user)
            throw new Error('Resume should be provided');
        user = exports.mapUserFromModel(localLogin.user);
    }
    return {
        id: localLogin.id,
        user,
        email: localLogin.email,
        passwordHash: localLogin.passwordHash,
    };
};
exports.mapSessionToModel = (userId, token, refreshToken, appType, platform) => ({
    user: userId,
    token,
    refreshToken,
    appType,
    platform,
});
exports.mapSessionFromModel = (session, overrideUser) => {
    let user = overrideUser;
    if (!user) {
        if (!session.user)
            throw new Error('Resume should be provided');
        user = exports.mapUserFromModel(session.user);
    }
    return {
        id: session.id,
        user,
        userId: user.id,
        token: session.token,
        refreshToken: session.refreshToken,
        appType: session.appType,
        platform: session.platform,
    };
};
exports.mapMessageFromModel = (message) => ({
    id: exports.extractIdFromModel(message),
    sender: exports.mapUserFromModel(message.sender),
    roomId: message.roomId,
    body: message.body,
    date: message.date,
    receiverId: message.receiverId,
});
exports.mapMessagesFromModel = (messages) => messages.map(exports.mapMessageFromModel);
exports.mapRoomFromModel = (room) => {
    if (typeof room.user !== 'object')
        throw new Error('Resume should be object');
    return {
        id: exports.extractIdFromModel(room),
        closed: room.closed,
        name: room.name,
        type: room.type,
        user: exports.mapUserFromModel(room.user),
        passwordProtected: room.passwordProtected,
        password: room.password,
        inviteLink: room.inviteLink,
        recordingId: room.recordingId,
    };
};
exports.mapRoomsFromModel = (rooms) => rooms.map(exports.mapRoomFromModel);
exports.mapBookmarkFromModel = (bookmark) => {
    if (typeof bookmark.user !== 'object')
        throw new Error('Bookmark should be object');
    return {
        id: exports.extractIdFromModel(bookmark),
        date: bookmark.date,
        topic: bookmark.topic,
        text: bookmark.text,
        user: exports.mapUserFromModel(bookmark.user),
    };
};
exports.mapBookmarksFromModel = (bookmarks) => bookmarks.map(exports.mapBookmarkFromModel);
exports.mapParticipantFromModel = (participant) => {
    if (typeof participant.user !== 'object')
        throw new Error('Resume should be object');
    if (typeof participant.room !== 'object')
        throw new Error('Room should be object');
    return {
        id: exports.extractIdFromModel(participant),
        room: exports.mapRoomFromModel(participant.room),
        user: exports.mapUserFromModel(participant.user),
        role: participant.role,
        media: participant.media,
        webinarOptions: participant.webinarOptions,
        raiseHand: participant.raiseHand,
        kicked: participant.kicked,
        muted: participant.muted,
    };
};
exports.mapParticipantsFromModel = (participants) => participants.map(exports.mapParticipantFromModel);
exports.mapFileFromModel = (file) => ({
    id: exports.extractIdFromModel(file),
    mediaLink: file.mediaLink,
    name: file.name,
    mimeType: file.mimeType,
});
exports.mapAvikastFileFromModel = (file) => {
    if (typeof file.user !== 'object')
        throw new Error('Resume should be object');
    let mappedFile;
    if (file.file) {
        if (typeof file.file !== 'object')
            throw new Error('File should be object');
        mappedFile = exports.mapFileFromModel(file.file);
    }
    return {
        id: exports.extractIdFromModel(file),
        name: file.name,
        type: file.type,
        user: exports.mapUserFromModel(file.user),
        file: mappedFile,
    };
};
exports.mapAvikastFilesFromModel = (files) => files.map(exports.mapAvikastFileFromModel);
exports.mapRecordFromModel = (record) => {
    if (typeof record.user !== 'object')
        throw new Error('Resume should be object');
    if (typeof record.file !== 'object')
        throw new Error('File should be object');
    return {
        id: exports.extractIdFromModel(record),
        date: record.date,
        fileId: exports.extractIdFromModel(record.file),
        name: record.name,
        user: exports.mapUserFromModel(record.user),
    };
};
exports.mapRecordsFromModel = (record) => record.map(exports.mapRecordFromModel);
exports.mapResumeFromModel = (resume) => {
    return {
        summary: resume.summary,
        experience: resume.experience,
        education: resume.education,
        awards: resume.awards,
    };
};
//# sourceMappingURL=Mappers.js.map