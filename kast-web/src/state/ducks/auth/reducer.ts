import {Action, handleActions} from 'redux-actions';
import types from './types';
import {Auth} from 'state/entities/Auth';

export default handleActions<Auth, any>(
  {
    [types.LOGIN_USER]: (state) => ({...state, isBusy: true}),
    [types.REGISTER_USER]: (state) => ({...state, isBusy: true}),
    [types.AUTH_COMPLETED]: (state) => ({...state, isBusy: false}),
    [types.RECOVER_PASSWORD]: (state) => ({...state, isBusy: true}),
    [types.RECOVER_PASSWORD_COMPLETED]: (state) => ({...state, isBusy: false}),
    [types.SET_IS_CHECKING]: (state, {payload}: Action<boolean>) => ({
      ...state,
      isChecking: payload,
    }),
  },
  {isBusy: false, isChecking: false, isLoading: false},
);
