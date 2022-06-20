import IMediasoupService from './IMediasoupService';
import { ClientProxy } from '@nestjs/microservices';
import { Direction, MediaKind, MediaType, Quality } from 'entities/Mediasoup';
import { MuteAction } from 'entities/Room';
export default class MediasoupService extends IMediasoupService {
    private readonly mediasoupClient;
    constructor(mediasoupClient: ClientProxy);
    createRouter(roomId: string): Promise<{
        rtpCapabilities: object;
    }>;
    createTransport(roomId: string, userId: string, direction: Direction, clientId: string): Promise<{
        id: string;
        iceCandidates: object;
        iceParameters: object;
        dtlsParameters: object;
    }>;
    connectTransport(roomId: string, dtlsParameters: object, direction: string, clientId: string, quality: Quality): Promise<void>;
    createProducer(roomId: string, transportId: string, clientId: string, userId: string, rtpParameters: object, mediaType: MediaType, mediaKind: MediaKind): Promise<{
        id: string;
        kind: MediaKind;
        rtpParameters: object;
        appData: object;
    }>;
    createConsumer(roomId: string, producerId: string, rtpCapabilities: object, clientId: string, userId: string): Promise<{
        id: string;
        producerId: string;
        rtpParameters: object;
        appData: object;
    }>;
    getRouter(roomId: string): Promise<{
        rtpCapabilities: object;
    }>;
    getProducer(roomId: string, userId: string): Promise<{
        id: string;
        kind: MediaKind;
        rtpParameters: object;
        appData: object;
    }>;
    getProducers(roomId: string): Promise<import("../../entities/Mediasoup").ProducerOptions[]>;
    startRecording(roomId: string, userId: string, recordId: string, producerId?: string, audioProducerId?: string): Promise<boolean>;
    stopRecording(roomId: string, userId: string, producerId?: string, audioProducerId?: string): Promise<boolean>;
    leaveRoom(roomId: string, userId: string): Promise<boolean>;
    closeRoom(roomId: string): Promise<boolean>;
    mute(action: MuteAction, roomId: string, userId: string, producerId: string): Promise<boolean>;
    private send;
    private sendAsync;
    private sendAsyncRequired;
}
