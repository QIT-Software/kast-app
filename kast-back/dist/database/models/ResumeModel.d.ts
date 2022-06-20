import { Document } from 'mongoose';
import UserModel from 'database/models/UserModel';
export declare const ResumeSchema: import("@nestjs/mongoose").ModelDefinition;
export default interface ResumeModel extends Document {
    summary: string;
    experience: string;
    education: string;
    awards: string;
    user: UserModel | string;
    fileName: string;
}
export interface CreateResumeModel {
    summary: string;
    experience: string;
    education: string;
    awards: string;
    userId: string;
    fileName: string;
}
