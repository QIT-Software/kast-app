import { types } from 'mediasoup';
import IMediasoupInternal from './IMediasoupInternal';
import Producer from './Producer';
import Consumer from './Consumer';
import { Filter } from 'mediasoup/Utils';
import { BaseEntity } from 'mediasoup/BaseEntity';
export default abstract class Transport extends BaseEntity {
    protected readonly mediasoup: IMediasoupInternal;
    protected baseInstance: types.Transport;
    readonly producers: Array<Producer>;
    readonly consumers: Array<Consumer>;
    constructor(mediasoup: IMediasoupInternal, baseInstance: types.Transport);
    get roomId(): any;
    get id(): string;
    get appData(): any;
    get getProducers(): Producer[];
    get getConsumers(): Consumer[];
    connectToRouter(dtlsParameters: types.DtlsParameters): Promise<void>;
    findProducer(filter: Filter): Producer | undefined;
    findProducerById(producerId: String): Producer | undefined;
    findProducers(filter: Filter): Producer[];
    findConsumer(filter: Filter): Consumer | undefined;
    close(): void;
    pushProducer(producer: Producer): void;
    pushConsumer(consumer: Consumer): void;
    closeProducer(producer: Producer): void;
    closeConsumer(consumer: Consumer): void;
    setMaxIncomingBitrate(bitrate: number): Promise<void>;
}
