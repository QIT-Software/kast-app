import { Document } from 'mongoose';
import UserModel from './UserModel';
import { ParticipantMedia, ParticipantRole, ParticipantTrackOptions } from 'entities/Participant';
import RoomModel, { WebinarOptions } from './RoomModel';
export declare const ParticipantSchema: import("@nestjs/mongoose").ModelDefinition;
export default interface ParticipantModel extends Document {
    user: UserModel | string;
    room: RoomModel | string;
    role: ParticipantRole;
    webinarOptions?: WebinarOptions | undefined;
    media: {
        userName: string;
        audio: ParticipantTrackOptions;
        video: ParticipantTrackOptions;
        screen: ParticipantTrackOptions;
    };
    raiseHand?: boolean;
    kicked: boolean;
    muted: boolean;
}
export interface CreateParticipantModel {
    user: string;
    room: string;
    role: ParticipantRole;
    media: ParticipantMedia;
    raiseHand: boolean;
    kicked: boolean;
    muted: boolean;
}
