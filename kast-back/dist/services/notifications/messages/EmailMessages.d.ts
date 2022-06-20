import EmailMessage from 'services/emailSender/EmailMessage';
declare type Context = {
    text?: string;
    userName?: string;
    newPassword?: string;
};
export default interface NewPasswordMessage extends EmailMessage<Context> {
}
export interface SuccessRegistrationMessage extends EmailMessage<Context> {
}
export declare function createNewPasswordMessage(newPassword: string): NewPasswordMessage;
export declare function createSuccessRegistrationMessage(userName: string): SuccessRegistrationMessage;
export {};
