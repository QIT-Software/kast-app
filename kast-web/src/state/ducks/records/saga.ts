import {all, takeEvery, put} from 'redux-saga/effects';
import types from './types';
import {AvikastApi, AvikastApi as Api} from 'api';
import actions, {FetchRecordsCompleted, RemoveRecord} from './actions';
import {alertActions} from '../alert';
import {Action} from 'redux-actions';
import {logger} from 'services/mediasoup/Utils';
import Record from 'entities/Record';

function* fetchRecords() {
  try {
    const records: Record[] = yield Api.getRecords();
    yield put(actions.fetchRecordsCompleted({records}));
  } catch (e) {
    yield put(actions.fetchRecordsCompleted(e));
  }
}

function* removeRecord({payload, error}: Action<RemoveRecord>) {
  logger(payload.recordId);
  yield AvikastApi.deleteRecord(payload.recordId);
  yield put(actions.fetchRecords());
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* fetchRecordsCompleted({error}: Action<FetchRecordsCompleted>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_RECORDS, fetchRecords),
    takeEvery(types.FETCH_RECORDS_COMPLETED, fetchRecordsCompleted),
    takeEvery(types.REMOVE_RECORD, removeRecord),
  ]);
}
