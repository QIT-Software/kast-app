"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("./Utils");
const BaseEntity_1 = require("./BaseEntity");
class Transport extends BaseEntity_1.BaseEntity {
    constructor(mediasoup, baseInstance) {
        super();
        this.mediasoup = mediasoup;
        this.baseInstance = baseInstance;
        this.producers = [];
        this.consumers = [];
    }
    get roomId() {
        return this.baseInstance.appData.roomId;
    }
    get id() {
        return this.baseInstance.id;
    }
    get appData() {
        return this.baseInstance.appData;
    }
    get getProducers() {
        return this.producers;
    }
    get getConsumers() {
        return this.consumers;
    }
    async connectToRouter(dtlsParameters) {
        await this.baseInstance.connect({ dtlsParameters });
    }
    findProducer(filter) {
        for (const producer of this.producers) {
            if (Utils_1.matchAppData(producer.appData, filter))
                return producer;
        }
        return undefined;
    }
    findProducerById(producerId) {
        for (const producer of this.producers) {
            if (producer.id === producerId)
                return producer;
        }
        return undefined;
    }
    findProducers(filter) {
        return this.producers.filter((producer) => producer.matchAppData(filter));
    }
    findConsumer(filter) {
        for (const consumer of this.consumers) {
            if (Utils_1.matchAppData(consumer.appData, filter))
                return consumer;
        }
        return undefined;
    }
    close() {
        this.producers.forEach((producer) => this.closeProducer(producer));
        this.consumers.forEach((consumer) => this.closeConsumer(consumer));
        this.baseInstance.close();
    }
    pushProducer(producer) {
        this.producers.push(producer);
    }
    pushConsumer(consumer) {
        this.consumers.push(consumer);
    }
    closeProducer(producer) {
        producer.close();
        Utils_1.removeFromArray(this.producers, producer);
    }
    closeConsumer(consumer) {
        consumer.close();
        Utils_1.removeFromArray(this.consumers, consumer);
    }
    async setMaxIncomingBitrate(bitrate) {
        console.log('bitarate changed to ', bitrate);
        await this.baseInstance.setMaxIncomingBitrate(bitrate);
    }
}
exports.default = Transport;
//# sourceMappingURL=Transport.js.map