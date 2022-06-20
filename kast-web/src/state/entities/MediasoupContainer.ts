import {ViewModeEnum} from 'state/ducks/mediasoup/actions';
import {RoomType} from 'entities/Room';

export default interface MediasoupContainer {
  screenLoading: boolean;
  cameraLoading: boolean;
  audioLoading: boolean;
  screenPlay: boolean;
  cameraPlay: boolean;
  audioPlay: boolean;
  roomId: string;
  roomType: RoomType;
  viewMode: ViewModeEnum;
  isRecording: boolean;
}
