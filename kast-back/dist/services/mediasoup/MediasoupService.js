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
const IMediasoupService_1 = __importDefault(require("./IMediasoupService"));
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const Constants_1 = require("./Constants");
const Utils_1 = require("./Utils");
const Mediasoup_1 = require("../../entities/Mediasoup");
const CloseRouter_1 = require("./entities/CloseRouter");
const LeaveRoom_1 = require("./entities/LeaveRoom");
const Room_1 = require("../../entities/Room");
let MediasoupService = class MediasoupService extends IMediasoupService_1.default {
    constructor(mediasoupClient) {
        super();
        this.mediasoupClient = mediasoupClient;
    }
    async createRouter(roomId) {
        const response = await this.sendAsyncRequired({ area: 'router', action: 'create' }, { roomId });
        return { rtpCapabilities: response.rtpCapabilities };
    }
    async createTransport(roomId, userId, direction, clientId) {
        const response = await this.sendAsyncRequired({ area: 'transport', action: 'create' }, { roomId, userId, direction, clientId });
        return {
            id: response.id,
            iceCandidates: response.iceCandidates,
            iceParameters: response.iceParameters,
            dtlsParameters: response.dtlsParameters,
        };
    }
    async connectTransport(roomId, dtlsParameters, direction, clientId, quality) {
        await this.sendAsync({ area: 'transport', action: 'connect' }, { roomId, dtlsParameters, direction, clientId, quality });
    }
    async createProducer(roomId, transportId, clientId, userId, rtpParameters, mediaType, mediaKind) {
        const response = await this.sendAsyncRequired({ area: 'producer', action: 'create' }, { roomId, userId, transportId, rtpParameters, clientId, mediaType, mediaKind });
        return {
            id: response.producerId,
            kind: response.kind,
            rtpParameters: response.rtpParameters,
            appData: response.appData,
        };
    }
    async createConsumer(roomId, producerId, rtpCapabilities, clientId, userId) {
        const response = await this.sendAsyncRequired({ area: 'consumer', action: 'create' }, { roomId, producerId, rtpCapabilities, clientId, userId });
        return {
            id: response.id,
            producerId: response.producerId,
            rtpParameters: response.rtpParameters,
            appData: response.appData,
        };
    }
    async getRouter(roomId) {
        const response = await this.sendAsyncRequired({ area: 'router', action: 'get' }, { roomId });
        return {
            rtpCapabilities: response.rtpCapabilities,
        };
    }
    async getProducer(roomId, userId) {
        const response = await this.sendAsyncRequired({ area: 'producer', action: 'get' }, { roomId, userId });
        return {
            id: response.id,
            kind: response.kind,
            rtpParameters: response.rtpParameters,
            appData: response.appData,
        };
    }
    async getProducers(roomId) {
        const response = await this.sendAsyncRequired({ area: 'producers', action: 'get' }, { roomId });
        return response.producers;
    }
    async startRecording(roomId, userId, recordId, producerId, audioProducerId) {
        const response = await this.sendAsyncRequired({ area: 'recording', action: 'start' }, { roomId, userId, recordId, producerId, audioProducerId });
        return response.response;
    }
    async stopRecording(roomId, userId, producerId, audioProducerId) {
        const response = await this.sendAsyncRequired({ area: 'recording', action: 'stop' }, { roomId, userId, producerId, audioProducerId });
        return response.response;
    }
    async leaveRoom(roomId, userId) {
        const response = await this.sendAsyncRequired({ area: 'router', action: 'leave' }, { roomId, userId });
        return response.response;
    }
    async closeRoom(roomId) {
        const response = await this.sendAsyncRequired({ area: 'router', action: 'close' }, { roomId });
        return response.response;
    }
    async mute(action, roomId, userId, producerId) {
        const response = await this.sendAsyncRequired({ area: 'producer', action: 'mute' }, { action, roomId, userId, producerId });
        return response.response;
    }
    send(pattern, payload) {
        return this.mediasoupClient.send(pattern, payload);
    }
    sendAsync(pattern, payload) {
        const observable = this.send(pattern, payload);
        return observable.toPromise().then();
    }
    sendAsyncRequired(pattern, payload) {
        const observable = this.send(pattern, payload);
        return observable.toPromise().then(Utils_1.requireResult);
    }
};
MediasoupService = __decorate([
    __param(0, common_1.Inject(Constants_1.MEDIASOUP_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], MediasoupService);
exports.default = MediasoupService;
//# sourceMappingURL=MediasoupService.js.map