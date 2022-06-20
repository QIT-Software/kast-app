import { types } from 'mediasoup';
import IMediasoupInternal from './IMediasoupInternal';
import { BaseEntity } from 'mediasoup/BaseEntity';
export default class Consumer extends BaseEntity {
    private readonly instance;
    constructor(mediasoup: IMediasoupInternal, instance: types.Consumer);
    get roomId(): any;
    get id(): string;
    get producerId(): string;
    get rtpParameters(): types.RtpParameters;
    get appData(): any;
    close(): void;
}
