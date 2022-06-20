import {all, put, takeEvery} from 'redux-saga/effects';
import types from './types';
import {Action} from 'redux-actions';
import actions, {FetchUserCompleted} from './actions';
import {alertActions} from 'state/ducks/alert';
import {AvikastApi as Api} from 'api';
import User from 'entities/User';

function* fetchUser({payload}: Action<{userId: string}>) {
  try {
    const user: User = yield Api.getUserById(payload.userId);
    yield put(actions.fetchUserCompleted({user}));
  } catch (e) {
    yield put(actions.fetchUserCompleted(e));
  }
}
function* fetchUserCompleted({error}: Action<FetchUserCompleted>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_USER, fetchUser),
    takeEvery(types.FETCH_USER_COMPLETED, fetchUserCompleted),
  ]);
}
