import { MediaKind, MediaType, ProducerOptions } from 'entities/Mediasoup';
export default class ParticipantTrackOptions {
    constructor(enabled: boolean, muted: boolean, clientId: string | undefined, userId: string | undefined, producerOptions: ProducerOptions | undefined, mediaKind: MediaKind | undefined, mediaType: MediaType | undefined);
    enabled: boolean;
    muted: boolean;
    clientId: string | undefined;
    userId: string | undefined;
    producerOptions: ProducerOptions | undefined;
    mediaKind: MediaKind | undefined;
    mediaType: MediaType | undefined;
}
