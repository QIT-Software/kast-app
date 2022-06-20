import { Document } from 'mongoose';
import UserModel from './UserModel';
export declare const LocalLoginSchema: import("@nestjs/mongoose").ModelDefinition;
export default interface LocalLoginModel extends Document {
    user?: UserModel | string;
    email: string;
    passwordHash: string;
}
export interface CreateLocalLoginModel {
    user: string;
    email: string;
    passwordHash: string;
}
