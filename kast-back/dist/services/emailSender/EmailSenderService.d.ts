import { IEmailSenderService } from 'services/emailSender/IEmailSenderService';
import { MailerService } from '@nest-modules/mailer';
import EmailMessage from './EmailMessage';
export declare class EmailSenderService implements IEmailSenderService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendMessage<TContext>(email: string, message: EmailMessage<TContext>): Promise<void>;
}
