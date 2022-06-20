/* eslint-disable no-console */
import {all, put, takeEvery} from 'redux-saga/effects';
import types from './types';
import {Action} from 'redux-actions';
import actions, {
  ChangeQuality,
  Initialize,
  StartRecording,
  StartTranslation,
} from './actions';
import {MediasoupService} from 'services';
import {alertActions} from '../alert';
import {logger} from 'services/mediasoup/Utils';
import {parse} from 'query-string';
import Room, {RoomType} from 'entities/Room';
import {AvikastApi} from 'api';
import {Quality} from 'entities/Mediasoup';

function* startTranslation({payload}: Action<StartTranslation>) {
  try {
    if (payload.enableMicrophone)
      yield put(actions.playPauseAudio({roomId: payload.roomId}));
    if (payload.enableCamera)
      yield put(actions.playPauseCamera({roomId: payload.roomId}));
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* stopStreaming() {
  try {
    MediasoupService.stopAll();
    yield put(actions.stopStreamingComplete());
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}
function* stopStreamingComplete({payload, error}: Action<any>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}

function* initialize({payload}: Action<Initialize>) {
  try {
    logger(`initialize saga room id${payload.roomId}`);
    const {audio, video} = payload;
    yield MediasoupService.initialize(payload.roomId);
    const room: Room = yield AvikastApi.getRoomById(payload.roomId);
    yield MediasoupService.pushParticipantTracks(room);
    if (audio) yield put(actions.playPauseAudio({roomId: room.id}));
    if (video) yield put(actions.playPauseCamera({roomId: room.id}));
    // if (screen)
    //   yield put(actions.playPauseScreen({roomId: room.id, quality: Quality.Low}));
    if (
      payload.roomType === RoomType.Meeting ||
      (payload.roomUserId === payload.sessionUserId &&
        payload.roomType === RoomType.Webinar)
    ) {
      // eslint-disable-next-line no-restricted-globals
      const {enableCamera, enableMicrophone} = parse(location.search);
      if (enableMicrophone === 'true') {
        yield put(actions.playPauseAudio(payload));
      }
      if (enableCamera === 'true') {
        yield put(actions.playPauseCamera(payload));
      }
    }
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* playPauseScreen({payload}: Action<{roomId: string; quality: Quality}>) {
  try {
    logger(`playPauseScreen saga room id${payload.roomId}`);
    yield MediasoupService.produceScreen(payload.roomId, payload.quality);
    yield put(actions.playPauseScreenCompleted());
    // yield MediasoupService.pushParticipantTracks(payload.roomId);
  } catch (e) {
    console.log(e);
    yield put(actions.playPauseScreenCompleted(e));
  }
}
function* playPauseScreenCompleted({payload, error}: Action<any>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}
function* playPauseCamera({payload}: Action<{roomId: string}>) {
  try {
    logger(`playPauseScreen saga room id${payload.roomId}`);

    yield MediasoupService.produceCamera(payload.roomId, Quality.Low);
    yield put(actions.playPauseCameraCompleted());
    // yield MediasoupService.pushParticipantTracks(payload.roomId);
  } catch (e) {
    yield put(actions.playPauseCameraCompleted(e));
  }
}
function* playPauseCameraCompleted({payload, error}: Action<any>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}
function* playPauseAudio({payload}: Action<{roomId: string}>) {
  try {
    logger(`playPauseScreen saga room id${payload.roomId}`);
    yield MediasoupService.produceAudio(payload.roomId);
    yield put(actions.playPauseAudioCompleted());
    // yield MediasoupService.pushParticipantTracks(payload.roomId);
  } catch (e) {
    yield put(actions.playPauseAudioCompleted(e));
  }
}
function* playPauseAudioCompleted({payload, error}: Action<any>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}

function* consume({payload}: Action<{roomId: string}>) {
  yield MediasoupService.consume(payload.roomId);
}

function* startRecording({payload}: Action<StartRecording>) {
  const response: boolean = yield MediasoupService.startRecording(
    payload.roomId,
    payload.producerId,
    payload.audioProducerId,
  );
  yield put(actions.stopRecordingCompleted(response));
}
function* startRecordingCompleted({payload, error}: Action<any>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}
function* stopRecording({payload}: Action<{roomId?: string}>) {
  const response: boolean = yield MediasoupService.stopRecording(payload.roomId);
  yield put(actions.stopRecordingCompleted(response));
}
function* stopRecordingCompleted({payload, error}: Action<any>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}

function* getRoomTracks({payload}: Action<{roomId: string}>) {
  try {
    console.log(payload.roomId);
    // yield MediasoupService.getParticipantTracks(payload.roomId);
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* pushParticipantTracks({payload}: Action<{room: Room}>) {
  try {
    yield MediasoupService.pushParticipantTracks(payload.room);
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* changeQuality({payload}: Action<ChangeQuality>) {
  try {
    MediasoupService.changeQuality(payload.quality);
    console.log('change quality to', payload.quality);
    const {roomId, quality, cameraPlay, screenPlay} = payload;
    if (cameraPlay) {
      yield put(actions.playPauseCamera({roomId}));
      yield MediasoupService.produceCamera(roomId, quality);
    }
    if (screenPlay) {
      yield put(actions.playPauseScreen({roomId, quality}));
      yield MediasoupService.produceScreen(roomId, quality);
    }
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

export default function* () {
  yield all([
    takeEvery(types.START_STREAMING, startTranslation),
    takeEvery(types.INITIALIZE, initialize),
    takeEvery(types.CONSUME, consume),

    takeEvery(types.STOP_STREAMING, stopStreaming),
    takeEvery(types.STOP_STREAMING_COMPLETED, stopStreamingComplete),

    takeEvery(types.PLAY_PAUSE_SCREEN, playPauseScreen),
    takeEvery(types.PLAY_PAUSE_SCREEN_COMPLETED, playPauseScreenCompleted),
    takeEvery(types.PLAY_PAUSE_CAMERA, playPauseCamera),
    takeEvery(types.PLAY_PAUSE_CAMERA_COMPLETED, playPauseCameraCompleted),
    takeEvery(types.PLAY_PAUSE_AUDIO, playPauseAudio),
    takeEvery(types.PLAY_PAUSE_AUDIO_COMPLETED, playPauseAudioCompleted),

    takeEvery(types.START_RECORDING, startRecording),
    takeEvery(types.START_RECORDING_COMPLETED, startRecordingCompleted),
    takeEvery(types.STOP_RECORDING, stopRecording),
    takeEvery(types.STOP_RECORDING_COMPLETED, stopRecordingCompleted),

    takeEvery(types.GET_ROOM_TRACKS, getRoomTracks),
    takeEvery(types.PUSH_PARTICIPANT_TRACKS, pushParticipantTracks),

    takeEvery(types.CHANGE_QUALITY, changeQuality),
  ]);
}
