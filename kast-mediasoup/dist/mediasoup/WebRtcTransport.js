"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Producer_1 = __importDefault(require("./Producer"));
const Consumer_1 = __importDefault(require("./Consumer"));
const Mediasoup_1 = require("../entities/Mediasoup");
const Transport_1 = __importDefault(require("./Transport"));
class WebRtcTransport extends Transport_1.default {
    constructor(mediasoup, instance) {
        super(mediasoup, instance);
        this.instance = instance;
    }
    get iceCandidates() {
        return this.instance.iceCandidates;
    }
    get iceParameters() {
        return this.instance.iceParameters;
    }
    get dtlsParameters() {
        return this.instance.dtlsParameters;
    }
    async createProducer(transportId, rtpParameters, mediaKind, appData) {
        const producer = new Producer_1.default(this.mediasoup, await this.instance.produce({
            kind: mediaKind,
            rtpParameters,
            appData,
        }));
        this.pushProducer(producer);
        return producer;
    }
    async createConsumer(producerId, rtpCapabilities, appData) {
        const consumer = new Consumer_1.default(this.mediasoup, await this.instance.consume({
            producerId,
            rtpCapabilities,
            appData,
        }));
        this.pushConsumer(consumer);
        return consumer;
    }
    get dtlsState() {
        return this.instance.dtlsState;
    }
    get userId() {
        return this.appData.userId;
    }
    get direction() {
        return this.appData.direction;
    }
    get clientId() {
        return this.appData.clientId;
    }
}
exports.default = WebRtcTransport;
//# sourceMappingURL=WebRtcTransport.js.map