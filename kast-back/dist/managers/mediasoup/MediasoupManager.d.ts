import IMediasoupManager from './IMediasoupManager';
import IMediasoupService from 'services/mediasoup/IMediasoupService';
import { Direction, MediaKind, MediaType, Quality } from 'entities/Mediasoup';
import IRoomStore from 'database/stores/room/IRoomStore';
import IFileStore from 'database/stores/file/IFileStore';
import IRecordStore from 'database/stores/record/IRecordStore';
export default class MediasoupManager extends IMediasoupManager {
    private readonly mediasoupService;
    private readonly roomStore;
    private readonly fileStore;
    private readonly recordStore;
    constructor(mediasoupService: IMediasoupService, roomStore: IRoomStore, fileStore: IFileStore, recordStore: IRecordStore);
    createTransport(roomId: string, userId: string, direction: Direction, clientId: string): Promise<import("../../entities/Mediasoup").TransportOptions>;
    connectTransport(roomId: string, dtlsParameters: object, direction: Direction, clientId: string, quality: Quality): Promise<void>;
    createProducer(roomId: string, transportId: string, clientId: string, userId: string, rtpParameters: object, mediaKind: MediaKind, mediaType: MediaType): Promise<import("../../entities/Mediasoup").ProducerOptions>;
    createConsumer(roomId: string, producerId: string, rtpCapabilities: object, clientId: string, userId: string): Promise<import("../../entities/Mediasoup").ConsumerOptions>;
    getRouter(roomId: string): Promise<import("../../entities/Mediasoup").RouterOptions>;
    getProducer(roomId: string, userId: string): Promise<import("../../entities/Mediasoup").ProducerOptions>;
    getProducers(roomId: string): Promise<import("../../entities/Mediasoup").ProducerOptions[]>;
    startRecording(roomId: string, userId: string, producerId?: string, audioProducerId?: string): Promise<boolean>;
    stopRecording(userId: string, roomId: string): Promise<boolean>;
}
