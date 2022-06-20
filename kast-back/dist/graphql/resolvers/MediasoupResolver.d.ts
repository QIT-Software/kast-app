import TransportOptions from '../entities/mediasoup/TransportOptions';
import ConsumerOptions from '../entities/mediasoup/ConsumerOptions';
import RouterOptions from 'graphql/entities/mediasoup/RouterOptions';
import ProducerOptions from 'graphql/entities/mediasoup/ProducerOptions';
import IMediasoupManager from 'managers/mediasoup/IMediasoupManager';
import { MediaKind, MediaType, PlayingType, Quality } from 'entities/Mediasoup';
import SessionInfo from 'entities/SessionInfo';
import IRoomManager from 'managers/room/IRoomManager';
export default class MediasoupResolver {
    private readonly mediasoupManager;
    private readonly roomManager;
    constructor(mediasoupManager: IMediasoupManager, roomManager: IRoomManager);
    createTransport(session: SessionInfo, roomId: string, direction: string, clientId: string): Promise<TransportOptions>;
    connectTransport(session: SessionInfo, roomId: string, dtlsParameters: object, direction: string, clientId: string, quality: Quality): Promise<boolean>;
    createProducer(session: SessionInfo, transportId: string, roomId: string, clientId: string, rtpParameters: object, mediaKind: MediaKind, mediaType: MediaType): Promise<ProducerOptions>;
    createConsumer(session: SessionInfo, producerId: string, roomId: string, rtpCapabilities: object, clientId: string): Promise<ConsumerOptions>;
    getRouter(session: SessionInfo, roomId: string): Promise<RouterOptions>;
    getProducer(session: SessionInfo, roomId: string): Promise<ProducerOptions>;
    getProducers(roomId: string): Promise<ProducerOptions[]>;
    startRecording(roomId: string, producerId: string | undefined, audioProducerId: string | undefined, session: SessionInfo): Promise<boolean>;
    stopRecording(roomId: string | undefined, producerId: string | undefined, audioProducerId: string | undefined, session: SessionInfo): Promise<boolean>;
    playPauseMedia(media: PlayingType, status: boolean, roomId: string, session: SessionInfo): Promise<void>;
}
