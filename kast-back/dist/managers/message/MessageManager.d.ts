import IMessageManager from './IMessageManager';
import IMessageStore from '../../database/stores/message/IMessageStore';
import { Observable } from 'rxjs';
import Message from 'entities/Message';
export default class MessageManager extends IMessageManager {
    private readonly messageStore;
    constructor(messageStore: IMessageStore);
    getMessagesByRoom(roomId: string): Promise<Message[]>;
    getMessageById(messageId: string): Promise<Message>;
    createMessage(sender: string, roomId: string, body: string, receiverId?: string): Promise<Message>;
    messageCreatedObservable(): Observable<Message>;
}
