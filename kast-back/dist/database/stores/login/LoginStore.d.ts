import ILoginStore from './ILoginStore';
import User from '../../entities/User';
import { ID } from 'entities/Common';
import { Model } from 'mongoose';
import LocalLoginModel from '../../models/LocalLoginModel';
export default class LoginStore extends ILoginStore {
    private localLoginModel;
    constructor(localLoginModel: Model<LocalLoginModel>);
    private populate;
    createLocalLogin(user: User, email: string, passwordHash: string): Promise<import("../../entities/LocalLogin").default>;
    getLocalLoginByEmail(email: string): Promise<import("../../entities/LocalLogin").default | undefined>;
    getLocalLoginByUser(user: {
        id: ID;
    }): Promise<import("../../entities/LocalLogin").default | undefined>;
    updateLocalLoginPassword(user: {
        id: string;
    }, passwordHash: string): Promise<void>;
    findLocalLoginByEmail(email: string): Promise<import("../../entities/LocalLogin").default | undefined>;
}
