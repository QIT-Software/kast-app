import INotificationService from './INotificationService';
import { IEmailSenderService } from 'services/emailSender/IEmailSenderService';
import IUserStore from 'database/stores/user/IUserStore';
import ISessionStore from 'database/stores/session/ISessionStore';
export default class NotificationService extends INotificationService {
    private readonly userStore;
    private readonly sessionStore;
    private readonly mailerService;
    constructor(userStore: IUserStore, sessionStore: ISessionStore, mailerService: IEmailSenderService);
    sendRegistrationMessage(userName: string, email: string): Promise<void>;
    sendNewPassword(userId: string, password: string): Promise<void>;
}
