import {handleActions, ReducerNextThrow} from 'redux-actions';
import {empty, failed, loading, success} from '../../entities/LoadableContainer';
import {RecordsReducerState} from '../../entities/State';
import types from './types';
import {FetchRecordsCompleted, RemoveRecord} from './actions';

const fetchRecordsCompleted: ReducerNextThrow<
  RecordsReducerState,
  FetchRecordsCompleted
> = {
  next: (state, {payload}) => ({...state, ...success({data: payload.records})}),
  throw: (_, {payload}) => failed(payload),
};

const removeRecord: ReducerNextThrow<RecordsReducerState, RemoveRecord> = {
  next: (state, {payload}) => {
    if (!state.isSuccess) return state;
    const data = state.data.filter((record) => {
      return record.id !== payload.recordId;
    });
    return success({data});
  },
  throw: (_, {payload}) => failed(payload),
};

export default handleActions<RecordsReducerState, any>(
  {
    [types.FETCH_RECORDS]: (state) => loading(state),
    [types.FETCH_RECORDS_COMPLETED]: fetchRecordsCompleted,
    [types.REMOVE_RECORD]: removeRecord,
  },
  empty(),
);
