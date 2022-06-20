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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const managers_1 = require("../managers");
const enhancers_1 = require("./enhancers");
const entities_1 = require("./entities");
const Mediasoup_1 = require("../entities/Mediasoup");
const LeaveRoom_1 = require("./entities/LeaveRoom");
const CloseRouter_1 = require("./entities/CloseRouter");
let MediasoupController = (() => {
    let MediasoupController = class MediasoupController {
        constructor(roomManager) {
            this.roomManager = roomManager;
        }
        async createRouter(request) {
            const router = await this.roomManager.createRouter(request.roomId);
            return {
                rtpCapabilities: router.rtpCapabilities,
            };
        }
        async createTransport(request) {
            const transport = await this.roomManager.createTransport(request.roomId, request.userId, request.direction, request.clientId);
            return {
                id: transport.id,
                dtlsParameters: transport.dtlsParameters,
                iceCandidates: transport.iceCandidates,
                iceParameters: transport.iceParameters,
            };
        }
        async connectTransport(request) {
            await this.roomManager.connectTransport(request.roomId, request.dtlsParameters, request.direction, request.clientId, request.quality);
        }
        async createProducer(request) {
            const producer = await this.roomManager.createProducer(request.roomId, request.transportId, request.clientId, request.userId, request.rtpParameters, request.mediaType, request.mediaKind);
            return {
                producerId: producer.id,
                kind: producer.kind,
                rtpParameters: producer.rtpParameters,
                appData: producer.appData,
            };
        }
        async createConsumer(request) {
            const consumer = await this.roomManager.createConsumer(request.roomId, request.producerId, request.rtpCapabilities, request.clientId, request.userId);
            return {
                id: consumer.id,
                producerId: consumer.producerId,
                rtpParameters: consumer.rtpParameters,
                appData: consumer.appData,
            };
        }
        async getProducer(request) {
            const producer = await this.roomManager.findProducer(request.roomId, request.userId);
            if (!producer)
                throw new Error(`API producer has not been found`);
            return {
                id: producer.id,
                kind: producer.kind,
                rtpParameters: producer.rtpParameters,
            };
        }
        async getRouter(request) {
            const router = await this.roomManager.findOrCreateRouter(request.roomId);
            return {
                rtpCapabilities: router.rtpCapabilities,
            };
        }
        async getProducers(request) {
            const producers = await this.roomManager.getProducers(request.roomId);
            if (!producers)
                throw new Error(`API producer has not been found`);
            return {
                producers: producers.map((producer) => ({
                    id: producer.id,
                    kind: producer.kind,
                    rtpParameters: producer.rtpParameters,
                    appData: producer.appData,
                })),
            };
        }
        async startRecording(request) {
            const response = await this.roomManager.startRecording(request.roomId, request.userId, request.recordId, request.producerId, request.audioProducerId);
            if (response === undefined)
                throw new Error(`API recording has not been started`);
            return {
                response,
            };
        }
        async stopRecording(request) {
            const response = await this.roomManager.stopRecording(request.roomId, request.userId, request.producerId, request.audioProducerId);
            if (response === undefined)
                throw new Error(`API recording has not been started`);
            return {
                response,
            };
        }
        async leaveRoom(request) {
            const response = await this.roomManager.leaveRoom(request.roomId, request.userId);
            return { response };
        }
        async closeRouter(request) {
            await this.roomManager.closeRouter(request.roomId);
            return {};
        }
        async mute(request) {
            const response = await this.roomManager.muteProducer(request.action, request.roomId, request.userId, request.producerId);
            return { response };
        }
    };
    __decorate([
        enhancers_1.MessagePattern({ area: 'router', action: 'create' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "createRouter", null);
    __decorate([
        enhancers_1.MessagePattern({ area: 'transport', action: 'create' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "createTransport", null);
    __decorate([
        enhancers_1.MessagePattern({ area: 'transport', action: 'connect' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "connectTransport", null);
    __decorate([
        enhancers_1.MessagePattern({ area: 'producer', action: 'create' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "createProducer", null);
    __decorate([
        enhancers_1.MessagePattern({ area: 'consumer', action: 'create' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "createConsumer", null);
    __decorate([
        enhancers_1.MessagePattern({ area: 'producer', action: 'get' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "getProducer", null);
    __decorate([
        enhancers_1.MessagePattern({ area: 'router', action: 'get' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "getRouter", null);
    __decorate([
        enhancers_1.MessagePattern({ area: 'producers', action: 'get' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "getProducers", null);
    __decorate([
        enhancers_1.MessagePattern({ area: 'recording', action: 'start' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "startRecording", null);
    __decorate([
        enhancers_1.MessagePattern({ area: 'recording', action: 'stop' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "stopRecording", null);
    __decorate([
        enhancers_1.MessagePattern({ area: 'router', action: 'leave' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "leaveRoom", null);
    __decorate([
        enhancers_1.MessagePattern({ area: 'router', action: 'close' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "closeRouter", null);
    __decorate([
        enhancers_1.MessagePattern({ area: 'producer', action: 'mute' }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], MediasoupController.prototype, "mute", null);
    MediasoupController = __decorate([
        common_1.Controller(),
        __metadata("design:paramtypes", [managers_1.IMediaManager])
    ], MediasoupController);
    return MediasoupController;
})();
exports.default = MediasoupController;
//# sourceMappingURL=MediasoupController.js.map