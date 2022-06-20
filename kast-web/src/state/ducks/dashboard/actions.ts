import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from 'state/ducks/router/actions';
import Room, {
  CreateRoom as CreateRoomEntity,
  JoinRoom as JoinRoomEntity,
  RoomType,
} from 'entities/Room';

export type CreateRoom = {
  room: CreateRoomEntity;
} & NavigationPayload;
export type CreateRoomCompleted = {
  room: Room;
  roomType: RoomType;
  enableMicrophone: boolean;
  enableCamera: boolean;
} & NavigationPayload;
export type JoinRoom = {
  room: JoinRoomEntity;
} & NavigationPayload;
export type JoinRoomCompleted = {
  room: Room;
  enableMicrophone: boolean;
  enableCamera: boolean;
} & NavigationPayload;

export default {
  createRoom: createAction<CreateRoom>(types.CREATE_ROOM),
  createRoomCompleted: createAction<CreateRoomCompleted>(types.CREATE_ROOM_COMPLETED),
  joinRoom: createAction<JoinRoom>(types.JOIN_ROOM),
  joinRoomCompleted: createAction<JoinRoomCompleted>(types.JOIN_ROOM_COMPLETED),
};
