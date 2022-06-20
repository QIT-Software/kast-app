export declare enum MediaKind {
    audio = "audio",
    video = "video"
}
export declare enum MediaType {
    userMedia = "userMedia",
    screenShare = "screenShare"
}
export declare enum PlayingType {
    Audio = "audio",
    Video = "video",
    Screen = "screen"
}
export declare type Direction = 'send' | 'receive';
export interface ConsumerOptions {
    id: string;
    producerId: string;
    rtpParameters: object;
    appData: object;
}
export interface RouterOptions {
    rtpCapabilities: object;
}
export interface ProducerOptions {
    id: string;
    kind: MediaKind;
    rtpParameters: object;
    appData: object;
}
export interface TransportOptions {
    id: string;
    iceCandidates: object;
    iceParameters: object;
    dtlsParameters: object;
}
export declare enum Quality {
    Low = "Low",
    High = "High"
}
