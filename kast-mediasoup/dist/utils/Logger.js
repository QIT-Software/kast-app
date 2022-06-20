"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ILogger_1 = __importDefault(require("./ILogger"));
const Router_1 = __importDefault(require("../mediasoup/Router"));
const WebRtcTransport_1 = __importDefault(require("../mediasoup/WebRtcTransport"));
const Producer_1 = __importDefault(require("../mediasoup/Producer"));
class Logger extends ILogger_1.default {
    logRouterCreated(router) {
        console.log('Router created: ', Logger.stringifyRouter(router));
    }
    logWebRtcTransportCreated(transport, router) {
        console.log(JSON.stringify({ routerId: router.id }), 'Transport created:', Logger.stringifyWebRtcTransport(transport));
    }
    logWebRtcTransportRemoved(transport, router) {
        console.log(JSON.stringify({ routerId: router.id }), 'Transport removed:', Logger.stringifyWebRtcTransport(transport));
    }
    logProducerCreated(producer, transport, router) {
        console.log(JSON.stringify({
            routerId: router.id,
            transportId: transport.id,
        }), 'Producer created:', Logger.stringifyProducer(producer));
    }
    routerLog(message, info) {
        console.log(`${message} ${info}`);
    }
    consumerLog(message, info) {
        console.log(`${message} ${info}`);
    }
    transportLog(message, info) {
        console.log(`${message} ${info}`);
    }
    recordLog(message, roomId, audioMessage, audio) {
        console.log(`${message} ${roomId} ${audioMessage} ${audio}`);
    }
    static stringifyRouter(router) {
        return `Router ${JSON.stringify({ id: router.id, roomId: router.roomId })}`;
    }
    static stringifyWebRtcTransport(transport) {
        return `Transport ${JSON.stringify({
            roomId: transport.roomId,
            userId: transport.userId,
            direction: transport.direction,
            clientId: transport.clientId,
        })}`;
    }
    static stringifyProducer(producer) {
        return `Producer ${JSON.stringify({
            kind: producer.kind,
            roomId: producer.roomId,
            clientId: producer.clientId,
            userId: producer.userId,
            mediaType: producer.mediaType,
        })}`;
    }
}
exports.default = Logger;
//# sourceMappingURL=Logger.js.map