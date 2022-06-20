import { types } from 'mediasoup';
import IMediasoupInternal from './IMediasoupInternal';
import Producer from './Producer';
import Consumer from './Consumer';
import { Filter } from 'mediasoup/Utils';
import { MediaKind } from 'entities/Mediasoup';
import Transport from 'mediasoup/Transport';
import Router from 'mediasoup/Router';
export default class PlainTransport extends Transport {
    readonly mediasoup: IMediasoupInternal;
    readonly router: Router;
    private readonly instance;
    constructor(mediasoup: IMediasoupInternal, router: Router, instance: types.PlainTransport);
    get roomId(): any;
    get id(): string;
    get appData(): any;
    get getProducers(): Producer[];
    createProducer(transportId: string, rtpParameters: types.RtpParameters, mediaKind: MediaKind, appData: object): Promise<Producer>;
    createConsumer(producerId: string, rtpCapabilities: types.RtpCapabilities, appData: object): Promise<Consumer>;
    findProducer(filter: Filter): Producer | undefined;
    findConsumer(filter: Filter): Consumer | undefined;
    connect(ip?: string, port?: number, rtcpPort?: number): Promise<void>;
    get transport(): types.PlainTransport;
}
