import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {UserReducerState} from 'state/entities/State';
import {empty, failed, loading, success} from 'state/entities/LoadableContainer';
import {FetchUserCompleted} from 'state/ducks/user/actions';

const fetchUserCompleted: ReducerNextThrow<UserReducerState, FetchUserCompleted> = {
  next: (state, {payload}) => ({...state, ...success({user: payload.user})}),
  throw: (_, {payload}) => failed(payload),
};

export default handleActions<UserReducerState, any>(
  {
    [types.FETCH_USER]: (state) => loading(state),
    [types.FETCH_USER_COMPLETED]: fetchUserCompleted,
  },
  empty(),
);
