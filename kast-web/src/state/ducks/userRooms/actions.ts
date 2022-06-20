import {createAction} from 'redux-actions';
import types from './types';
import Room from 'entities/Room';

export type GetUserRooms = {
  userRooms: Room[];
};

export default {
  getUserRooms: createAction(types.GET_USER_ROOMS),
  getUserRoomsCompleted: createAction<GetUserRooms>(types.GET_USER_ROOMS_COMPLETED),
};
