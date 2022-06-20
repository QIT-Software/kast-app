import { Model } from 'mongoose';
import IResumeStore from 'database/stores/resume/IResumeStore';
import Resume from 'entities/Resume';
import ResumeModel from 'database/models/ResumeModel';
export default class ResumeStore extends IResumeStore {
    private resumeModel;
    constructor(resumeModel: Model<ResumeModel>);
    private readonly populateResume;
    createResume(userId: string, resume: Resume, fileName: string): Promise<void>;
    findResumeByUserId(userId: string): Promise<Resume | undefined>;
}
