import { Document } from 'mongoose';
import UserModel from './UserModel';
export declare const MessageSchema: import("@nestjs/mongoose").ModelDefinition;
export default interface MessageModel extends Document {
    sender: UserModel;
    roomId: string;
    body: string;
    date: Date;
    receiverId: string | undefined;
}
export interface CreateMessageModel {
    sender: string;
    roomId: string;
    body: string;
    receiverId: string | undefined;
}
