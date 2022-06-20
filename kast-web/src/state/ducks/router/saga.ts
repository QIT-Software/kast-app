import {all, takeEvery} from 'redux-saga/effects';
import types from './types';
import {NavigateToReferrers, NavigateToRoom, NavigationPayload} from './actions';
import {Action} from 'redux-actions';
import * as H from 'history';
import {FetchUser} from 'state/ducks/user/actions';

function push(history: H.History, path: string, replace: boolean = false) {
  if (replace) {
    history.replace(path);
  } else {
    history.push(path);
  }
}

function goBack({payload}: Action<NavigationPayload>) {
  payload.history.goBack();
}

function navigateToAuth({payload}: Action<NavigationPayload>) {
  payload.history.push('/auth');
}

function navigateToSignIn({payload}: Action<NavigationPayload>) {
  payload.history.push('/signin');
}

function navigateToMain({payload}: Action<NavigationPayload>) {
  payload.history.push('/main');
}

function navigateToRoom({payload}: Action<NavigateToRoom>) {
  const path = `/room/${payload.roomId}?enableMicrophone=${payload.enableMicrophone}&enableCamera=${payload.enableCamera}`;
  const replace =
    payload.history.location.pathname.startsWith('/main/createWebinar') ||
    payload.history.location.pathname.startsWith('/main/createMeeting');
  push(payload.history, path, replace);
}

function navigateToUserReferrers({payload}: Action<NavigateToReferrers>) {
  payload.history.push(`/userReferrals/${payload.id}`);
}

function navigateToUser({payload}: Action<FetchUser>) {
  payload.history.push(`/user/${payload.userId}`);
}

function navigateToPdf({payload}: Action<NavigationPayload>) {
  payload.history.push(`/userprofile/pdf`);
}

export default function* () {
  yield all([
    takeEvery(types.GO_BACK, goBack),
    takeEvery(types.NAVIGATE_TO_AUTH, navigateToAuth),
    takeEvery(types.NAVIGATE_TO_SIGN_IN, navigateToSignIn),
    takeEvery(types.NAVIGATE_TO_MAIN, navigateToMain),
    takeEvery(types.NAVIGATE_TO_ROOM, navigateToRoom),
    takeEvery(types.NAVIGATE_TO_REFERRERS, navigateToUserReferrers),
    takeEvery(types.NAVIGATE_TO_USER, navigateToUser),
    takeEvery(types.NAVIGATE_TO_PDF, navigateToPdf),
  ]);
}
