import {all, takeEvery, put} from 'redux-saga/effects';
import types from './types';
import actions from './actions';
import {Action} from 'redux-actions';
import {AvikastApi as Api} from 'api';
import {alertActions} from '../alert';
import User from 'entities/User';

function* fetchUserReferrers() {
  try {
    const userReferrers = yield Api.getUserReferrers();
    yield put(actions.fetchUserReferrersComplete(userReferrers));
  } catch (e) {
    yield put(actions.fetchUserReferrersComplete(e));
  }
}

function* fetchUserReferrersComplete({payload, error}: Action<User>) {
  if (error) {
    yield put(yield put(alertActions.showError(payload)));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_USER_REFERRERS, fetchUserReferrers),
    takeEvery(types.FETCH_USER_REFERRERS_COMPLETE, fetchUserReferrersComplete),
  ]);
}
