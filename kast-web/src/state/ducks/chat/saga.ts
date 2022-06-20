import {all, put, takeEvery} from 'redux-saga/effects';
import types from './types';
import {Action} from 'redux-actions';
import actions, {
  MessageAdded,
  CreateMessage,
  CreateMessageCompleted,
  FetchMessages,
} from './actions';
import Message from 'entities/Message';
import {AvikastApi as Api} from 'api';
import {FetchBookmarksCompleted} from '../bookmarks/actions';
import {alertActions} from '../alert';
import {AuthInfoKeeper} from 'auth';

function* messageAdded({payload, error}: Action<MessageAdded>) {
  if (error) {
    yield put(alertActions.showError(error));
  }

  try {
    const user = AuthInfoKeeper.getUser();
    if (!user) throw new Error('Resume is not logged in');
    const isMe = payload.id === user.id;
    yield put(actions.addMessage({...payload, isMe}));
  } catch (e) {
    yield put(actions.fetchMessagesCompleted(e));
  }
}

function* fetchMessages({payload}: Action<FetchMessages>) {
  try {
    const user = AuthInfoKeeper.getUser();
    if (!user) throw new Error('Resume is not logged in');
    const {roomId} = payload;
    const messages: Message[] = yield Api.getMessages(roomId);
    yield put(
      actions.fetchMessagesCompleted({
        messages: messages.map((message) => {
          const isMe = message.id === user.id;
          return {...message, isMe};
        }),
      }),
    );
  } catch (e) {
    yield put(actions.fetchMessagesCompleted(e));
  }
}

function* fetchMessagesCompleted({error}: Action<FetchBookmarksCompleted>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* createMessage({payload}: Action<CreateMessage>) {
  try {
    yield Api.createMessage(payload.roomId, payload.messageBody, undefined);
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* createMessageCompleted({error}: Action<CreateMessageCompleted>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_MESSAGES, fetchMessages),
    takeEvery(types.FETCH_MESSAGES_COMPLETED, fetchMessagesCompleted),
    takeEvery(types.CREATE_MESSAGE, createMessage),
    takeEvery(types.CREATE_MESSAGE_COMPLETED, createMessageCompleted),
    takeEvery(types.MESSAGE_ADDED, messageAdded),
  ]);
}
