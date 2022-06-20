import IMessageStore from './IMessageStore';
import { Model } from 'mongoose';
import MessageModel from '../../models/MessageModel';
import { Subject } from 'rxjs';
import Message from 'database/entities/Message';
export default class MessageStore extends IMessageStore {
    private messageModel;
    constructor(messageModel: Model<MessageModel>);
    private readonly populateMessage;
    createMessage(message: {
        sender: string;
        roomId: string;
        body: string;
        receiverId?: string;
    }): Promise<Message>;
    getMessagesByRoom(roomId: string): Promise<Message[]>;
    getMessageById(messageId: unknown): Promise<Message | null>;
    private changeStream;
    private newMessageSubject;
    private watchInternal;
    private onChangeEventReceived;
    watchMessageCreated(): Subject<Message>;
}
