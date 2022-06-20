import {Action, handleActions} from 'redux-actions';
import types from './types';
import {SnackBar, SnackBarType} from '../../entities/SnackBar';

export default handleActions<SnackBar, any>(
  {
    [types.OPEN]: (state, {payload}: Action<{message: any; type: SnackBarType}>) => ({
      ...state,
      snackBarType: payload.type,
      snackbarMessage: payload.message,
      snackbarOpen: true,
    }),
    [types.CLEAR]: (state) => ({...state, snackbarOpen: false}),
  },
  {snackbarOpen: false, snackBarType: 'info', snackbarMessage: undefined},
);
