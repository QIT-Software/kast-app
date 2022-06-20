"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebRtcTransport_1 = __importDefault(require("./WebRtcTransport"));
const BaseEntity_1 = require("./BaseEntity");
const Utils_1 = require("./Utils");
const PlainTransport_1 = __importDefault(require("./PlainTransport"));
const Transport_1 = __importDefault(require("./Transport"));
class Router extends BaseEntity_1.BaseEntity {
    constructor(mediasoup, instance) {
        super();
        this.mediasoup = mediasoup;
        this.instance = instance;
        this.transports = [];
    }
    get rtpCapabilities() {
        return this.instance.rtpCapabilities;
    }
    async createWebRtcTransport(appData) {
        const config = this.mediasoup.getConfig();
        const transport = new WebRtcTransport_1.default(this.mediasoup, await this.instance.createWebRtcTransport({
            enableUdp: true,
            enableTcp: true,
            preferUdp: true,
            listenIps: config.listenIps,
            initialAvailableOutgoingBitrate: config.initialAvailableOutgoingBitrate,
            appData,
        }));
        this.transports.push(transport);
        return transport;
    }
    async createPlainTransport(appData, configService) {
        const transport = new PlainTransport_1.default(this.mediasoup, this, await this.instance.createPlainTransport({
            listenIp: configService.get('LISTEN_IP'),
            comedia: false,
            rtcpMux: false,
            appData,
        }));
        this.transports.push(transport);
        return transport;
    }
    get id() {
        return this.instance.id;
    }
    get roomId() {
        return this.instance.appData.roomId;
    }
    getTransports() {
        return this.transports;
    }
    findTransport(filter) {
        for (const transport of this.transports) {
            if (transport.matchAppData(filter)) {
                return transport;
            }
        }
        return undefined;
    }
    findTransportsByFilter(filter) {
        const transports = [];
        for (const transport of this.transports) {
            if (transport.matchAppData(filter)) {
                transports.push(transport);
            }
        }
        return transports;
    }
    findTransports(filter) {
        return this.transports.filter((t) => t.matchAppData(filter));
    }
    findTransportsById(transportId) {
        return this.transports.filter((t) => t.id === transportId);
    }
    removeTransport(transport) {
        const index = this.transports.findIndex((t) => t.id === transport.id);
        this.transports[index].close();
        this.transports.splice(index, 1);
    }
    get appData() {
        return this.instance.appData;
    }
    leaveRoom(userId) {
        this.transports.forEach((transport) => {
            if (transport.appData) {
                return transport.appData.userId !== userId;
            }
        });
    }
    close() {
        this.transports.forEach((transport) => this.closeTransport(transport));
        this.instance.close();
    }
    closeTransport(transport) {
        transport.close();
        Utils_1.removeFromArray(this.transports, transport);
    }
}
exports.default = Router;
//# sourceMappingURL=Router.js.map