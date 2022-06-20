import {createAction} from 'redux-actions';
import types from './types';
import Room, {RoomType, UserRole} from 'entities/Room';
import {ViewModeEnum} from 'state/ducks/mediasoup/actions';
import Participant, {MuteAction, MuteMediaSource} from 'entities/Participant';
import {NavigationPayload} from 'state/ducks/router/actions';

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

export default {
  fetchParticipants: createAction<{
    room: Room;
    userId: string;
  }>(types.FETCH_PARTICIPANTS),
  fetchParticipantsCompleted: createAction<FetchParticipantsCompleted>(
    types.FETCH_PARTICIPANTS_COMPLETED,
  ),
  raiseHand: createAction<{roomId: string; raiseHand: boolean}>(types.RAISE_HAND),
  raiseHandCompleted: createAction<{raiseHand: boolean}>(types.RAISE_HAND_COMPLETED),

  mute: createAction<{
    action: MuteAction;
    source: MuteMediaSource;
    userId: string;
    roomId: string;
    producerId: string;
  }>(types.MUTE),
  muteCompleted: createAction(types.MUTE_COMPLETED),

  muteAll: createAction<{
    action: MuteAction;
    userId: string;
    roomId: string;
  }>(types.MUTE_ALL),
  muteAllCompleted: createAction(types.MUTE_ALL_COMPLETED),

  setMeAsMuted: createAction(types.SET_MET_AS_MUTED),

  kick: createAction<{
    userId: string;
    roomId: string;
  }>(types.KICK),
  kickCompleted: createAction(types.KICK_COMPLETED),

  checkMyParticipant: createAction<{myParticipant: Participant} & NavigationPayload>(
    types.CHECK_MY_PARTICIPANT,
  ),
  checkMyParticipantCompleted: createAction(types.CHECK_MY_PARTICIPANT_COMPLETED),

  setRoomOwner: createAction<{isRoomOwner: boolean}>(types.SET_ROOM_OWNER),
  setRoomUserId: createAction<{roomUserId: string}>(types.SET_ROOM_USER_ID),
  setRoomLogo: createAction<{roomUserId: string | undefined}>(types.SET_ROOM_USER_ID),
  setRoomBackground: createAction<{roomUserId: string | undefined}>(
    types.SET_ROOM_USER_ID,
  ),
  setRoomUserIdCompleted: createAction<{roomUserId: string}>(
    types.SET_ROOM_USER_ID_COMPLETED,
  ),
  setRoomOwnerCompleted: createAction<{isRoomOwner: boolean}>(
    types.SET_ROOM_OWNER_COMPLETED,
  ),

  setInRoom: createAction<{inRoom: boolean}>(types.SET_IN_ROOM),
  setInRoomCompleted: createAction<{inRoom: boolean}>(types.SET_IN_ROOM_COMPLETED),
};
