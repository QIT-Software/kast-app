"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeMediasoup = void 0;
const Mediasoup_1 = __importDefault(require("./Mediasoup"));
const MediasoupConfig_1 = __importDefault(require("./MediasoupConfig"));
const MediaCodecs_1 = require("../config/MediaCodecs");
const InitialAvailableOutgoingBitrate_1 = require("../config/InitialAvailableOutgoingBitrate");
const WorkerConfig_1 = __importDefault(require("./WorkerConfig"));
exports.initializeMediasoup = async (configService) => {
    const listenIps = [
        {
            ip: configService.get('LISTEN_IP'),
            announcedIp: configService.getOptional('ANNOUNCED_IP'),
        },
    ];
    const config = {
        mediaCodecs: MediaCodecs_1.mediaCodecs,
        initialAvailableOutgoingBitrate: InitialAvailableOutgoingBitrate_1.initialAvailableOutgoingBitrate,
        listenIps,
    };
    const mediasoup = new Mediasoup_1.default(config);
    const workerConfig = {
        rtcMinPort: configService.getNumber('RTC_MIN_PORT'),
        rtcMaxPort: configService.getNumber('RTC_MAX_PORT'),
    };
    await mediasoup.createWorker(workerConfig);
    return mediasoup;
};
//# sourceMappingURL=MediasoupInitializer.js.map