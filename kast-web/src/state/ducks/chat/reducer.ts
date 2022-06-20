import {handleActions, ReducerNextThrow} from 'redux-actions';
import {empty, failed, success} from '../../entities/LoadableContainer';
import types from './types';
import {ChatReducerState} from '../../entities/State';
import {FetchMessagesCompleted, AddMessage} from './actions';

const fetchMessagesCompleted: ReducerNextThrow<
  ChatReducerState,
  FetchMessagesCompleted
> = {
  next: (state, {payload}) => ({...state, ...success({data: payload.messages})}),
  throw: (_, {payload}) => failed(payload),
};

const addMessage: ReducerNextThrow<ChatReducerState, AddMessage> = {
  next: (state, {payload}) => {
    if (!state.isSuccess) return state;

    if (state.data.some((message) => message.id === payload.id)) return state;

    return success({data: [...state.data, payload]});
  },
  throw: (_, {payload}) => failed(payload),
};

export default handleActions<ChatReducerState, any>(
  {
    // [types.FETCH_MESSAGES]: (state) => loading(state),
    [types.FETCH_MESSAGES_COMPLETED]: fetchMessagesCompleted,
    // [types.CREATE_MESSAGE]: (state) => loading(state),
    [types.ADD_MESSAGE]: addMessage,
  },
  empty(),
);
