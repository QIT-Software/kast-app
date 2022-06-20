import { MediaKind, MediaType } from 'entities/Mediasoup';
export default class MediaAttributesOptions {
    constructor(kind: MediaKind, mediaType: MediaType, direction: string);
    kind: MediaKind;
    mediaType: MediaType;
    direction: string;
}
