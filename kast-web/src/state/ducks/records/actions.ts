import {createAction} from 'redux-actions';
import types from './types';
import Record from 'entities/Record';

export type FetchRecordsCompleted = {records: Record[]};
export type RemoveRecord = {recordId: string};

export default {
  fetchRecords: createAction(types.FETCH_RECORDS),
  fetchRecordsCompleted: createAction<FetchRecordsCompleted>(
    types.FETCH_RECORDS_COMPLETED,
  ),
  removeRecord: createAction(types.REMOVE_RECORD),
};
