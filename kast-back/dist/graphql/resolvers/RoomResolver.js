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
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const IRoomManager_1 = __importDefault(require("../../managers/room/IRoomManager"));
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const Room_1 = require("../../entities/Room");
const Room_2 = __importDefault(require("../entities/room/Room"));
const Mappers_1 = require("../entities/Mappers");
const Participant_1 = __importDefault(require("../entities/room/Participant"));
const ParticipantMedia_1 = __importDefault(require("../entities/room/ParticipantMedia"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const SessionInfo_1 = __importDefault(require("../../entities/SessionInfo"));
const Ignore_1 = __importDefault(require("../../enhancers/decorators/Ignore"));
const EVENT_ROOM_UPDATED = 'EVENT_ROOM_UPDATED';
let RoomResolver = class RoomResolver {
    constructor(roomManager, pubSub) {
        this.roomManager = roomManager;
        this.pubSub = pubSub;
    }
    async createRoom(session, name, type, passwordProtected, password) {
        const room = await Mappers_1.mapRoomToGQL(await this.roomManager.createRoom(session.userId, name, type, passwordProtected, password));
        return room;
    }
    async rooms() {
        return Mappers_1.mapRoomsToGQL(await this.roomManager.getRooms());
    }
    async deleteRooms(roomIds) {
        await this.roomManager.deleteRooms(roomIds);
        return true;
    }
    async joinRoom(session, inviteLink, password) {
        return Mappers_1.mapRoomToGQL(await this.roomManager.joinRoom(session.userId, inviteLink, password));
    }
    async roomById(session, roomId) {
        return Mappers_1.mapRoomToGQL(await this.roomManager.getRoomById(session.userId, roomId));
    }
    async room(session) {
        const roomFromManager = await this.roomManager.getRoomByUserId(session.userId);
        if (roomFromManager === undefined) {
            return undefined;
        }
        return Mappers_1.mapRoomToGQL(roomFromManager);
    }
    async userRooms(session) {
        return Mappers_1.mapRoomsToGQL(await this.roomManager.getUserRooms(session.userId));
    }
    async participantsResolveField(room) {
        const participants = await this.roomManager.getParticipants('session.userId', room.id);
        return Mappers_1.mapParticipantsToGQL(participants);
    }
    async participants(session, roomId) {
        return Mappers_1.mapParticipantsToGQL(await this.roomManager.getParticipants(session.userId, roomId));
    }
    async participantsTracks(session, roomId) {
        const pubSub = new graphql_subscriptions_1.PubSub();
        const tracks = await this.roomManager.getParticipantsTracks(session.userId, roomId);
        const mapTracks = Mappers_1.mapParticipantsTracksToGQL(tracks);
        await pubSub.publish('participantTrackChanged', { mapTracks });
        return mapTracks;
    }
    async webinarOwner(session, roomId) {
        const webinarOwner = await this.roomManager.getWebinarOwner(session.userId, roomId);
        return Mappers_1.mapParticipantToGQL(webinarOwner);
    }
    async inviteLinkByRoomById(roomId) {
        return this.roomManager.getInviteLink(roomId);
    }
    async raiseHand(session, roomId, raiseHand) {
        return this.roomManager.raiseHand(roomId, session.userId, raiseHand);
    }
    async leaveRoom(roomId, session) {
        return this.roomManager.leaveRoom(roomId, session.userId);
    }
    async closeRoom(roomId) {
        return this.roomManager.closeRoom(roomId);
    }
    async roomSub(_roomId) {
        if (!this.roomUpdatedSubscription) {
            this.roomUpdatedSubscription = this.roomManager
                .roomObservable()
                .subscribe(async (room) => {
                return this.pubSub.publish(EVENT_ROOM_UPDATED, room);
            });
        }
        return this.pubSub.asyncIterator(EVENT_ROOM_UPDATED);
    }
    async mute(session, action, source, userId, roomId, producerId) {
        return this.roomManager.mute(action, source, userId, session.userId, roomId, producerId);
    }
    async muteAll(session, action, userId, roomId) {
        return this.roomManager.muteAll(action, userId, session.userId, roomId);
    }
    async kick(session, userId, roomId) {
        return this.roomManager.kick(session.userId, userId, roomId);
    }
};
__decorate([
    graphql_1.Mutation(() => Room_2.default),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('name')),
    __param(2, graphql_1.Args({ name: 'type', type: () => Room_1.RoomType })),
    __param(3, graphql_1.Args({ name: 'passwordProtected', type: () => Boolean })),
    __param(4, graphql_1.Args({ name: 'password', type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "createRoom", null);
__decorate([
    graphql_1.Query(() => [Room_2.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "rooms", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args({ name: 'roomIds', type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "deleteRooms", null);
__decorate([
    graphql_1.Mutation(() => Room_2.default),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('inviteLink')),
    __param(2, graphql_1.Args({ name: 'password', type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "joinRoom", null);
__decorate([
    graphql_1.Query(() => Room_2.default),
    __param(0, CurrentSession_1.default()), __param(1, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "roomById", null);
__decorate([
    graphql_1.Query(() => Room_2.default, { nullable: true }),
    __param(0, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "room", null);
__decorate([
    graphql_1.Query(() => [Room_2.default], { nullable: true }),
    __param(0, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "userRooms", null);
__decorate([
    graphql_1.ResolveField(() => [Participant_1.default], { name: 'participants' }),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Room_2.default]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "participantsResolveField", null);
__decorate([
    graphql_1.Query(() => [Participant_1.default]),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "participants", null);
__decorate([
    graphql_1.Query(() => [ParticipantMedia_1.default]),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "participantsTracks", null);
__decorate([
    graphql_1.Query(() => Participant_1.default),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "webinarOwner", null);
__decorate([
    graphql_1.Query(() => String),
    __param(0, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "inviteLinkByRoomById", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('roomId')),
    __param(2, graphql_1.Args('raiseHand')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Boolean]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "raiseHand", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('roomId')),
    __param(1, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "leaveRoom", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "closeRoom", null);
__decorate([
    Ignore_1.default('AppType', 'Platform'),
    graphql_1.Subscription(() => Room_2.default, {
        resolve: (room) => room,
    }),
    __param(0, graphql_1.Args({
        name: 'roomId',
        type: () => String,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "roomSub", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('action')),
    __param(2, graphql_1.Args('source')),
    __param(3, graphql_1.Args('userId')),
    __param(4, graphql_1.Args('roomId')),
    __param(5, graphql_1.Args('producerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "mute", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('action')),
    __param(2, graphql_1.Args('userId')),
    __param(3, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "muteAll", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('userId')),
    __param(2, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], RoomResolver.prototype, "kick", null);
RoomResolver = __decorate([
    graphql_1.Resolver(() => Room_2.default),
    __metadata("design:paramtypes", [IRoomManager_1.default,
        graphql_subscriptions_1.PubSubEngine])
], RoomResolver);
exports.default = RoomResolver;
//# sourceMappingURL=RoomResolver.js.map