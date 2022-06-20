/* eslint-disable */
import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {AvikastApi as Api} from 'api';
import actions, {Resume, UploadPdf} from './actions';
import {Action} from 'redux-actions';
import {alertActions} from '../alert';
import {routerActions} from '../router';
import {userProfileActions} from '../userProfile';

import * as H from 'history';



function* saveUserResume({payload}: Action<Resume>) {
  try {
    console.log(11111,payload)
    const {summary, experience, education, awards} = payload;
    yield Api.saveResume({summary, experience, education, awards});
    yield put(actions.saveUserResumeCompleted());
  } catch (e) {
    yield put(actions.saveUserResumeCompleted(e));
  }
}

function* saveUserResumeCompleted() {
  yield put(
    alertActions.showMessage({message: 'Resume avatar downloaded', title: 'Success'}),
  );
}

function* fetchUserResume() {
  try {
    const resume: Resume = yield Api.getResume();
    yield put(actions.fetchUserResumeCompleted(resume));
  } catch (e) {
    yield put(actions.fetchUserResumeCompleted(e));
  }
}

function* fetchUserResumeCompleted({payload, error}: Action<Resume>) {
  console.log('fetchUserResumeCompleted payload', payload);
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* fetchUserResumeLink() {
  try {
    const link: string = yield Api.getResumeLink();
    yield put(actions.fetchUserResumeLinkCompleted(link));
  } catch (e) {
    yield put(actions.fetchUserResumeLinkCompleted(e));
  }
}

function* fetchUserResumeLinkCompleted({payload, error}: Action<string>) {
  console.log('fetchUserResumeLinkCompleted payload', payload);
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* uploadPdf({payload}: Action<UploadPdf>) {
  try {
    const fileId: string = yield Api.uploadFile(payload.name, payload.file);
    yield Api.uploadResume(fileId)
    yield put(actions.fetchUserResumeLink());
    const h: H.History = payload.history
    yield put(routerActions.navigateToPdf({history: h}))
    yield put(userProfileActions.fetchUserProfile())
  } catch (e) {
    yield put(actions.fetchUserResumeLink(e));
  }
}

function* uploadPdfCompleted({payload, error}: Action<string>) {
  console.log('uploadPdfCompleted payload', payload);
  if (error) {
    yield put(alertActions.showError(error));
  }
}

export default function* () {
  yield all([
    takeEvery(types.SAVE_USER_RESUME, saveUserResume),
    takeEvery(types.SAVE_USER_RESUME_COMPLETED, saveUserResumeCompleted),

    takeEvery(types.FETCH_USER_RESUME, fetchUserResume),
    takeEvery(types.FETCH_USER_RESUME_COMPLETED, fetchUserResumeCompleted),

    takeEvery(types.FETCH_USER_RESUME_LINK, fetchUserResumeLink),
    takeEvery(types.FETCH_USER_RESUME_LINK_COMPLETED, fetchUserResumeLinkCompleted),

    takeEvery(types.UPLOAD_PDF, uploadPdf),
    takeEvery(types.UPLOAD_PDF_COMPLETED, uploadPdfCompleted),
  ]);
}
