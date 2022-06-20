import {handleActions, ReducerNextThrow} from 'redux-actions';
import {empty, failed, loading, success} from '../../entities/LoadableContainer';
import {FilesReducerState} from 'state/entities/State';
import types from 'state/ducks/files/types';
import {FetchFilesCompleted} from 'state/ducks/files/actions';

const fetchFilesCompleted: ReducerNextThrow<FilesReducerState, FetchFilesCompleted> = {
  // @ts-ignore
  next: (state, {payload}) => ({
    ...state,
    ...success({files: payload.files, directories: payload.directories}),
  }),
  throw: (_, {payload}) => failed(payload),
};

export default handleActions<FilesReducerState, any>(
  {
    [types.FETCH_FILES]: (state) => loading(state),
    [types.FETCH_FILES_COMPLETED]: fetchFilesCompleted,
  },
  empty(),
);
