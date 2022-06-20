import {handleActions} from 'redux-actions';
import {DashboardReducerState} from 'state/entities/State';
import types from './types';

export default handleActions<DashboardReducerState, unknown>(
  {
    [types.CREATE_ROOM]: (state) => ({...state, creatingRoom: true}),
    [types.CREATE_ROOM_COMPLETED]: (state) => ({...state, creatingRoom: false}),
    [types.JOIN_ROOM]: (state) => ({...state, joiningRoom: true}),
    [types.JOIN_ROOM_COMPLETED]: (state) => ({...state, joiningRoom: false}),
  },
  {
    creatingRoom: false,
    joiningRoom: false,
  },
);
