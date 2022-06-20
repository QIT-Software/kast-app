import SessionInfo from 'entities/SessionInfo';
import { ResumeInput } from '../entities/resume/Resume';
import IResumeManager from '../../managers/resume/IResumeManager';
export declare class ResumeResolver {
    private readonly resumeManager;
    constructor(resumeManager: IResumeManager);
    saveResume({ userId }: SessionInfo, resume: ResumeInput): Promise<Boolean>;
    getResume({ userId }: SessionInfo): Promise<import("../../entities/Resume").default | undefined>;
    getResumeLink({ userId }: SessionInfo): Promise<string | undefined>;
}
