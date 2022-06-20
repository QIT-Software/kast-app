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
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const TransportOptions_1 = __importDefault(require("../entities/mediasoup/TransportOptions"));
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
const ConsumerOptions_1 = __importDefault(require("../entities/mediasoup/ConsumerOptions"));
const RouterOptions_1 = __importDefault(require("../entities/mediasoup/RouterOptions"));
const ProducerOptions_1 = __importDefault(require("../entities/mediasoup/ProducerOptions"));
const IMediasoupManager_1 = __importDefault(require("../../managers/mediasoup/IMediasoupManager"));
const Mediasoup_1 = require("../../entities/Mediasoup");
const Mappers_1 = require("../entities/Mappers");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const SessionInfo_1 = __importDefault(require("../../entities/SessionInfo"));
const IRoomManager_1 = __importDefault(require("../../managers/room/IRoomManager"));
let MediasoupResolver = class MediasoupResolver {
    constructor(mediasoupManager, roomManager) {
        this.mediasoupManager = mediasoupManager;
        this.roomManager = roomManager;
    }
    async createTransport(session, roomId, direction, clientId) {
        return this.mediasoupManager.createTransport(roomId, session.userId, direction, clientId);
    }
    async connectTransport(session, roomId, dtlsParameters, direction, clientId, quality) {
        await this.mediasoupManager.connectTransport(roomId, dtlsParameters, direction, clientId, quality);
        return true;
    }
    async createProducer(session, transportId, roomId, clientId, rtpParameters, mediaKind, mediaType) {
        const pubSub = new graphql_subscriptions_1.PubSub();
        pubSub.asyncIterator('participantTrackChanged');
        const producer = await this.mediasoupManager.createProducer(roomId, transportId, clientId, session.userId, rtpParameters, mediaKind, mediaType);
        return Mappers_1.mapProducerToGQL(producer);
    }
    async createConsumer(session, producerId, roomId, rtpCapabilities, clientId) {
        return this.mediasoupManager.createConsumer(roomId, producerId, rtpCapabilities, clientId, session.userId);
    }
    async getRouter(session, roomId) {
        return this.mediasoupManager.getRouter(roomId);
    }
    async getProducer(session, roomId) {
        const producer = await this.mediasoupManager.getProducer(roomId, session.userId);
        return Mappers_1.mapProducerToGQL(producer);
    }
    async getProducers(roomId) {
        const producers = await this.mediasoupManager.getProducers(roomId);
        return Mappers_1.mapProducersToGQL(producers);
    }
    async startRecording(roomId, producerId, audioProducerId, session) {
        return this.mediasoupManager.startRecording(roomId, session.userId, producerId, audioProducerId);
    }
    async stopRecording(roomId, producerId, audioProducerId, session) {
        return this.mediasoupManager.stopRecording(session.userId, roomId, producerId, audioProducerId);
    }
    async playPauseMedia(media, status, roomId, session) {
        return this.roomManager.playPauseMedia(media, status, roomId, session.userId);
    }
};
__decorate([
    graphql_1.Mutation(() => TransportOptions_1.default),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('roomId')),
    __param(2, graphql_1.Args('direction')),
    __param(3, graphql_1.Args('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], MediasoupResolver.prototype, "createTransport", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('roomId')),
    __param(2, graphql_1.Args({ name: 'dtlsParameters', type: () => graphql_type_json_1.default })),
    __param(3, graphql_1.Args('direction')),
    __param(4, graphql_1.Args('clientId')),
    __param(5, graphql_1.Args('quality')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], MediasoupResolver.prototype, "connectTransport", null);
__decorate([
    graphql_1.Mutation(() => ProducerOptions_1.default),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('transportId')),
    __param(2, graphql_1.Args('roomId')),
    __param(3, graphql_1.Args('clientId')),
    __param(4, graphql_1.Args({ name: 'rtpParameters', type: () => graphql_type_json_1.default })),
    __param(5, graphql_1.Args({ name: 'mediaKind', type: () => Mediasoup_1.MediaKind })),
    __param(6, graphql_1.Args({ name: 'mediaType', type: () => Mediasoup_1.MediaType })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Object, String, String]),
    __metadata("design:returntype", Promise)
], MediasoupResolver.prototype, "createProducer", null);
__decorate([
    graphql_1.Mutation(() => ConsumerOptions_1.default),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('producerId')),
    __param(2, graphql_1.Args('roomId')),
    __param(3, graphql_1.Args({ name: 'rtpCapabilities', type: () => graphql_type_json_1.default })),
    __param(4, graphql_1.Args('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object, String]),
    __metadata("design:returntype", Promise)
], MediasoupResolver.prototype, "createConsumer", null);
__decorate([
    graphql_1.Query(() => RouterOptions_1.default),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MediasoupResolver.prototype, "getRouter", null);
__decorate([
    graphql_1.Query(() => ProducerOptions_1.default),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MediasoupResolver.prototype, "getProducer", null);
__decorate([
    graphql_1.Query(() => [ProducerOptions_1.default]),
    __param(0, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MediasoupResolver.prototype, "getProducers", null);
__decorate([
    graphql_1.Query(() => Boolean),
    __param(0, graphql_1.Args('roomId')),
    __param(1, graphql_1.Args({ name: 'producerId', type: () => String, nullable: true })),
    __param(2, graphql_1.Args({ name: 'audioProducerId', type: () => String, nullable: true })),
    __param(3, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MediasoupResolver.prototype, "startRecording", null);
__decorate([
    graphql_1.Query(() => Boolean),
    __param(0, graphql_1.Args({ name: 'roomId', type: () => String, nullable: true })),
    __param(1, graphql_1.Args({ name: 'producerId', type: () => String, nullable: true })),
    __param(2, graphql_1.Args({ name: 'audioProducerId', type: () => String, nullable: true })),
    __param(3, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MediasoupResolver.prototype, "stopRecording", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('media')),
    __param(1, graphql_1.Args('status')),
    __param(2, graphql_1.Args('roomId')),
    __param(3, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], MediasoupResolver.prototype, "playPauseMedia", null);
MediasoupResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [IMediasoupManager_1.default,
        IRoomManager_1.default])
], MediasoupResolver);
exports.default = MediasoupResolver;
//# sourceMappingURL=MediasoupResolver.js.map