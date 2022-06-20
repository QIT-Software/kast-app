import {all, put, takeEvery} from 'redux-saga/effects';
import {alertActions} from 'state/ducks/alert';
import {Action} from 'redux-actions';
import types from 'state/ducks/files/types';
import {actions} from 'state/ducks/files';
import {AvikastFile, AvikastDirectory} from 'entities/AvikastFiles';
import {AvikastApi} from 'api';
import {
  CreateDirectory,
  DeleteFile,
  FetchFiles,
  UploadFile,
} from 'state/ducks/files/actions';

function* fetchFiles({payload}: Action<FetchFiles>) {
  try {
    const files: {
      files: AvikastFile[];
      directories: AvikastDirectory[];
    } = yield AvikastApi.getAvikastFiles(payload.parent);
    yield put(actions.fetchFilesCompleted(files));
  } catch (e) {
    yield put(actions.fetchFilesCompleted(e));
  }
}

function* fetchFilesCompleted({payload, error}: Action<any>) {
  if (error) {
    yield put(alertActions.showError(payload));
  }
}

function* uploadFile({payload}: Action<UploadFile>) {
  try {
    const fileId: string = yield AvikastApi.uploadFile(payload.name, payload.file);
    yield AvikastApi.addAvikastFile(payload.name, fileId, payload.parent);
    yield put(actions.fetchFiles({parent: payload.parent}));
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* createDirectory({payload}: Action<CreateDirectory>) {
  try {
    yield AvikastApi.createAvikastDirectory(payload.name, payload.parent);
    yield put(actions.fetchFiles({parent: payload.parent}));
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* deleteFile({payload}: Action<DeleteFile>) {
  try {
    yield AvikastApi.deleteAvikastFile(payload.id);
    yield put(actions.fetchFiles({parent: payload.parent}));
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* deleteDirectory({payload}: Action<DeleteFile>) {
  try {
    yield AvikastApi.deleteAvikastDirectory(payload.id);
    yield put(actions.fetchFiles({parent: payload.parent}));
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_FILES, fetchFiles),
    takeEvery(types.FETCH_FILES_COMPLETED, fetchFilesCompleted),
    takeEvery(types.UPLOAD_FILE, uploadFile),
    takeEvery(types.CREATE_DIRECTORY, createDirectory),
    takeEvery(types.DELETE_FILE, deleteFile),
    takeEvery(types.DELETE_DIRECTORY, deleteDirectory),
  ]);
}
