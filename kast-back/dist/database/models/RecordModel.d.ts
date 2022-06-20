import { Document } from 'mongoose';
import UserModel from './UserModel';
import FileModel from 'database/models/FileModel';
export declare const RecordSchema: import("@nestjs/mongoose").ModelDefinition;
export default interface RecordModel extends Document {
    name: string;
    date: Date;
    time: string;
    user: UserModel | string;
    file: FileModel | string;
}
export interface CreateRecordModel {
    id: string;
    name: string;
    date: Date;
    user: string;
    file: string;
}
