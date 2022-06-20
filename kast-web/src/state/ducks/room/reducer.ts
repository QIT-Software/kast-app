import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {RoomReducerState} from 'state/entities/State';
import {empty, failed, loading, success} from 'state/entities/LoadableContainer';
import {FetchRoomCompleted} from 'state/ducks/room/actions';

const fetchRoomCompleted: ReducerNextThrow<RoomReducerState, FetchRoomCompleted> = {
  next: (state, {payload}) => ({...state, ...success({data: payload.room})}),
  throw: (_, {payload}) => failed(payload),
};

export default handleActions<RoomReducerState, any>(
  {
    [types.FETCH_ROOM]: (state) => loading(state),
    [types.FETCH_ROOM_COMPLETED]: fetchRoomCompleted,
  },
  empty(),
);
