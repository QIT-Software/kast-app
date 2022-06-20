import { Document } from 'mongoose';
import UserModel from './UserModel';
export declare const BookmarkSchema: import("@nestjs/mongoose").ModelDefinition;
export default interface BookmarkModel extends Document {
    id: string;
    date: Date;
    topic: string;
    text: string;
    user: UserModel | string;
}
export interface CreateModel {
    id: string;
    date: Date;
    topic: string;
    text: string;
    userId: string;
}
