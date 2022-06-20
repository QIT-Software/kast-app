import {createAction} from 'redux-actions';
import types from './types';
import {Message} from 'state/entities/Chat';
import MessageEntity from 'entities/Message';

export type FetchMessages = {roomId: string};
export type FetchMessagesCompleted = {messages: Message[]};
export type CreateMessage = {roomId: string; messageBody: string};
export type CreateMessageCompleted = {message: Message};
export type MessageAdded = MessageEntity;
export type AddMessage = Message;

export default {
  fetchMessages: createAction<FetchMessages>(types.FETCH_MESSAGES),
  fetchMessagesCompleted: createAction<FetchMessagesCompleted>(
    types.FETCH_MESSAGES_COMPLETED,
  ),
  createMessage: createAction<CreateMessage>(types.CREATE_MESSAGE),
  createMessageCompleted: createAction<CreateMessageCompleted>(
    types.CREATE_MESSAGE_COMPLETED,
  ),
  messageAdded: createAction<MessageAdded>(types.MESSAGE_ADDED),
  addMessage: createAction<AddMessage>(types.ADD_MESSAGE),
};
