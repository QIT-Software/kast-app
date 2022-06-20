import User from './User';
import { MediaKind, MediaType, ProducerOptions } from 'entities/Mediasoup';
export declare enum ParticipantRole {
    Owner = "Owner",
    Participant = "Participant"
}
export interface ParticipantMedia {
    userName: string;
    audio: ParticipantTrackOptions;
    video: ParticipantTrackOptions;
    screen: ParticipantTrackOptions;
}
export declare type ParticipantTrackOptions = {
    enabled: boolean;
    muted: boolean;
    clientId: string | undefined;
    userId: string | undefined;
    producerOptions: ProducerOptions | undefined;
    mediaKind: MediaKind | undefined;
    mediaType: MediaType | undefined;
};
export default interface Participant {
    id: string;
    user: User;
    role: ParticipantRole;
    media: ParticipantMedia;
    webinarOptions: WebinarOptions | undefined;
    raiseHand: boolean | undefined;
    kicked: boolean;
    muted: boolean;
}
export interface WebinarOwner {
    id: string;
    user: User;
    role: ParticipantRole;
    media: ParticipantMedia;
    webinarOptions: WebinarOptions;
}
export interface WebinarOptions {
    viewMode: ViewModeEnum;
    viewModeScale: ViewModeScale;
}
export declare enum ViewModeEnum {
    CameraAndScreen = "CameraAndScreen",
    CameraMain = "CameraMain",
    ScreenMain = "ScreenMain",
    None = "None"
}
export declare enum ViewModeScale {
    oneX = "1x",
    twoX = "2x",
    threeX = "3x"
}
