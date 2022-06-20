import {all, put, takeEvery} from 'redux-saga/effects';
import actions, {
  CreateRoom,
  CreateRoomCompleted,
  JoinRoom,
  JoinRoomCompleted,
} from './actions';
import types from './types';
import {routerActions} from 'state/ducks/router';
import {Action} from 'redux-actions';
import Room, {UserRole} from 'entities/Room';
import {AvikastApi} from 'api';
import {alertActions} from 'state/ducks/alert';
import {roomActions} from 'state/ducks/room';
import {actions as snackActions} from 'state/ducks/snackBar';
import {chatActions} from 'state/ducks/chat';

function* createRoom({payload}: Action<CreateRoom>) {
  const room: Room = yield AvikastApi.createRoom(
    payload.room.title,
    payload.room.type,
    payload.room.passwordProtected,
    payload.room.password,
    payload.room.enableMicrophone,
    payload.room.enableCamera,
  );
  yield put(
    actions.createRoomCompleted({
      room,
      roomType: payload.room.type,
      history: payload.history,
      enableMicrophone: payload.room.enableMicrophone,
      enableCamera: payload.room.enableCamera,
    }),
  );
}

function* createRoomCompleted({payload, error}: Action<CreateRoomCompleted>) {
  if (error) {
    yield put(alertActions.showError(payload));
    return;
  }
  yield put(
    roomActions.createRoomOptions({
      room: payload.room,
      roomType: payload.roomType,
      enableMicrophone: payload.enableMicrophone,
      enableCamera: payload.enableCamera,
    }),
  );
  yield put(
    routerActions.navigateToRoom({
      roomId: payload.room.id,
      history: payload.history,
      enableMicrophone: payload.enableMicrophone,
      enableCamera: payload.enableCamera,
    }),
  );
}

function* joinRoom({payload}: Action<JoinRoom>) {
  try {
    const room: Room = yield AvikastApi.joinRoom(
      payload.room.inviteLink,
      payload.room.password,
      payload.room.enableMicrophone,
      payload.room.enableCamera,
    );
    yield put(
      actions.joinRoomCompleted({
        room,
        history: payload.history,
        enableMicrophone: payload.room.enableMicrophone,
        enableCamera: payload.room.enableCamera,
      }),
    );
  } catch (e) {
    yield put(
      snackActions.showSnackbar({
        message: e.toString(),
        type: 'error',
      }),
    );
    yield put(actions.joinRoomCompleted(e));
  }
}

function* joinRoomCompleted({payload, error}: Action<JoinRoomCompleted>) {
  if (error) {
    yield put(alertActions.showError(payload));
    return;
  }
  yield put(
    roomActions.joinRoomOptions({
      room: payload.room,
      enableMicrophone: payload.enableMicrophone,
      enableCamera: payload.enableCamera,
      userRole: UserRole.Participant,
    }),
  );
  yield put(
    routerActions.navigateToRoom({
      roomId: payload.room.id,
      history: payload.history,
      enableMicrophone: payload.enableMicrophone,
      enableCamera: payload.enableCamera,
    }),
  );
  yield put(chatActions.fetchMessages({roomId: payload.room.id}));
}

export default function* () {
  yield all([
    //
    takeEvery(types.CREATE_ROOM, createRoom),
    takeEvery(types.CREATE_ROOM_COMPLETED, createRoomCompleted),
    takeEvery(types.JOIN_ROOM, joinRoom),
    takeEvery(types.JOIN_ROOM_COMPLETED, joinRoomCompleted),
  ]);
}
