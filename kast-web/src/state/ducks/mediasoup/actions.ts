import {createAction} from 'redux-actions';
import types from './types';
import {MediaType, Quality} from 'entities/Mediasoup';
import Room, {RoomType} from 'entities/Room';

export type StartTranslation = {
  roomId: string;
  enableMicrophone: boolean;
  enableCamera: boolean;
};

export type RoomId = {
  roomId: string;
};

export type Initialize = {
  roomId: string;
  roomType: RoomType;
  sessionUserId: string;
  roomUserId: string;
  audio: boolean;
  video: boolean;
  screen: boolean;
};

export type Produce = {
  roomId: string;
};

export type Consume = {
  roomId: string;
};

export type GetRoomTracks = {
  roomId: string;
};
export type Pause = {
  mediaType: MediaType;
};

export type StartRecording = {
  producerId?: string;
  roomId: string;
  audioProducerId?: string;
};

export type StopRecording = {
  roomId?: string;
};

export enum ViewModeEnum {
  EqualScreen = 'equalScreen',
  CameraMain = 'cameraMain',
  ScreenMain = 'screenMain',
}

export type SetViewMode = {
  viewMode: ViewModeEnum;
  type: RoomType;
  id: string;
};

export type ChangeQuality = {
  roomId: string;
  quality: Quality;
  cameraPlay: boolean;
  screenPlay: boolean;
};

export default {
  startStreaming: createAction<StartTranslation>(types.START_STREAMING),

  stopStreaming: createAction(types.STOP_STREAMING),
  stopStreamingComplete: createAction(types.STOP_STREAMING_COMPLETED),

  initialize: createAction<Initialize>(types.INITIALIZE),
  consume: createAction<{roomId: string}>(types.CONSUME),
  updateWebinarTracks: createAction(types.UPDATE_WEBINAR_TRACKS),

  playPauseScreen: createAction<{roomId: string; quality: Quality}>(
    types.PLAY_PAUSE_SCREEN,
  ),
  playPauseScreenCompleted: createAction(types.PLAY_PAUSE_SCREEN_COMPLETED),
  playPauseCamera: createAction<{roomId: string}>(types.PLAY_PAUSE_CAMERA),
  playPauseCameraCompleted: createAction(types.PLAY_PAUSE_CAMERA_COMPLETED),
  playPauseAudio: createAction<{roomId: string}>(types.PLAY_PAUSE_AUDIO),
  playPauseAudioCompleted: createAction(types.PLAY_PAUSE_AUDIO_COMPLETED),

  startRecording: createAction<StartRecording>(types.START_RECORDING),
  startRecordingCompleted: createAction(types.START_RECORDING_COMPLETED),
  stopRecording: createAction<StopRecording>(types.STOP_RECORDING),
  stopRecordingCompleted: createAction(types.STOP_RECORDING_COMPLETED),

  setLargeScreen: createAction(types.SET_LARGE_SCREEN),
  setScreenGridWithCameras: createAction(types.SET_SCREEN_GRID_WITH_CAMERAS),
  setScreenGridWithScreenShare: createAction(types.SET_SCREEN_GRID_WITH_SCREENSHARE),

  getRoomTracks: createAction<{roomId: string}>(types.GET_ROOM_TRACKS),
  pushParticipantTracks: createAction<{room: Room}>(types.PUSH_PARTICIPANT_TRACKS),

  changeQuality: createAction<ChangeQuality>(types.CHANGE_QUALITY),
};
