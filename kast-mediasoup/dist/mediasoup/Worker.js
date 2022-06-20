"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("./Router"));
const IMediasoupInternal_1 = __importDefault(require("./IMediasoupInternal"));
const BaseEntity_1 = require("./BaseEntity");
const Utils_1 = require("./Utils");
class Worker extends BaseEntity_1.BaseEntity {
    constructor(mediasoup, instance) {
        super();
        this.mediasoup = mediasoup;
        this.instance = instance;
        this._routers = [];
    }
    async createRouter(appData) {
        const config = this.mediasoup.getConfig();
        const { mediaCodecs } = config;
        const router = new Router_1.default(this.mediasoup, await this.instance.createRouter({ mediaCodecs, appData }));
        this._routers.push(router);
        return router;
    }
    get routers() {
        return [...this._routers];
    }
    findRouter(filter) {
        return this.routers.find((router) => router.matchAppData(filter));
    }
    get appData() {
        return this.instance.appData;
    }
    get getRouters() {
        return this._routers;
    }
    closeRouter(router) {
        router.close();
        Utils_1.removeFromArray(this.routers, router);
    }
}
exports.default = Worker;
//# sourceMappingURL=Worker.js.map