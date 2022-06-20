import {handleActions} from 'redux-actions';
import types from './types';
import ParticipantsContainer from 'state/entities/ParticipantsContainer';

export default handleActions<ParticipantsContainer, unknown>(
  {
    [types.FETCH_PARTICIPANTS_COMPLETED]: (state, {payload}) => {
      return {
        ...state,
        // @ts-ignore
        participants: payload.participants,
        inRoom: true,
        // @ts-ignore
        myParticipant: payload.myParticipant,
      };
    },
    [types.RAISE_HAND_COMPLETED]: (state, {payload}) => {
      // @ts-ignore
      return {...state, handRaised: payload.raiseHand};
    },
    [types.SET_ROOM_OWNER_COMPLETED]: (state, {payload}) => {
      // @ts-ignore
      return {...state, isRoomOwner: payload.isRoomOwner};
    },
    [types.SET_ROOM_USER_ID_COMPLETED]: (state, {payload}) => {
      // @ts-ignore
      return {...state, roomUserId: payload.roomUserId};
    },
    [types.SET_MET_AS_MUTED]: (state, {payload}) => {
      // @ts-ignore
      return {...state, muted: payload.muted};
    },
    [types.SET_IN_ROOM_COMPLETED]: (state, {payload}) => {
      // @ts-ignore
      return {...state, inRoom: payload.inRoom};
    },
  },
  {
    participants: [],
    inRoom: false,
    handRaised: false,
    isRoomOwner: false,
    roomUserId: '',
    muted: false,
    myParticipant: undefined,
  },
);
