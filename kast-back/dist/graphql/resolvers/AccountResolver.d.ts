import IAccountManager from '../../managers/account/IAccountManager';
import Account from '../entities/account/Account';
import UserUpdateRequest from '../entities/user/UserUpdateRequest';
import SessionInfo from 'entities/SessionInfo';
import User from 'graphql/entities/user/User';
export declare class AccountResolver {
    private readonly accountManager;
    constructor(accountManager: IAccountManager);
    myAccount({ userId }: SessionInfo): Promise<Account>;
    updateMyAccount({ userId }: SessionInfo, userInput: UserUpdateRequest): Promise<Account>;
    updateUserImage({ userId }: SessionInfo, fileId: string): Promise<boolean>;
    updateUserLogoImage({ userId }: SessionInfo, fileId: string): Promise<boolean>;
    updateUserBackgroundImage({ userId }: SessionInfo, fileId: string): Promise<boolean>;
    banUsersTemporary(userIds: string[], untilDate: string): Promise<boolean>;
    banUsersPermanently(userIds: string[]): Promise<boolean>;
    restoreUsers(userIds: string[]): Promise<boolean>;
    users(): Promise<User[]>;
    deleteUsers(userIds: string[]): Promise<Boolean>;
    referrersByUserId(userId: string): Promise<User[]>;
    uploadResume({ userId }: SessionInfo, fileId: string): Promise<boolean>;
    userById(userId: string): Promise<User>;
}
