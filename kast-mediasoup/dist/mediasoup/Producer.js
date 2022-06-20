"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEntity_1 = require("./BaseEntity");
class Producer extends BaseEntity_1.BaseEntity {
    constructor(mediasoup, instance) {
        super();
        this.instance = instance;
        this.instance = instance;
    }
    get roomId() {
        return this.instance.appData.roomId;
    }
    get id() {
        return this.instance.id;
    }
    get kind() {
        return this.instance.kind;
    }
    get appData() {
        return this.instance.appData;
    }
    get rtpParameters() {
        return this.instance.rtpParameters;
    }
    close() {
        return this.instance.close();
    }
    pause() {
        if (this.instance.paused) {
            return this.instance.resume();
        }
        return this.instance.pause();
    }
    resume() {
        return this.instance.resume();
    }
    get clientId() {
        return this.instance.appData.clientId;
    }
    get userId() {
        return this.instance.appData.userId;
    }
    get mediaType() {
        return this.instance.appData.mediaType;
    }
}
exports.default = Producer;
//# sourceMappingURL=Producer.js.map