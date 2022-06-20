import IResumeStore from '../../database/stores/resume/IResumeStore';
import { IPdfService } from '../../services/pdf/IPdfService';
import Resume from '../../entities/Resume';
import IUserStore from '../../database/stores/user/IUserStore';
import IResumeManager from './IResumeManager';
import IFileStore from '../../database/stores/file/IFileStore';
import IAvikastFileStore from '../../database/stores/avikastFile/IAvikastFileStore';
export default class ResumeManager extends IResumeManager {
    private readonly userStore;
    private readonly resumeStore;
    private readonly pdfService;
    private readonly fileStore;
    private readonly avikastFileStore;
    constructor(userStore: IUserStore, resumeStore: IResumeStore, pdfService: IPdfService, fileStore: IFileStore, avikastFileStore: IAvikastFileStore);
    createResume(userId: string, resume: Resume): Promise<void>;
    getResume(userId: string): Promise<Resume | undefined>;
    getResumeLink(userId: string): Promise<string>;
}
