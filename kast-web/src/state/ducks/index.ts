import {saga as authSaga} from './auth';
import authReducer from './auth/reducer';
import {saga as routerSaga} from './router';
import {saga as alertSaga} from './alert';
import {reducer as roomReducer, saga as roomSaga} from './room';
import {saga as chatSaga, reducer as chatReducer} from './chat';
import {reducer as snackBarReducer} from 'state/ducks/snackBar';
import {all} from 'redux-saga/effects';
import State from 'state/entities/State';
import {combineReducers} from 'redux';
import {reducer as userProfileReducer, saga as userProfileSaga} from './userProfile';
import {reducer as resumeReducer, saga as resumeSaga} from 'state/ducks/resume';
import {reducer as bookmarksReducer, saga as bookmarksSaga} from 'state/ducks/bookmarks';
import {reducer as dashboardReducer, saga as dashboardSaga} from './dashboard';
import {reducer as mediasoupReducer, saga as mediasoupSaga} from './mediasoup';
import {reducer as directoriesReducer, saga as directoriesSaga} from './files';
import {reducer as recordsReducer, saga as recordsSaga} from './records';
import {reducer as participantsReducer, saga as participantsSaga} from './participants';
import {reducer as userRoomsReducer, saga as userRoomsSaga} from './userRooms';
import {reducer as userReducer, saga as userSaga} from './user';

import {reducer as userReferrersReducer, saga as userReferrersSaga} from './referals';

export const rootReducer = combineReducers<State>({
  auth: authReducer,
  snackBar: snackBarReducer,
  userProfile: userProfileReducer,
  bookmarks: bookmarksReducer,
  dashboard: dashboardReducer,
  files: directoriesReducer,
  chat: chatReducer,
  mediasoup: mediasoupReducer,
  records: recordsReducer,
  room: roomReducer,
  participants: participantsReducer,
  userRooms: userRoomsReducer,
  resume: resumeReducer,
  userReferrers: userReferrersReducer,
  user: userReducer,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    routerSaga(),
    alertSaga(),
    userProfileSaga(),
    dashboardSaga(),
    bookmarksSaga(),
    directoriesSaga(),
    roomSaga(),
    mediasoupSaga(),
    chatSaga(),
    recordsSaga(),
    participantsSaga(),
    userRoomsSaga(),
    userReferrersSaga(),
    resumeSaga(),
    userSaga(),
  ]);
}
