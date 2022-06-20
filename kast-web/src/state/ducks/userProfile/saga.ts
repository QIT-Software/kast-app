import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {AvikastApi as Api} from 'api';
import actions, {Save, SaveCompleted, UploadUserImage} from './actions';
import {Account} from 'entities/Account';
import {Action} from 'redux-actions';
import {alertActions} from '../alert';

function* fetchUserProfile() {
  try {
    const account: Account = yield Api.myAccount();
    const user = {
      id: account.user.id,
      name: account.user.name,
      email: account.user.email,
      country: account.user.country,
      city: account.user.city,
      position: account.user.position,
      telephone: account.user.telephone,
      dateOfBirth: account.user.dateOfBirth ? new Date(account.user.dateOfBirth) : null,
      avatarUrl: account.user.avatarUrl,
      tags: account.user.tags,
      skills: account.user.skills,
      mission: account.user.mission,
      vision: account.user.vision,
      interests: account.user.interests,
      referralCode: account.user.referralCode,
      referrer: account.user.referrer,
      logoUrl: account.user.logoUrl,
      backgroundUrl: account.user.backgroundUrl,
      resumeUrl: account.user.resumeUrl,
    };
    yield put(actions.fetchUserProfileCompleted(user));
  } catch (e) {
    yield put(actions.fetchUserProfileCompleted(e));
  }
}

function* save({payload}: Action<Save>) {
  try {
    const account: Account = yield Api.updateUserProfile(payload);
    yield put(actions.fetchUserProfile());
    yield put(actions.saveCompleted(account.user));
  } catch (e) {
    yield put(actions.saveCompleted(e));
  }
}

function* saveCompleted({payload, error}: Action<SaveCompleted>) {
  if (error) {
    yield put(alertActions.showError(payload));
    return;
  }
  yield put(actions.fetchUserProfile());
  yield put(
    alertActions.showMessage({message: 'Resume profile saved', title: 'Success'}),
  );
}

function* uploadUserImage({payload}: Action<UploadUserImage>) {
  try {
    const fileId = yield Api.uploadFile(payload.name, payload.file);
    const response = yield Api.updateUserImage(fileId);
    yield put(actions.fetchUserProfile());
    yield put(actions.saveCompleted(response));
  } catch (e) {
    yield put(actions.saveCompleted(e));
  }
}

function* uploadUserImageCompleted() {
  yield put(
    alertActions.showMessage({message: 'Resume avatar downloaded', title: 'Success'}),
  );
}

function* uploadUserLogoImage({payload}: Action<UploadUserImage>) {
  try {
    const fileId = yield Api.uploadFile(payload.name, payload.file);
    const response = yield Api.updateUserLogoImage(fileId);
    yield put(actions.fetchUserProfile());
    yield put(actions.saveCompleted(response));
  } catch (e) {
    yield put(actions.saveCompleted(e));
  }
}

function* uploadUserLogoImageCompleted() {
  yield put(
    alertActions.showMessage({message: 'User avatar downloaded', title: 'Success'}),
  );
}

function* uploadUserBackgroundImage({payload}: Action<UploadUserImage>) {
  try {
    const fileId = yield Api.uploadFile(payload.name, payload.file);
    const response = yield Api.updateUserBackgroundImage(fileId);
    yield put(actions.fetchUserProfile());
    yield put(actions.saveCompleted(response));
  } catch (e) {
    yield put(actions.saveCompleted(e));
  }
}

function* uploadUserBackgroundImageCompleted() {
  yield put(
    alertActions.showMessage({message: 'User avatar downloaded', title: 'Success'}),
  );
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_USER_PROFILE, fetchUserProfile),
    takeEvery(types.SAVE, save),
    takeEvery(types.SAVE_COMPLETED, saveCompleted),

    takeEvery(types.UPLOAD_USER_IMAGE, uploadUserImage),
    takeEvery(types.UPLOAD_USER_LOGO_IMAGE, uploadUserLogoImage),
    takeEvery(types.UPLOAD_USER_IMAGE_COMPLETED, uploadUserImageCompleted),
    takeEvery(types.UPLOAD_USER_BACKGROUND_IMAGE, uploadUserBackgroundImage),
    takeEvery(
      types.UPLOAD_USER_BACKGROUND_IMAGE_COMPLETED,
      uploadUserBackgroundImageCompleted,
    ),
    takeEvery(types.UPLOAD_USER_LOGO_IMAGE_COMPLETED, uploadUserLogoImageCompleted),
  ]);
}
