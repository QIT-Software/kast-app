import {createAction} from 'redux-actions';
import types from './types';
import Room, {RoomType, UserRole} from 'entities/Room';
import {ViewModeEnum} from 'state/ducks/mediasoup/actions';
import Participant from 'entities/Participant';
import * as H from 'history';

export type InitializeWebinar = {roomId: string};
export type ReceiveStream = {roomId: string};
export type GetRoomTracks = {roomId: string};
export type FetchInviteLink = {roomId: string};
export type FetchInviteLinkCompleted = {inviteLink: string};

export type CreateRoomOptions = {
  room: Room;
  roomType: RoomType;
  enableMicrophone: boolean;
  enableCamera: boolean;
};
export type JoinRoomOptions = {
  room: Room;
  enableMicrophone: boolean;
  enableCamera: boolean;
  userRole: UserRole;
};

export type RoomOptions = {
  enableMicrophone: boolean;
  enableCamera: boolean;
};

export type JoinRoomCompleted = {
  room: Room;
};

export type CreateRoomCompleted = {
  room: Room;
  roomType: RoomType;
};

export type SetViewMode = {
  viewMode: ViewModeEnum;
};
export type RoomId = {
  roomId: string;
};
export type FetchRoomCompleted = {
  room: Room;
};

export type FetchParticipantsCompleted = {
  participants: Participant[];
  myParticipant: Participant | undefined;
};
export type NavigationPayload = {history: H.History};

export type CloseRoom = {
  roomId: string;
} & NavigationPayload;

export type LeaveRoom = {
  roomId: string;
  history: H.History;
};
export type CheckIsClosed = {
  room: Room;
  userId: string;
} & NavigationPayload;

export type CloseRoomCompleted = {
  response: boolean;
} & NavigationPayload;

export type LeaveRoomCompleted = {
  history: H.History;
};

export type GetRoomCompleted = {
  room: Room;
};

export type GetUserRooms = {
  userRooms: Room[];
};

export default {
  initializeWebinar: createAction<InitializeWebinar>(types.INITIALIZE_WEBINAR),
  createRoomOptions: createAction<CreateRoomOptions>(types.CREATE_ROOM_OPTIONS),
  joinRoomOptions: createAction<JoinRoomOptions>(types.JOIN_ROOM_OPTIONS),
  joinRoomCompleted: createAction<JoinRoomCompleted>(types.JOIN_ROOM_COMPLETED),
  createRoomCompleted: createAction<CreateRoomCompleted>(types.CREATE_ROOM_COMPLETED),
  receiveStream: createAction<ReceiveStream>(types.RECEIVE_STREAM),
  getRoomTracks: createAction<GetRoomTracks>(types.GET_ROOM_TRACKS),

  leaveRoom: createAction<LeaveRoom>(types.LEAVE_ROOM),
  leaveRoomCompleted: createAction<LeaveRoomCompleted>(types.LEAVE_ROOM_COMPLETED),

  closeRoom: createAction<CloseRoom>(types.CLOSE_ROOM),
  closeRoomCompleted: createAction<CloseRoomCompleted>(types.CLOSE_ROOM_COMPLETED),

  fetchRoom: createAction(types.FETCH_ROOM),
  fetchRoomCompleted: createAction<FetchRoomCompleted>(types.FETCH_ROOM_COMPLETED),

  getRoom: createAction(types.GET_ROOM),
  getRoomCompleted: createAction<GetRoomCompleted>(types.GET_ROOM_COMPLETED),

  checkIsClosed: createAction<CheckIsClosed>(types.CHECK_IS_CLOSED),
  checkIsClosedCompleted: createAction<GetRoomCompleted>(types.CHECK_IS_CLOSED_COMPLETED),
};
