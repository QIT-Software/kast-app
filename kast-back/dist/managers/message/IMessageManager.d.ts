import Message from 'entities/Message';
import { Observable } from 'rxjs';
export default abstract class IMessageManager {
    abstract getMessagesByRoom(roomId: string): Promise<Message[]>;
    abstract createMessage(sender: string, roomId: string, body: string, receiverId?: string): Promise<Message>;
    abstract getMessageById(messageId: string): Promise<Message>;
    abstract messageCreatedObservable(): Observable<Message>;
}
