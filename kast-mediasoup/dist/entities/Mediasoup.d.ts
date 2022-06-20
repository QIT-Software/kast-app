export declare type MediaKind = 'audio' | 'video';
export declare type MediaType = 'camera' | 'screen';
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
export declare enum MuteAction {
    Mute = "Mute",
    UnMute = "unMute"
}
export declare enum Quality {
    Low = "Low",
    High = "High"
}
