import {all, put, takeEvery} from 'redux-saga/effects';
import types from './types';
import {Action} from 'redux-actions';
import actions, {GetUserRooms} from './actions';
import {alertActions} from 'state/ducks/alert';
import {AvikastApi as Api} from 'api';
import Room from 'entities/Room';

//
function* getUserRooms() {
  try {
    const userRooms: Room[] = yield Api.getUserRooms();
    yield put(actions.getUserRoomsCompleted({userRooms}));
  } catch (e) {
    yield put(actions.getUserRoomsCompleted(e));
  }
}
function* getUserRoomsCompleted({error}: Action<GetUserRooms>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}
//

export default function* () {
  yield all([
    takeEvery(types.GET_USER_ROOMS, getUserRooms),
    takeEvery(types.GET_USER_ROOMS_COMPLETED, getUserRoomsCompleted),
  ]);
}
