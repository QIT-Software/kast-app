import {all, put, takeEvery} from 'redux-saga/effects';
import types from './types';
import {Action} from 'redux-actions';
import {alertActions} from 'state/ducks/alert';
import {AvikastApi as Api} from 'api';
import Participant, {MuteAction, MuteMediaSource} from 'entities/Participant';
import {FetchParticipantsCompleted} from 'state/ducks/room/actions';
import {actions} from 'state/ducks/participants';
import {actions as mediasoupActions} from 'state/ducks/mediasoup';
import {actions as routerActions} from 'state/ducks/router';
import {NavigationPayload} from 'state/ducks/router/actions';
import Room from 'entities/Room';
import {processError} from 'state/ducks/alert/saga';
import {snackBarActions} from 'state/ducks/snackBar';

function* fetchParticipants({payload}: Action<{room: Room; userId: string}>) {
  try {
    const myParticipant = payload.room.participants.find(
      (el) => el.user.id === payload.userId,
    );
    yield put(
      actions.fetchParticipantsCompleted({
        participants: payload.room.participants,
        myParticipant: myParticipant || undefined,
      }),
    );
  } catch (e) {
    yield put(actions.fetchParticipantsCompleted(e));
  }
}
function* fetchParticipantsCompleted({error}: Action<FetchParticipantsCompleted>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* raiseHand({payload}: Action<{roomId: string; raiseHand: boolean}>) {
  try {
    const response: boolean = yield Api.raiseHand(payload.roomId, payload.raiseHand);
    yield put(actions.raiseHandCompleted({raiseHand: response}));
  } catch (e) {
    yield put(actions.raiseHandCompleted(e));
  }
}

function* raiseHandCompleted({error}: Action<boolean>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* mute({
  payload,
}: Action<{
  action: MuteAction;
  source: MuteMediaSource;
  userId: string;
  roomId: string;
  producerId: string;
}>) {
  try {
    const respone = yield Api.mute(
      payload.action,
      payload.source,
      payload.userId,
      payload.roomId,
      payload.producerId,
    );
    yield put(actions.muteCompleted(respone));
  } catch (e) {
    yield put(actions.muteCompleted(e));
  }
}

function* muteCompleted({error}: Action<boolean>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* muteAll({
  payload,
}: Action<{
  action: MuteAction;
  userId: string;
  roomId: string;
}>) {
  try {
    const respone = yield Api.muteAll(payload.action, payload.userId, payload.roomId);
    yield put(actions.muteAllCompleted(respone));
  } catch (e) {
    yield put(actions.muteAllCompleted(e));
  }
}

function* setMeAsMuted({error}: Action<boolean>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* muteAllCompleted({error}: Action<boolean>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* kick({
  payload,
}: Action<{
  userId: string;
  roomId: string;
}>) {
  try {
    const respone = yield Api.kick(payload.userId, payload.roomId);
    yield put(actions.kickCompleted(respone));
  } catch (e) {
    yield put(actions.kickCompleted(e));
  }
}

function* kickCompleted({error}: Action<boolean>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* checkMyParticipant({
  payload,
}: Action<
  {
    myParticipant: Participant;
  } & NavigationPayload
>) {
  try {
    if (payload.myParticipant.muted) {
      yield put(mediasoupActions.stopStreaming());
      yield put(actions.checkMyParticipantCompleted('muted'));
    }
    if (payload.myParticipant.kicked) {
      yield put(mediasoupActions.stopStreaming());
      // @ts-ignore
      yield put(routerActions.navigateToMain(payload.history));
      yield put(actions.checkMyParticipantCompleted('kicked'));
    }
  } catch (e) {
    yield put(actions.checkMyParticipantCompleted(e));
  }
}

function* checkMyParticipantCompleted({error, payload}: Action<string>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
  }
  if (payload === 'muted') {
    yield put(
      snackBarActions.showSnackbar({
        message: 'You has been muted',
        type: 'error',
      }),
    );
  }
  if (payload === 'kicked') {
    yield put(
      snackBarActions.showSnackbar({
        message: 'You has been kicked',
        type: 'error',
      }),
    );
  }
}

function* setRoomOwner({payload}: Action<{isRoomOwner: boolean}>) {
  try {
    yield put(actions.setRoomOwnerCompleted({isRoomOwner: payload.isRoomOwner}));
  } catch (e) {
    yield put(actions.setRoomOwnerCompleted(e));
  }
}

function* setRoomUserId({payload}: Action<{roomUserId: string}>) {
  try {
    yield put(actions.setRoomUserIdCompleted({roomUserId: payload.roomUserId}));
  } catch (e) {
    yield put(actions.setRoomUserIdCompleted(e));
  }
}

function* setRoomUserIdCompleted({error}: Action<{roomUserId: string}>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* setRoomOwnerCompleted({error}: Action<boolean>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* setInRoom({payload}: Action<{inRoom: boolean}>) {
  try {
    yield put(actions.setInRoomCompleted({inRoom: payload.inRoom}));
  } catch (e) {
    yield put(actions.setInRoomCompleted(e));
  }
}

function* setInRoomCompleted({error}: Action<{inRoom: boolean}>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_PARTICIPANTS, fetchParticipants),
    takeEvery(types.FETCH_PARTICIPANTS_COMPLETED, fetchParticipantsCompleted),
    takeEvery(types.RAISE_HAND, raiseHand),
    takeEvery(types.RAISE_HAND_COMPLETED, raiseHandCompleted),

    takeEvery(types.MUTE, mute),
    takeEvery(types.MUTE_COMPLETED, muteCompleted),

    takeEvery(types.MUTE_ALL, muteAll),
    takeEvery(types.MUTE_ALL_COMPLETED, muteAllCompleted),

    takeEvery(types.SET_MET_AS_MUTED, setMeAsMuted),

    takeEvery(types.KICK, kick),
    takeEvery(types.KICK_COMPLETED, kickCompleted),

    takeEvery(types.CHECK_MY_PARTICIPANT, checkMyParticipant),
    takeEvery(types.CHECK_MY_PARTICIPANT_COMPLETED, checkMyParticipantCompleted),

    takeEvery(types.SET_ROOM_OWNER, setRoomOwner),
    takeEvery(types.SET_ROOM_USER_ID, setRoomUserId),
    takeEvery(types.SET_ROOM_USER_ID_COMPLETED, setRoomUserIdCompleted),

    takeEvery(types.SET_ROOM_OWNER_COMPLETED, setRoomOwnerCompleted),

    takeEvery(types.SET_IN_ROOM, setInRoom),
    takeEvery(types.SET_IN_ROOM_COMPLETED, setInRoomCompleted),
  ]);
}
