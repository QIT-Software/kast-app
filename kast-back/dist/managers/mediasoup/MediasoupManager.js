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
Object.defineProperty(exports, "__esModule", { value: true });
const IMediasoupManager_1 = __importDefault(require("./IMediasoupManager"));
const IMediasoupService_1 = __importDefault(require("../../services/mediasoup/IMediasoupService"));
const common_1 = require("@nestjs/common");
const Mediasoup_1 = require("../../entities/Mediasoup");
const IRoomStore_1 = __importDefault(require("../../database/stores/room/IRoomStore"));
const Participant_1 = require("../../entities/Participant");
const IFileStore_1 = __importDefault(require("../../database/stores/file/IFileStore"));
const uuid_1 = require("uuid");
const Utils_1 = require("../../services/mediasoup/Utils");
const IRecordStore_1 = __importDefault(require("../../database/stores/record/IRecordStore"));
let MediasoupManager = class MediasoupManager extends IMediasoupManager_1.default {
    constructor(mediasoupService, roomStore, fileStore, recordStore) {
        super();
        this.mediasoupService = mediasoupService;
        this.roomStore = roomStore;
        this.fileStore = fileStore;
        this.recordStore = recordStore;
    }
    async createTransport(roomId, userId, direction, clientId) {
        if (direction === 'send') {
            await this.roomStore.updateEmptyParticipant(roomId, clientId, userId);
        }
        return this.mediasoupService.createTransport(roomId, userId, direction, clientId);
    }
    async connectTransport(roomId, dtlsParameters, direction, clientId, quality) {
        await this.mediasoupService.connectTransport(roomId, dtlsParameters, direction, clientId, quality);
    }
    async createProducer(roomId, transportId, clientId, userId, rtpParameters, mediaKind, mediaType) {
        const producer = await this.mediasoupService.createProducer(roomId, transportId, clientId, userId, rtpParameters, mediaType, mediaKind);
        const participantTrackOptions = {
            enabled: true,
            muted: false,
            clientId,
            userId,
            producerOptions: producer,
            mediaKind,
            mediaType,
        };
        if (mediaType === 'screenShare') {
            await this.roomStore.updateParticipantMedia(mediaType, roomId, clientId, userId, participantTrackOptions);
        }
        else {
            await this.roomStore.updateParticipantMedia(mediaKind, roomId, clientId, userId, participantTrackOptions);
        }
        return producer;
    }
    async createConsumer(roomId, producerId, rtpCapabilities, clientId, userId) {
        return this.mediasoupService.createConsumer(roomId, producerId, rtpCapabilities, clientId, userId);
    }
    async getRouter(roomId) {
        return this.mediasoupService.getRouter(roomId);
    }
    async getProducer(roomId, userId) {
        return this.mediasoupService.getProducer(roomId, userId);
    }
    async getProducers(roomId) {
        return this.mediasoupService.getProducers(roomId);
    }
    async startRecording(roomId, userId, producerId, audioProducerId) {
        const recordId = `${uuid_1.v4()}.mp4`;
        await this.roomStore.createRecordId(roomId, recordId);
        return this.mediasoupService.startRecording(roomId, userId, recordId, producerId, audioProducerId);
    }
    async stopRecording(userId, roomId) {
        let room;
        if (!roomId) {
            room = await this.roomStore.findRoomByUser(userId);
        }
        else {
            room = await this.roomStore.findRoomByIdOrThrow(roomId);
        }
        if (!room)
            throw new Error(' stop record: cannot find room');
        const recordName = Utils_1.getNameAsDate();
        if (room.recordingId) {
            const file = await this.fileStore.addFile(`${recordName}.mp4`, 'video/mp4', room.recordingId);
            await this.recordStore.createRecord(userId, recordName, room.recordingId, file.id);
        }
        return this.mediasoupService.stopRecording(roomId, userId);
    }
};
MediasoupManager = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IMediasoupService_1.default,
        IRoomStore_1.default,
        IFileStore_1.default,
        IRecordStore_1.default])
], MediasoupManager);
exports.default = MediasoupManager;
//# sourceMappingURL=MediasoupManager.js.map