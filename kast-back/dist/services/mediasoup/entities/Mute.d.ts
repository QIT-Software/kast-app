import { MuteAction } from 'entities/Room';
export declare type MutePattern = {
    area: 'producer';
    action: 'mute';
};
export interface MuteRequest {
    action: MuteAction;
    userId: string;
    roomId: string;
    producerId: string;
}
export interface MuteResponse {
    response: boolean;
}
