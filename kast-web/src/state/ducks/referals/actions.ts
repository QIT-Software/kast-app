import {createAction} from 'redux-actions';
import types from './types';
import User from 'entities/User';

export type FetchReferrers = {id: string};
export type FetchReferrersCompleted = {referrers: User[]};

export default {
  fetchUserReferrers: createAction(types.FETCH_USER_REFERRERS),
  fetchUserReferrersSecondLevel: createAction<FetchReferrers>(
    types.FETCH_USER_REFERRERS_SECOND_LEVEL,
  ),
  fetchUserReferrersThirdLevel: createAction<FetchReferrers>(
    types.FETCH_USER_REFERRERS_THIRD_LEVEL,
  ),
  fetchUserReferrersComplete: createAction(types.FETCH_USER_REFERRERS_COMPLETE),
  fetchUserReferrersSecondLevelComplete: createAction(
    types.FETCH_USER_REFERRERS_SECOND_LEVEL_COMPLETE,
  ),
  fetchUserReferrersThirdLevelComplete: createAction(
    types.FETCH_USER_REFERRERS_THIRD_LEVEL_COMPLETE,
  ),
};
