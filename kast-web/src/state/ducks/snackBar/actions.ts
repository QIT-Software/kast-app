import {createAction} from 'redux-actions';
import types from './types';
import {SnackBarType} from '../../entities/SnackBar';

export default {
  showSnackbar: createAction<{message: any; type: SnackBarType}>(types.OPEN),
  clearSnackbar: createAction(types.CLEAR),
};
