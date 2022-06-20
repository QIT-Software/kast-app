"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const IRoomStore_1 = __importDefault(require("./IRoomStore"));
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const RoomModel_1 = __importStar(require("../../models/RoomModel"));
const Room_1 = require("../../../entities/Room");
const Mappers_1 = require("../../models/Mappers");
const ParticipantModel_1 = __importStar(require("../../models/ParticipantModel"));
const Participant_1 = require("../../../entities/Participant");
const UserModel_1 = __importStar(require("../../models/UserModel"));
const rxjs_1 = require("rxjs");
const Room_2 = __importDefault(require("../../entities/Room"));
const Mediasoup_1 = require("../../../entities/Mediasoup");
let RoomStore = class RoomStore extends IRoomStore_1.default {
    constructor(roomModel, participantModel, userModel) {
        super();
        this.roomModel = roomModel;
        this.participantModel = participantModel;
        this.userModel = userModel;
        this.populateRoom = {
            path: 'user',
        };
        this.populateParticipant = [
            {
                path: 'user',
            },
            {
                path: 'room',
                populate: this.populateRoom,
            },
        ];
    }
    async createRoom(room) {
        const newRoom = {
            name: room.name,
            closed: room.closed,
            type: room.type,
            user: room.user.id,
            passwordProtected: room.passwordProtected,
            password: room.password,
            inviteLink: room.inviteLink,
        };
        const createdRoom = await this.roomModel.create(newRoom);
        return Mappers_1.mapRoomFromModel(await createdRoom.populate(this.populateRoom).execPopulate());
    }
    async findRoomByIdOrThrow(id) {
        const room = await this.roomModel.findById(id).populate(this.populateRoom);
        if (!room)
            throw new Error('Room not found');
        return Mappers_1.mapRoomFromModel(room);
    }
    async findRoomByUser(userId) {
        const room = await this.roomModel
            .findOne({ user: userId, closed: undefined })
            .populate(this.populateRoom);
        return room ? Mappers_1.mapRoomFromModel(room) : null;
    }
    async findCodeByRoomId(roomId) {
        const inviteLink = await this.roomModel.findById(roomId).populate(this.populateRoom);
        return inviteLink || null;
    }
    async createParticipant(participant) {
        const createParticipant = {
            room: participant.room.id,
            user: participant.user.id,
            role: participant.role,
            media: participant.media,
            raiseHand: false,
            kicked: false,
            muted: false,
        };
        const createdParticipant = await this.participantModel.create(createParticipant);
        return Mappers_1.mapParticipantFromModel(await createdParticipant.populate(this.populateParticipant).execPopulate());
    }
    async findRoomByCode(inviteLink) {
        const room = await this.roomModel.findOne({ inviteLink }).populate(this.populateRoom);
        return room ? Mappers_1.mapRoomFromModel(room) : null;
    }
    async findParticipant(roomId, userId) {
        const room = await this.participantModel
            .findOne({ room: roomId, user: userId })
            .populate(this.populateParticipant);
        return room ? Mappers_1.mapParticipantFromModel(room) : undefined;
    }
    async findRoomAsRoomOwnerByUserId(userId) {
        const room = await this.roomModel.findOne({ user: userId }).populate(this.populateRoom);
        return room ? Mappers_1.mapRoomFromModel(room) : null;
    }
    async findRoomAsParticipantByUserId(userId) {
        const participant = await this.participantModel
            .findOne({ user: userId })
            .populate(this.populateRoom);
        if (!participant)
            return null;
        return this.findRoomByUser(participant._id);
    }
    async getParticipants(roomId) {
        return Mappers_1.mapParticipantsFromModel(await this.participantModel.find({ room: roomId }).populate(this.populateParticipant));
    }
    async getRooms() {
        return Mappers_1.mapRoomsFromModel(await this.roomModel.find().populate(this.populateRoom));
    }
    async getUserRooms(userId) {
        return Mappers_1.mapRoomsFromModel(await this.roomModel.find({ user: userId }).populate(this.populateRoom));
    }
    async deleteRooms(roomIds) {
        await this.roomModel.deleteMany({ _id: { $in: roomIds } });
    }
    async getParticipantsTracks(roomId) {
        const participants = Mappers_1.mapParticipantsFromModel(await this.participantModel.find({ room: roomId }).populate(this.populateParticipant));
        const tracks = [];
        participants.forEach((participant) => {
            const track = participant.media;
            tracks.push(track);
        });
        return tracks;
    }
    async getWebinarOwner(userId, roomId) {
        const webinarOwner = await this.participantModel
            .findOne({ room: roomId, user: userId, role: Participant_1.ParticipantRole.Owner })
            .populate(this.populateParticipant);
        if (!webinarOwner || webinarOwner === null)
            throw new Error('Webinar does not exist');
        return Mappers_1.mapParticipantFromModel(webinarOwner);
    }
    async updateEmptyParticipant(roomId, clientId, userId) {
        const participant = await this.findParticipant(roomId, userId);
        const updateObject = {};
        if (!participant)
            throw new Error('participant or participant.media doesnt exist');
        const mediaAudioUpdate = {
            enabled: participant.media.audio.enabled,
            muted: participant.muted,
            clientId,
            userId,
            producerOptions: undefined,
            mediaKind: undefined,
            mediaType: undefined,
        };
        const mediaVideoUpdate = {
            enabled: participant.media.video.enabled,
            muted: participant.muted,
            clientId,
            userId,
            producerOptions: undefined,
            mediaKind: undefined,
            mediaType: undefined,
        };
        const mediaScreenUpdate = {
            enabled: participant.media.screen.enabled,
            muted: participant.muted,
            clientId,
            userId,
            producerOptions: undefined,
            mediaKind: undefined,
            mediaType: undefined,
        };
        updateObject.media = {
            userName: participant.media.userName,
            audio: mediaAudioUpdate,
            video: mediaVideoUpdate,
            screen: mediaScreenUpdate,
        };
        await this.participantModel.update({ room: roomId, user: userId }, updateObject);
    }
    async updateParticipantMedia(type, roomId, clientId, userId, request) {
        const participant = await this.findParticipant(roomId, userId);
        const updateObject = {};
        if (!participant || !participant.media)
            throw new Error('participant or participant.media doesnt exist');
        if (type === 'audio') {
            const { video, screen } = participant.media;
            updateObject.media = {
                userName: participant.user.name,
                audio: request,
                video,
                screen,
            };
        }
        if (type === 'video') {
            const { audio, screen } = participant.media;
            updateObject.media = {
                userName: participant.user.name,
                audio,
                video: request,
                screen,
            };
        }
        if (type === 'screenShare') {
            const { audio, video } = participant.media;
            updateObject.media = {
                userName: participant.user.name,
                audio,
                video,
                screen: request,
            };
        }
        await this.participantModel.update({ room: roomId, user: userId }, updateObject);
        return true;
    }
    async getInviteLink(roomId) {
        const inviteLink = await this.findCodeByRoomId(roomId);
        if (!inviteLink)
            throw new Error('Invite Link not found');
        return inviteLink.toString();
    }
    async updateRaiseHand(roomId, userId, raiseHand) {
        const updateObject = {};
        updateObject.raiseHand = raiseHand;
        await this.participantModel.update({ room: roomId, user: userId }, { raiseHand });
        return raiseHand;
    }
    async leaveRoom(roomId, userId) {
        const participants = await this.getParticipants(roomId);
        if (participants.length === 1) {
            await this.closeRoom(roomId);
            return true;
        }
        const updateObject = {};
        const newParticipantsSubject = participants.filter((element) => element.user.id !== userId);
        updateObject.participants = newParticipantsSubject;
        await this.roomModel.update({ _id: roomId }, updateObject);
        return true;
    }
    async closeRoom(roomId) {
        await this.roomModel.update({ _id: roomId }, { closed: new Date() });
        return true;
    }
    async createRecordId(roomId, recordId) {
        await this.roomModel.update({ _id: roomId }, { recordingId: recordId });
    }
    watchInternal() {
        if (!this.changeStream) {
            const changeRoom = this.roomModel.watch();
            changeRoom.on('change', this.onChangeEventReceived.bind(this));
            this.changeStream = changeRoom;
            const changeStream = this.participantModel.watch();
            changeStream.on('change', this.onChangeEventReceived.bind(this));
            this.changeStream = changeStream;
        }
        let room;
        if (this.roomSubject) {
            room = this.roomSubject;
        }
        else {
            room = new rxjs_1.Subject();
            this.roomSubject = room;
        }
        return room;
    }
    async onChangeEventReceived(doc) {
        if (doc.operationType === 'insert') {
            const room = await this.findRoomByIdOrThrow(doc.fullDocument._id);
            if (!room) {
                throw new Error('Message does not exist');
            }
            if (this.roomSubject !== undefined) {
                this.roomSubject.next(room);
            }
        }
        if (doc.operationType === 'update') {
            const participant = await this.participantModel
                .findOne({ _id: doc.documentKey })
                .populate(this.populateRoom);
            const room = await this.findRoomByIdOrThrow(participant.room);
            if (!room) {
                throw new Error('participantTracks does not exist');
            }
            if (this.roomSubject !== undefined) {
                this.roomSubject.next(room);
            }
        }
    }
    watchRoom() {
        const room = this.watchInternal();
        return room;
    }
    async kick(roomOwnerUserId, userId, roomId) {
        const updateObject = {};
        const kicked = true;
        updateObject.kicked = kicked;
        await this.participantModel.update({ room: roomId, user: userId }, { kicked });
        return true;
    }
    async mute(action, source, userId, roomId) {
        if (source === Room_1.MuteSource.Audio) {
            return this.muteAudio(action, source, userId, roomId);
        }
        if (source === Room_1.MuteSource.Video) {
            return this.muteVideo(action, source, userId, roomId);
        }
        if (source === Room_1.MuteSource.Screen) {
            return this.muteScreen(action, source, userId, roomId);
        }
        return false;
    }
    async muteAll(action, userId, roomId) {
        const participant = await this.findParticipant(roomId, userId);
        if (!participant)
            throw new Error('no participant');
        const updateObject = {};
        const muted = action === Room_1.MuteAction.Mute;
        updateObject.muted = muted;
        await this.participantModel.update({ room: roomId, user: userId }, { muted });
        return false;
    }
    async muteAudio(action, source, userId, roomId) {
        const participant = await this.findParticipant(roomId, userId);
        const updateObject = {};
        if (!participant)
            throw new Error('now participant');
        const update = {
            userName: participant.user.name,
            audio: {
                enabled: participant.media.audio.enabled,
                muted: action !== Room_1.MuteAction.Mute,
                clientId: participant.media.audio.clientId,
                userId: participant.media.audio.userId,
                producerOptions: participant.media.audio.producerOptions,
                mediaKind: participant.media.audio.mediaKind,
                mediaType: participant.media.audio.mediaType,
            },
            video: participant.media.video,
            screen: participant.media.screen,
        };
        updateObject.media = update;
        await this.participantModel.update({ _id: userId, room: roomId }, { updateObject });
        return true;
    }
    async muteVideo(action, source, userId, roomId) {
        const participant = await this.findParticipant(roomId, userId);
        const updateObject = {};
        if (!participant)
            throw new Error('now participant');
        const update = {
            userName: participant.user.name,
            audio: participant.media.audio,
            video: {
                enabled: participant.media.video.enabled,
                muted: action !== Room_1.MuteAction.Mute,
                clientId: participant.media.video.clientId,
                userId: participant.media.video.userId,
                producerOptions: participant.media.video.producerOptions,
                mediaKind: participant.media.video.mediaKind,
                mediaType: participant.media.video.mediaType,
            },
            screen: participant.media.screen,
        };
        updateObject.media = update;
        await this.participantModel.update({ _id: userId, room: roomId }, { updateObject });
        return true;
    }
    async muteScreen(action, source, userId, roomId) {
        const participant = await this.findParticipant(roomId, userId);
        const updateObject = {};
        if (!participant)
            throw new Error('now participant');
        const update = {
            userName: participant.user.name,
            audio: participant.media.audio,
            video: participant.media.video,
            screen: {
                enabled: participant.media.screen.enabled,
                muted: action !== Room_1.MuteAction.Mute,
                clientId: participant.media.screen.clientId,
                userId: participant.media.screen.userId,
                producerOptions: participant.media.screen.producerOptions,
                mediaKind: participant.media.screen.mediaKind,
                mediaType: participant.media.screen.mediaType,
            },
        };
        updateObject.media = update;
        await this.participantModel.update({ _id: userId, room: roomId }, { updateObject });
        return true;
    }
    async playPauseMedia(media, status, roomId, userId) {
        const participant = await this.findParticipant(roomId, userId);
        const updateObject = {};
        if (!participant)
            throw new Error('now participant');
        if (media === Mediasoup_1.PlayingType.Audio) {
            updateObject.media = {
                userName: participant.user.name,
                audio: {
                    enabled: status,
                    muted: participant.media.audio.muted,
                    clientId: participant.media.audio.clientId,
                    userId: participant.media.audio.userId,
                    producerOptions: participant.media.audio.producerOptions,
                    mediaKind: participant.media.audio.mediaKind,
                    mediaType: participant.media.audio.mediaType,
                },
                video: participant.media.video,
                screen: participant.media.screen,
            };
        }
        if (media === Mediasoup_1.PlayingType.Video) {
            updateObject.media = {
                userName: participant.user.name,
                audio: participant.media.audio,
                video: {
                    enabled: status,
                    muted: participant.media.video.muted,
                    clientId: participant.media.video.clientId,
                    userId: participant.media.video.userId,
                    producerOptions: participant.media.video.producerOptions,
                    mediaKind: participant.media.video.mediaKind,
                    mediaType: participant.media.video.mediaType,
                },
                screen: participant.media.screen,
            };
        }
        if (media === Mediasoup_1.PlayingType.Screen) {
            updateObject.media = {
                userName: participant.user.name,
                audio: participant.media.audio,
                video: participant.media.video,
                screen: {
                    enabled: status,
                    muted: participant.media.screen.muted,
                    clientId: participant.media.screen.clientId,
                    userId: participant.media.screen.userId,
                    producerOptions: participant.media.screen.producerOptions,
                    mediaKind: participant.media.screen.mediaKind,
                    mediaType: participant.media.screen.mediaType,
                },
            };
        }
        await this.participantModel.updateOne({ user: userId, room: roomId }, updateObject);
    }
};
RoomStore = __decorate([
    __param(0, mongoose_1.InjectModel(RoomModel_1.RoomSchema.name)),
    __param(1, mongoose_1.InjectModel(ParticipantModel_1.ParticipantSchema.name)),
    __param(2, mongoose_1.InjectModel(UserModel_1.UserSchema.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], RoomStore);
exports.default = RoomStore;
//# sourceMappingURL=RoomStore.js.map