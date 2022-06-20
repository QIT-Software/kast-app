import { Document } from 'mongoose';
export declare const FileSchema: import("@nestjs/mongoose").ModelDefinition;
export default interface FileModel extends Document {
    mediaLink: string;
    name: string;
    mimeType: string;
}
export interface CreateFileModel {
    mediaLink: string;
    name: string;
    mimeType: string;
}
