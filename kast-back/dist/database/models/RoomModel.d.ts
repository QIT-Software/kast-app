import { Document } from 'mongoose';
import UserModel from './UserModel';
import { RoomType } from 'entities/Room';
import Participant from 'database/entities/Participant';
export declare const RoomSchema: import("@nestjs/mongoose").ModelDefinition;
export default interface RoomModel extends Document {
    name: string;
    closed: undefined | Date;
    type: RoomType;
    user: UserModel | string;
    passwordProtected: boolean;
    password: string | undefined;
    inviteLink: string;
    recordingId: string | undefined;
    participants: Participant[];
}
export interface CreateRoomModel {
    name: string;
    closed: undefined | Date;
    type: RoomType;
    user: string;
    passwordProtected: boolean;
    password: string | undefined;
    inviteLink: string;
}
export interface WebinarOptions {
    webinarOwner: string;
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
