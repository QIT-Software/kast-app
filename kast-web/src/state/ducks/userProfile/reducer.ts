import {handleActions, ReducerNextThrow} from 'redux-actions';
import {empty, failed, loading, success} from 'state/entities/LoadableContainer';
import types from './types';
import {FetchUserProfileCompleted} from './actions';
import {UserProfileReducerState} from '../../entities/State';

const fetchUserAccountCompleted: ReducerNextThrow<
  UserProfileReducerState,
  FetchUserProfileCompleted
> = {
  next: (state, {payload}) => success(payload),
  throw: (_, {payload}) => failed(payload),
};

export default handleActions<UserProfileReducerState, unknown>(
  {
    [types.FETCH_USER_PROFILE]: (state) => loading(state),
    [types.FETCH_USER_PROFILE_COMPLETED]: fetchUserAccountCompleted,
  },
  success(empty()),
);
