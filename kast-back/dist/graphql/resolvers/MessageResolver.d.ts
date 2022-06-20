import Message from '../entities/message/Message';
import IMessageManager from '../../managers/message/IMessageManager';
import { PubSubEngine } from 'graphql-subscriptions';
import SessionInfo from 'entities/SessionInfo';
export default class MessageResolver {
    private readonly chatManager;
    private readonly pubSub;
    constructor(chatManager: IMessageManager, pubSub: PubSubEngine);
    messagesByRoom(roomId: string): Promise<Message[]>;
    messageById(messageId: string): Promise<Message>;
    createMessage(session: SessionInfo, roomId: string, messageBody: string, receiverId: string): Promise<import("../../entities/Message").default>;
    private messageCreatedSubscription;
    messageAdded(_roomId: string, _userId: string): Promise<AsyncIterator<unknown, any, undefined>>;
}
