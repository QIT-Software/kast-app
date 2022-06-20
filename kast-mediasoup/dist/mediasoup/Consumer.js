"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEntity_1 = require("./BaseEntity");
class Consumer extends BaseEntity_1.BaseEntity {
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
    get producerId() {
        return this.instance.producerId;
    }
    get rtpParameters() {
        return this.instance.rtpParameters;
    }
    get appData() {
        return this.instance.appData;
    }
    close() {
        this.instance.close();
    }
}
exports.default = Consumer;
//# sourceMappingURL=Consumer.js.map