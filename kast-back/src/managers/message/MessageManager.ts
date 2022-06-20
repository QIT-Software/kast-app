import {Injectable} from '@nestjs/common';
import IMessageManager from './IMessageManager';
import IMessageStore from '../../database/stores/message/IMessageStore';
import {mapMessageFromDB, mapMessagesFromDB} from 'database/entities/Mappers';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import Message from 'entities/Message';

@Injectable()
export default class MessageManager extends IMessageManager {
  constructor(private readonly messageStore: IMessageStore) {
    super();
  }

  async getMessagesByRoom(roomId: string) {
    const message = await this.messageStore.getMessagesByRoom(roomId);
    if (!message) throw new Error("Message's array is empty");
    return mapMessagesFromDB(message);
  }

  async getMessageById(messageId: string) {
    const message = await this.messageStore.getMessageById(messageId);
    if (!message) {
      throw new Error(`Message with id: ${messageId} does not exist`);
    }
    return mapMessageFromDB(message);
  }

  async createMessage(sender: string, roomId: string, body: string, receiverId?: string) {
    const message = {sender, roomId, body, receiverId};
    return mapMessageFromDB(await this.messageStore.createMessage(message));
  }

  messageCreatedObservable(): Observable<Message> {
    return this.messageStore.watchMessageCreated().pipe(map(mapMessageFromDB));
  }
}
