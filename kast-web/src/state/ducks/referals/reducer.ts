import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  failed,
  LoadableContainer,
  loading,
  success,
  empty,
} from 'state/entities/LoadableContainer';
import User from 'entities/User';

type ReducerState = LoadableContainer<{userReferrers: User[]}>;

const userReferrersFetched: ReducerNextThrow<ReducerState, User[]> = {
  next: (_, {payload}) => success({userReferrers: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_USER_REFERRERS]: (state) => loading(state),
    [types.FETCH_USER_REFERRERS_COMPLETE]: userReferrersFetched,
  },
  empty(),
);
