import { Document } from 'mongoose';
import AppType from '../../entities/AppType';
import { Platform } from '../../entities/Platform';
import UserModel from './UserModel';
export declare const SessionSchema: import("@nestjs/mongoose").ModelDefinition;
export default interface SessionModel extends Document {
    token: string;
    refreshToken: string;
    user?: UserModel;
    appType: AppType;
    platform: Platform;
    firebaseRegistrationId?: string;
}
export interface CreateSessionModel {
    token: string;
    refreshToken: string;
    user: string;
    appType: AppType;
    platform: Platform;
    firebaseRegistrationId?: string;
}
