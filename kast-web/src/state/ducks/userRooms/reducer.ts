import {handleActions} from 'redux-actions';
import types from './types';
import UserRoomsContainer from 'state/entities/UserRoomsContainer';

export default handleActions<UserRoomsContainer, unknown>(
  {
    [types.GET_USER_ROOMS_COMPLETED]: (state, {payload}) => {
      // @ts-ignore
      return {...state, userRooms: payload.userRooms};
    },
  },
  {
    userRooms: [],
  },
);
