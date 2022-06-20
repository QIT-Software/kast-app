import {all, put, takeEvery} from 'redux-saga/effects';
import types from './types';
import {Action} from 'redux-actions';
import actions, {
  CheckIsClosed,
  CloseRoom,
  CloseRoomCompleted,
  FetchRoomCompleted,
  GetRoomCompleted,
  InitializeWebinar,
  LeaveRoom,
  LeaveRoomCompleted,
  ReceiveStream,
} from './actions';
import {actions as mediasoupActions} from '../mediasoup';
import {alertActions} from 'state/ducks/alert';
import {logger} from 'services/mediasoup/Utils';
import {AvikastApi as Api} from 'api';
import Room from 'entities/Room';
import {routerActions} from 'state/ducks/router';
import {actions as participantsActions} from 'state/ducks/participants/index';
import * as H from 'history';

function* initializeWebinar({payload}: Action<InitializeWebinar>) {
  // todo INIT webinar owner
  const {roomId} = payload;
  try {
    yield put(
      mediasoupActions.startStreaming({
        roomId,
        enableMicrophone: true,
        enableCamera: true,
      }),
    );
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* receiveStream({payload}: Action<ReceiveStream>) {
  const {roomId} = payload;
  // eslint-disable-next-line no-console
  console.log(roomId);
  yield;
  try {
    // yield put(mediasoupActions.consume({roomId}));
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}
function* getRoomTracks({payload}: Action<ReceiveStream>) {
  try {
    logger(payload.roomId);
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* fetchRoom({payload}: Action<{roomId: string}>) {
  try {
    // mediasoupActions.pushParticipantTracks({roomId: room.id});
    const room: Room = yield Api.getRoomById(payload.roomId);
    yield put(participantsActions.setRoomUserId({roomUserId: room.user.id}));
    yield put(actions.fetchRoomCompleted({room}));
  } catch (e) {
    yield put(actions.fetchRoomCompleted(e));
  }
}
function* fetchRoomCompleted({error}: Action<FetchRoomCompleted>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* leaveRoom({payload}: Action<LeaveRoom>) {
  try {
    const his: H.History = payload.history;
    yield put(actions.leaveRoomCompleted({history: his}));
    yield Api.stopRecording(payload.roomId);
    yield Api.leaveRoom(payload.roomId);
    yield put(participantsActions.setInRoom({inRoom: false}));
  } catch (e) {
    yield put(actions.leaveRoomCompleted(e));
  }
}
function* leaveRoomCompleted({payload, error}: Action<LeaveRoomCompleted>) {
  if (error) {
    yield put(
      alertActions.showMessage({
        title: 'Cannot leave room!!!',
        message: `reload page, ${error}`,
      }),
    );
  }
  const his: H.History = payload.history;
  yield put(routerActions.navigateToMain({history: his}));
}

function* closeRoom({payload}: Action<CloseRoom>) {
  try {
    yield Api.stopRecording(payload.roomId);
    const response: boolean = yield Api.closeRoom(payload.roomId);
    yield put(actions.closeRoomCompleted({response, history: payload.history}));
    yield put(participantsActions.setInRoom({inRoom: false}));
  } catch (e) {
    yield put(actions.closeRoomCompleted(e));
  }
}
function* closeRoomCompleted({payload, error}: Action<CloseRoomCompleted>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
  yield put(routerActions.navigateToMain({history: payload.history}));
}

//

function* getRoom() {
  try {
    const room: Room = yield Api.getRoom();
    yield put(actions.getRoomCompleted({room}));
  } catch (e) {
    yield put(actions.getRoomCompleted(e));
  }
}
function* getRoomCompleted({error}: Action<GetRoomCompleted>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

//
function* checkIsClosed({payload}: Action<CheckIsClosed>) {
  const {room, userId, history} = payload;
  try {
    if (room.closed !== undefined) {
      yield put(actions.leaveRoom({roomId: room.id, history}));
    }
    if (room.participants) {
      const participant = room.participants.find((element) => {
        return element.user.id === userId;
      });
      // @ts-ignore
      if (participant.kicked) {
        // yield put(actions.leaveRoom({roomId: room.id}));
      }
      // @ts-ignore
      if (participant.muted) {
        yield put(mediasoupActions.stopStreaming());
        yield put(participantsActions.setMeAsMuted());
      }
    }
  } catch (e) {
    yield put(actions.getRoomCompleted(e));
  }
}

function* checkIsClosedCompleted({error}: Action<GetRoomCompleted>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

export default function* () {
  yield all([
    takeEvery(types.INITIALIZE_WEBINAR, initializeWebinar),
    takeEvery(types.RECEIVE_STREAM, receiveStream),
    takeEvery(types.GET_ROOM_TRACKS, getRoomTracks),

    takeEvery(types.FETCH_ROOM, fetchRoom),
    takeEvery(types.FETCH_ROOM_COMPLETED, fetchRoomCompleted),

    takeEvery(types.LEAVE_ROOM, leaveRoom),
    takeEvery(types.LEAVE_ROOM_COMPLETED, leaveRoomCompleted),

    takeEvery(types.CLOSE_ROOM, closeRoom),
    takeEvery(types.CLOSE_ROOM_COMPLETED, closeRoomCompleted),

    takeEvery(types.GET_ROOM, getRoom),
    takeEvery(types.GET_ROOM_COMPLETED, getRoomCompleted),

    takeEvery(types.CHECK_IS_CLOSED, checkIsClosed),
    takeEvery(types.CHECK_IS_CLOSED_COMPLETED, checkIsClosedCompleted),
  ]);
}
