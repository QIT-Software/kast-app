import IUserStore from '../../database/stores/user/IUserStore';
import IAccountManager from './IAccountManager';
import IResumeStore from 'database/stores/resume/IResumeStore';
import User from 'entities/User';
import { IPdfService } from '../../services/pdf/IPdfService';
export default class AccountManager implements IAccountManager {
    private userStore;
    private resumeStore;
    private pdfService;
    constructor(userStore: IUserStore, resumeStore: IResumeStore, pdfService: IPdfService);
    getMyAccount(myUserId: string): Promise<import("../../entities/Account").default>;
    updateAccount(myUserId: string, user: {
        name: string | undefined;
        country: string | undefined;
        city: string | undefined;
        position: string | undefined;
        telephone: string | undefined;
        dateOfBirth: Date | undefined;
        tags: string[] | undefined;
        skills: string[] | undefined;
        mission: string[] | undefined;
        vision: string[] | undefined;
        interests: string[] | undefined;
        referralCode: string | undefined;
    }): Promise<import("../../entities/Account").default>;
    updateUserImage(myUserId: string, fileId: string): Promise<boolean>;
    updateUserLogoImage(myUserId: string, fileId: string): Promise<boolean>;
    updateUserBackgroundImage(myUserId: string, fileId: string): Promise<boolean>;
    updateUserResumeUrl(myUserId: string, fileId: string): Promise<boolean>;
    getUsers(): Promise<User[]>;
    deleteUsers(userIds: string[]): Promise<void>;
    banUsersTemporary(userIds: string[], untilDate: string): Promise<void>;
    banUsersPermanently(userIds: string[]): Promise<void>;
    restoreUsers(userIds: string[]): Promise<void>;
    referrersByUserId(userId: string): Promise<User[]>;
    getUserById(userId: string): Promise<User>;
    uploadResume(myUserId: string, fileId: string): Promise<boolean>;
}
