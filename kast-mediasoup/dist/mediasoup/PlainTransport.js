"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Producer_1 = __importDefault(require("./Producer"));
const Consumer_1 = __importDefault(require("./Consumer"));
const Utils_1 = require("./Utils");
const Mediasoup_1 = require("../entities/Mediasoup");
const Transport_1 = __importDefault(require("./Transport"));
const Router_1 = __importDefault(require("./Router"));
class PlainTransport extends Transport_1.default {
    constructor(mediasoup, router, instance) {
        super(mediasoup, instance);
        this.mediasoup = mediasoup;
        this.router = router;
        this.instance = instance;
    }
    get roomId() {
        return this.instance.appData.roomId;
    }
    get id() {
        return this.instance.id;
    }
    get appData() {
        return this.instance.appData;
    }
    get getProducers() {
        return this.producers;
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
    findProducer(filter) {
        for (const producer of this.producers) {
            if (Utils_1.matchAppData(producer.appData, filter))
                return producer;
        }
        return undefined;
    }
    findConsumer(filter) {
        for (const consumer of this.consumers) {
            if (Utils_1.matchAppData(consumer.appData, filter))
                return consumer;
        }
        return undefined;
    }
    async connect(ip, port, rtcpPort) {
        return this.instance.connect({ ip, port, rtcpPort });
    }
    get transport() {
        return this.instance;
    }
}
exports.default = PlainTransport;
//# sourceMappingURL=PlainTransport.js.map