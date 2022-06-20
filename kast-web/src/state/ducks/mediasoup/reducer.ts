import {handleActions} from 'redux-actions';
import types from './types';
import {MediasoupReducerState} from 'state/entities/State';
import {MediasoupService} from 'services';
import {RoomType} from 'entities/Room';
import {ViewModeEnum} from 'state/ducks/mediasoup/actions';

export default handleActions<MediasoupReducerState, unknown>(
  {
    [types.INITIALIZE]: (state, {payload}) => ({
      ...state,
      // @ts-ignore
      roomId: payload.roomId,
    }),
    [types.PLAY_PAUSE_SCREEN]: (state) => ({
      ...state,
      screenLoading: true,
    }),
    [types.PLAY_PAUSE_SCREEN_COMPLETED]: (state) => {
      return {
        ...state,
        screenLoading: false,
        screenPlay: MediasoupService.getPlayStatus().screen,
      };
    },
    [types.PLAY_PAUSE_CAMERA]: (state) => ({...state, cameraLoading: true}),
    [types.PLAY_PAUSE_CAMERA_COMPLETED]: (state) => {
      return {
        ...state,
        cameraLoading: false,
        cameraPlay: MediasoupService.getPlayStatus().camera,
      };
    },
    [types.PLAY_PAUSE_AUDIO]: (state) => ({...state, audioLoading: true}),
    [types.PLAY_PAUSE_AUDIO_COMPLETED]: (state) => {
      return {
        ...state,
        audioLoading: false,
        audioPlay: MediasoupService.getPlayStatus().audio,
      };
    },

    [types.STOP_STREAMING]: (state) => ({
      ...state,
      audioLoading: true,
      cameraLoading: true,
      screenLoading: true,
    }),
    [types.STOP_STREAMING_COMPLETED]: (state) => {
      return {
        ...state,
        audioLoading: false,
        cameraLoading: false,
        screenLoading: false,
        audioPlay: false,
        cameraPlay: false,
        screenPlay: false,
      };
    },

    [types.START_RECORDING]: (state) => ({...state, isRecording: true}),
    [types.START_RECORDING_COMPLETED]: (state) => ({...state, isRecording: false}),
    [types.STOP_RECORDING]: (state) => ({...state, isRecording: true}),
    [types.STOP_RECORDING_COMPLETED]: (state) => ({...state, isRecording: false}),
  },
  {
    screenPlay: false,
    cameraPlay: false,
    audioPlay: false,
    screenLoading: false,
    cameraLoading: false,
    audioLoading: false,
    roomId: '',
    roomType: RoomType.Meeting,
    viewMode: ViewModeEnum.CameraMain,
    isRecording: false,
  },
);
