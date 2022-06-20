import { types } from 'mediasoup';
import IMediasoupInternal from './IMediasoupInternal';
import WebRtcTransport from './WebRtcTransport';
import { BaseEntity } from 'mediasoup/BaseEntity';
import { Filter } from 'mediasoup/Utils';
import PlainRtpTransport from './PlainTransport';
import { IConfigService } from '@spryrocks/config-node';
import Transport from 'mediasoup/Transport';
export default class Router extends BaseEntity {
    private readonly mediasoup;
    private readonly instance;
    private readonly transports;
    constructor(mediasoup: IMediasoupInternal, instance: types.Router);
    get rtpCapabilities(): types.RtpCapabilities;
    createWebRtcTransport(appData: Filter): Promise<WebRtcTransport>;
    createPlainTransport(appData: Filter, configService: IConfigService): Promise<PlainRtpTransport>;
    get id(): string;
    get roomId(): any;
    getTransports(): Transport[];
    findTransport(filter: Filter): Transport | undefined;
    findTransportsByFilter(filter: Filter): Transport[];
    findTransports(filter: Filter): Transport[];
    findTransportsById(transportId: string): Transport[];
    removeTransport(transport: Transport): void;
    get appData(): any;
    leaveRoom(userId: string): void;
    close(): void;
    closeTransport(transport: Transport): void;
}
