import { Document } from 'mongoose';
import { AvikastFileType } from 'entities/AvikastFile';
import UserModel from './UserModel';
import FileModel from 'database/models/FileModel';
export declare const AvikastFileSchema: import("@nestjs/mongoose").ModelDefinition;
export default interface AvikastFileModel extends Document {
    name: string;
    type: AvikastFileType;
    user: UserModel | string;
    file: FileModel | string | undefined;
}
export interface CreateAvikastFileModel {
    name: string;
    type: AvikastFileType;
    user: string;
    file: string | undefined;
    parent: string | undefined;
}
