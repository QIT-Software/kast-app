import { types } from 'mediasoup';
import IMediasoupInternal from './IMediasoupInternal';
import { BaseEntity } from 'mediasoup/BaseEntity';
export default class Producer extends BaseEntity {
    private readonly instance;
    constructor(mediasoup: IMediasoupInternal, instance: types.Producer);
    get roomId(): any;
    get id(): string;
    get kind(): import("../entities/Mediasoup").MediaKind;
    get appData(): any;
    get rtpParameters(): types.RtpParameters;
    close(): void;
    pause(): Promise<void>;
    resume(): Promise<void>;
    get clientId(): any;
    get userId(): any;
    get mediaType(): any;
}
