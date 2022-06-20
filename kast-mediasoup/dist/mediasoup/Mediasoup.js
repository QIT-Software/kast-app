"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mediasoup_1 = require("mediasoup");
const IMediasoup_1 = __importDefault(require("./IMediasoup"));
const Worker_1 = __importDefault(require("./Worker"));
const MediasoupConfig_1 = __importDefault(require("./MediasoupConfig"));
const IMediasoupInternal_1 = __importDefault(require("./IMediasoupInternal"));
const Utils_1 = require("./Utils");
const WorkerConfig_1 = __importDefault(require("./WorkerConfig"));
const Router_1 = __importDefault(require("./Router"));
const util_1 = require("util");
const Transport_1 = __importDefault(require("./Transport"));
class Mediasoup extends IMediasoup_1.default {
    constructor(config) {
        super();
        this.config = config;
        this.workers = [];
    }
    async createRouter(appData) {
        const worker = this.findBestWorker();
        const testRouter = this.findRouter(appData);
        if (testRouter)
            throw new Error('Router already created');
        const router = await worker.createRouter(appData);
        return router;
    }
    findBestWorker() {
        const worker = this.workers[0];
        if (!worker)
            throw new Error('worker not exists');
        return worker;
    }
    async createWorker(config) {
        const worker = new Worker_1.default(this, await mediasoup_1.createWorker({
            rtcMinPort: config.rtcMinPort,
            rtcMaxPort: config.rtcMaxPort,
        }));
        this.workers.push(worker);
        return worker;
    }
    findRouter(filter) {
        for (const worker of this.workers) {
            const router = worker.findRouter(filter);
            if (router) {
                return router;
            }
        }
        return undefined;
    }
    findWorker(roomId) {
        let worker;
        this.workers.find((element) => {
            worker = element.getRouters.find((router) => {
                return router.roomId === roomId;
            });
        });
        if (!worker)
            throw new Error('worker not exists');
        return worker;
    }
    getConfig() {
        return this.config;
    }
    getArray() {
        return this.workers;
    }
    closeRouter(router) {
        const worker = this.findWorker(router.roomId);
        if (!worker)
            throw new Error('Worker not found');
        worker.closeRouter(router);
    }
    removeTransport(roomId, transport) {
        const worker = this.findWorker(roomId);
        if (!worker)
            throw new Error('Worker not found');
        const router = worker === null || worker === void 0 ? void 0 : worker.findRouter({ roomId });
        if (!router)
            throw new Error('removeTransport: Worker not found');
        router.removeTransport(transport);
        if (!worker)
            throw new Error('Worker not found');
        util_1.log('transport has been removed');
        worker.closeRouter(router);
    }
}
exports.default = Mediasoup;
//# sourceMappingURL=Mediasoup.js.map