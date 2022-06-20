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
const common_1 = require("@nestjs/common");
const IMediaManager_1 = __importDefault(require("./IMediaManager"));
const IMediasoup_1 = __importDefault(require("../../mediasoup/IMediasoup"));
const Mediasoup_1 = require("../../entities/Mediasoup");
const ILogger_1 = __importDefault(require("../../utils/ILogger"));
const IRecordSevice_1 = __importDefault(require("../../services/record/IRecordSevice"));
const config_node_1 = require("@spryrocks/config-node");
const WebRtcTransport_1 = __importDefault(require("../../mediasoup/WebRtcTransport"));
const Producer_1 = __importDefault(require("../../mediasoup/Producer"));
const Router_1 = __importDefault(require("../../mediasoup/Router"));
let MediaManager = (() => {
    var MediaManager_1;
    let MediaManager = MediaManager_1 = class MediaManager extends IMediaManager_1.default {
        constructor(mediasoup, logger, recordService, configService) {
            super();
            this.mediasoup = mediasoup;
            this.logger = logger;
            this.recordService = recordService;
            this.configService = configService;
        }
        async createRouter(roomId) {
            const router = await this.mediasoup.createRouter({ roomId });
            this.logger.logRouterCreated(router);
            return router;
        }
        async createTransport(roomId, userId, direction, clientId) {
            const router = (await this.mediasoup.findRouter({ roomId })) || (await this.createRouter(roomId));
            await this.removeNotUsedTransports(router, roomId, userId, direction);
            const transport = await router.createWebRtcTransport({
                roomId,
                userId,
                direction,
                clientId,
            });
            this.logger.logWebRtcTransportCreated(transport, router);
            return transport;
        }
        async removeNotUsedTransports(router, roomId, userId, direction) {
            const transports = await MediaManager_1.findWebRtcTransportsByUserId(router, roomId, userId, direction);
            transports.forEach((transport) => {
                router.removeTransport(transport);
                this.logger.logWebRtcTransportRemoved(transport, router);
            });
        }
        async createPlainTransport(roomId, userId, direction, clientId) {
            let router = await this.mediasoup.findRouter({ roomId });
            if (!router) {
                router = await this.mediasoup.createRouter({ roomId });
            }
            const transport = await router.createPlainTransport({
                roomId,
                userId,
                direction,
                clientId,
            }, this.configService);
            return transport;
        }
        async connectTransport(roomId, dtlsParameters, direction, clientId, quality) {
            const router = await this.findOrCreateRouter(roomId);
            const transport = router.findTransport({ roomId, direction, clientId });
            if (!transport)
                throw new Error(`'Transport not found', ${transport}`);
            await transport.connectToRouter(dtlsParameters);
            if (quality === Mediasoup_1.Quality.Low)
                await transport.setMaxIncomingBitrate(2000);
            if (quality === Mediasoup_1.Quality.High)
                await transport.setMaxIncomingBitrate(80000);
        }
        findTransportByRoomId(roomId, direction) {
            const router = this.mediasoup.findRouter({ roomId });
            if (!router) {
                throw new Error(`findTransportByRoomId cannot find router by roomId ${roomId}`);
            }
            return router.findTransport({ roomId, direction });
        }
        static findWebRtcTransportsByUserId(router, roomId, userId, direction) {
            return router
                .findTransportsByFilter({ roomId, userId, direction })
                .filter((transport) => transport instanceof WebRtcTransport_1.default)
                .map((transport) => transport);
        }
        findTransport(roomId, direction, clientId) {
            const router = this.mediasoup.findRouter({ roomId });
            if (!router)
                throw new Error(`findTransport cannot find router by roomId ${roomId}/${direction}`);
            const transport = router.findTransport({
                roomId,
                direction,
                clientId,
            });
            return transport;
        }
        async createProducer(roomId, transportId, clientId, userId, rtpParameters, mediaType, mediaKind) {
            const router = await this.findOrCreateRouter(roomId);
            const transport = this.findTransport(roomId, 'send', clientId);
            if (!transport)
                throw new Error(`No transport By roomId ${roomId} direction send and clientid ${clientId}`);
            if (!(transport instanceof WebRtcTransport_1.default)) {
                throw new Error('transport type should be WebRtc');
            }
            const producer = await transport.createProducer(transportId, rtpParameters, mediaKind, {
                roomId,
                clientId,
                userId,
                mediaType,
            });
            this.logger.logProducerCreated(producer, transport, router);
            return producer;
        }
        async createConsumer(roomId, producerId, rtpCapabilities, clientId, userId) {
            const transport = this.findTransport(roomId, 'receive', clientId);
            if (!transport)
                throw new Error(` createConsumer. cannot find transport by roomId ${roomId} direction receive and clientid ${clientId}`);
            if (!(transport instanceof WebRtcTransport_1.default)) {
                throw new Error('transport type should be WebRtc');
            }
            const appData = {
                roomId,
                clientId,
                userId,
            };
            const consumer = await transport.createConsumer(producerId, rtpCapabilities, appData);
            this.logger.consumerLog('consumer created', consumer.id);
            return consumer;
        }
        async findRouter(roomId) {
            return this.mediasoup.findRouter({ roomId });
        }
        async findOrCreateRouter(roomId) {
            return (await this.findRouter(roomId)) || this.createRouter(roomId);
        }
        async findProducer(roomId, userId) {
            const transport = this.findTransportByRoomId(roomId, 'send');
            if (!transport)
                throw new Error(`cannot find transport by roomID ${roomId}`);
            const producer = transport.findProducer({ roomId });
            if (!producer)
                throw new Error(`cannot find producer by userId ${userId}`);
            return producer;
        }
        async findProducerById(roomId, producerId) {
            const transport = this.findTransportByRoomId(roomId, 'send');
            if (!transport)
                throw new Error(`cannot find transport by roomId ${roomId}`);
            const producer = transport.findProducerById(producerId);
            if (!producer)
                throw new Error(`cannot find producer by producerId ${producerId}`);
            return producer;
        }
        async findAllProducersByUserId(roomId, userId) {
            const transport = this.findTransportByRoomId(roomId, 'send');
            if (!transport)
                throw new Error(`cannot find transport by transport ${transport}`);
            const producers = transport.getProducers;
            const userProducers = producers.filter((element) => {
                return element.appData.userId === userId;
            });
            if (!userProducers)
                throw new Error(`cannot find producer by userId ${userId}`);
            return userProducers;
        }
        async getProducers(roomId) {
            const router = await this.mediasoup.findRouter({ roomId });
            if (!router)
                throw new Error(`cannot find router by roomId ${router}`);
            const transports = router.getTransports();
            const producers = [];
            transports
                .filter((t) => t instanceof WebRtcTransport_1.default && t.dtlsState === 'connected')
                .forEach((transport) => {
                producers.push(...transport.producers);
            });
            if (!producers)
                throw new Error(`no producer on this router.roomId ${router.roomId}`);
            return producers;
        }
        async findConsumer(roomId, clientId, userId) {
            const transport = this.findTransportByRoomId(roomId, 'receive');
            if (!transport)
                throw new Error(`Consumer:cannot find transport by transport ${transport}`);
            const consumer = transport.findConsumer({ userId, clientId, roomId });
            if (!consumer)
                throw new Error(`COnsumer: cannot find consumer by clientId ${clientId}`);
            return consumer;
        }
        async startRecording(roomId, userId, recordId, producerId, audioProducerId) {
            var _a;
            const router = await this.findOrCreateRouter(roomId);
            (_a = router.rtpCapabilities.codecs) === null || _a === void 0 ? void 0 : _a.find((c) => c.mimeType === 'video/H264');
            if (producerId) {
                const producerIdTransport = await router.createPlainTransport({
                    roomId,
                    userId,
                }, this.configService);
                await producerIdTransport.connect('127.0.0.1', 5006, 5007);
                const videoConsumer = await producerIdTransport.createConsumer(producerId, router.rtpCapabilities, { roomId, userId });
                producerIdTransport.transport.on('connect', () => {
                });
            }
            if (audioProducerId) {
                const audioTransport = await router.createPlainTransport({
                    roomId,
                    userId,
                }, this.configService);
                await audioTransport.connect('127.0.0.1', 5004, 5005);
                const audioConsumer = await audioTransport.createConsumer(audioProducerId, router.rtpCapabilities, { roomId, userId });
                audioTransport.transport.on('connect', () => {
                    this.logger.consumerLog('audio transport connect', audioConsumer.id);
                });
            }
            const audio = !!audioProducerId;
            return this.recordService.startRecording(roomId, recordId, audio);
        }
        async stopRecording(roomId) {
            return this.recordService.stopRecording(roomId);
        }
        async leaveRoom(roomId, userId) {
            const router = await this.findRouter(roomId);
            if (!router)
                throw new Error(`leaveRoom: router not been found, room Id: ${roomId}`);
            const recvTransport = router.findTransport({ userId, direction: 'receive' });
            const sendTransport = router.findTransport({ userId, direction: 'send' });
            if (!recvTransport || !sendTransport)
                throw new Error(`leaveRoom: router not been found, user Id: ${roomId}`);
            if (recvTransport !== undefined) {
                recvTransport.close();
            }
            if (sendTransport !== undefined) {
                sendTransport.close();
            }
            return true;
        }
        async closeRouter(roomId) {
            const router = this.mediasoup.findRouter({ roomId });
            if (!router)
                throw new Error('Router not found');
            router.close();
            return true;
        }
        async muteProducer(action, roomId, userId, producerId) {
            const producer = await this.findProducerById(roomId, producerId);
            if (!producer)
                throw new Error('no producer for mute');
            if (action === Mediasoup_1.MuteAction.Mute)
                await producer.pause();
            else if (action === Mediasoup_1.MuteAction.UnMute)
                await producer.resume();
            return true;
        }
    };
    MediaManager = MediaManager_1 = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IMediasoup_1.default,
            ILogger_1.default,
            IRecordSevice_1.default,
            config_node_1.IConfigService])
    ], MediaManager);
    return MediaManager;
})();
exports.default = MediaManager;
//# sourceMappingURL=MediaManager.js.map