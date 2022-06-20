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
var RoomManager_1;
Object.defineProperty(exports, "__esModule", { value: true });
const IRoomManager_1 = __importDefault(require("./IRoomManager"));
const IMediasoupService_1 = __importDefault(require("../../services/mediasoup/IMediasoupService"));
const common_1 = require("@nestjs/common");
const IRoomStore_1 = __importDefault(require("../../database/stores/room/IRoomStore"));
const Room_1 = __importStar(require("../../entities/Room"));
const Participant_1 = require("../../entities/Participant");
const Mappers_1 = require("../../database/entities/Mappers");
const generate_password_1 = require("generate-password");
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const operators_1 = require("rxjs/operators");
const Mediasoup_1 = require("../../entities/Mediasoup");
const ILogger_1 = __importDefault(require("../../utils/ILogger"));
let RoomManager = RoomManager_1 = class RoomManager extends IRoomManager_1.default {
    constructor(roomStore, mediasoupService, userStore, logger) {
        super();
        this.roomStore = roomStore;
        this.mediasoupService = mediasoupService;
        this.userStore = userStore;
        this.logger = logger;
    }
    async createRoom(userId, name, type, passwordProtected, password) {
        const inviteLink = RoomManager_1.generateCode();
        const userName = await this.userStore.getUserName(userId);
        const room = Mappers_1.mapRoomFromDB(await this.roomStore.createRoom({
            name,
            user: { id: userId },
            type,
            passwordProtected,
            password,
            inviteLink,
        }));
        await this.roomStore.createParticipant({
            room,
            user: { id: userId },
            role: Participant_1.ParticipantRole.Owner,
            media: {
                userName,
                audio: {
                    enabled: false,
                    muted: false,
                    clientId: undefined,
                    userId,
                    producerOptions: undefined,
                    mediaKind: undefined,
                    mediaType: undefined,
                },
                video: {
                    enabled: false,
                    muted: false,
                    clientId: undefined,
                    userId,
                    producerOptions: undefined,
                    mediaKind: undefined,
                    mediaType: undefined,
                },
                screen: {
                    enabled: false,
                    muted: false,
                    clientId: undefined,
                    userId,
                    producerOptions: undefined,
                    mediaKind: undefined,
                    mediaType: undefined,
                },
            },
        });
        await this.mediasoupService.createRouter(room.id);
        return room;
    }
    async joinRoom(userId, inviteLink, password) {
        const dbRoom = await this.roomStore.findRoomByCode(inviteLink);
        const userName = await this.userStore.getUserName(userId);
        if (!dbRoom)
            throw new Error('inviteLink is not valid');
        if (dbRoom.passwordProtected && dbRoom.password !== password)
            throw new Error('Password is not valid');
        const room = Mappers_1.mapRoomFromDB(dbRoom);
        const participant = await this.roomStore.findParticipant(room.id, userId);
        if (!participant) {
            await this.roomStore.createParticipant({
                user: { id: userId },
                room,
                role: Participant_1.ParticipantRole.Participant,
                media: {
                    userName,
                    audio: {
                        enabled: false,
                        muted: false,
                        clientId: undefined,
                        userId,
                        producerOptions: undefined,
                        mediaKind: undefined,
                        mediaType: undefined,
                    },
                    video: {
                        enabled: false,
                        muted: false,
                        clientId: undefined,
                        userId,
                        producerOptions: undefined,
                        mediaKind: undefined,
                        mediaType: undefined,
                    },
                    screen: {
                        enabled: false,
                        muted: false,
                        clientId: undefined,
                        userId,
                        producerOptions: undefined,
                        mediaKind: undefined,
                        mediaType: undefined,
                    },
                },
            });
        }
        return room;
    }
    async getRoom(userId) {
        this.logger.logger('getRoom userId', userId);
        const roomAsOwner = await this.roomStore.findRoomAsRoomOwnerByUserId(userId);
        if (roomAsOwner)
            return roomAsOwner.id;
        if (!roomAsOwner) {
            const roomAsParticipant = await this.roomStore.findRoomAsParticipantByUserId(userId);
            if (roomAsParticipant) {
                return roomAsParticipant.id;
            }
            return undefined;
        }
    }
    async getRoomByUserId(userId) {
        const room = await this.roomStore.findRoomByUser(userId);
        if (!room) {
            return undefined;
        }
        return Object.assign({}, Mappers_1.mapRoomFromDB(room));
    }
    async getRoomById(userId, roomId) {
        const room = await this.roomStore.findRoomByIdOrThrow(roomId);
        const dbUser = await this.userStore.getUser(room.user.id);
        if (!room || !roomId) {
            throw new Error('Room is not found');
        }
        if (!dbUser)
            throw new Error('dbUser is not found');
        return Object.assign({}, Mappers_1.mapRoomFromDB(room));
    }
    async getRooms() {
        const rooms = await this.roomStore.getRooms();
        return Mappers_1.mapRoomsFromDB(rooms);
    }
    async getUserRooms(userId) {
        const rooms = await this.roomStore.getUserRooms(userId);
        return Mappers_1.mapRoomsFromDB(rooms);
    }
    async deleteRooms(roomIds) {
        await this.roomStore.deleteRooms(roomIds);
    }
    static generateCode() {
        return generate_password_1.generate({
            length: 10,
            numbers: true,
            lowercase: true,
            uppercase: false,
        });
    }
    async getParticipants(userId, roomId) {
        return Mappers_1.mapParticipantsFromDB(await this.roomStore.getParticipants(roomId));
    }
    async getParticipantsTracks(userId, roomId) {
        if (!(await this.roomStore.findParticipant(roomId, userId)))
            throw new Error("You don't belong to this room");
        const participants = Mappers_1.mapParticipantsFromDB(await this.roomStore.getParticipants(roomId));
        const tracks = [];
        participants.forEach((participant) => {
            const track = participant.media;
            tracks.push(track);
        });
        return tracks;
    }
    async getWebinarOwner(userId, roomId) {
        if (!(await this.roomStore.findParticipant(roomId, userId)))
            throw new Error("You don't belong to this room");
        const webinarOwner = Mappers_1.mapParticipantFromDB(await this.roomStore.getWebinarOwner(userId, roomId));
        return webinarOwner;
    }
    async getInviteLink(roomId) {
        return this.roomStore.getInviteLink(roomId);
    }
    async raiseHand(roomId, userId, raiseHand) {
        this.logger.logger('raiseHand roomId', roomId);
        return this.roomStore.updateRaiseHand(roomId, userId, raiseHand);
    }
    async leaveRoom(roomId, userId) {
        this.logger.logger('leaveRoom roomId', roomId);
        await this.mediasoupService.leaveRoom(roomId, userId);
        return this.roomStore.leaveRoom(roomId, userId);
    }
    async closeRoom(roomId) {
        this.logger.logger('closeRoom roomId', roomId);
        const res = await this.roomStore.closeRoom(roomId);
        await this.mediasoupService.closeRoom(roomId);
        return res;
    }
    async kick(roomOwnerUserId, userId, roomId) {
        this.logger.logger('kick roomId', roomId);
        return this.roomStore.kick(roomOwnerUserId, userId, roomId);
    }
    async mute(action, source, userId, owner, roomId, producerId) {
        this.logger.logger('mute roomId', roomId);
        const room = await this.roomStore.findRoomByIdOrThrow(roomId);
        const mediasoupResponse = await this.mediasoupService.mute(action, room.id, userId, producerId);
        if (!mediasoupResponse)
            return false;
        const response = await this.roomStore.mute(action, source, userId, room.id);
        return response;
    }
    async muteAll(action, userId, owner, roomId) {
        this.logger.logger('muteAll roomId', roomId);
        const room = await this.roomStore.findRoomByIdOrThrow(roomId);
        const response = await this.roomStore.muteAll(action, userId, room.id);
        return response;
    }
    async playPauseMedia(media, status, roomId, userId) {
        this.logger.logger('playPauseMedia roomId', roomId);
        return this.roomStore.playPauseMedia(media, status, roomId, userId);
    }
    roomObservable() {
        return this.roomStore.watchRoom().pipe(operators_1.map(Mappers_1.mapRoomFromDB));
    }
};
RoomManager = RoomManager_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IRoomStore_1.default,
        IMediasoupService_1.default,
        IUserStore_1.default,
        ILogger_1.default])
], RoomManager);
exports.default = RoomManager;
//# sourceMappingURL=RoomManager.js.map