import {all, takeEvery, put} from 'redux-saga/effects';
import types from './types';
import {AvikastApi as Api} from 'api';
import actions, {FetchBookmarksCompleted} from './actions';
import Bookmark from '../../../entities/Bookmark';
import {alertActions} from '../alert';
import {Action} from 'redux-actions';
import {NavigationPayload} from 'state/ducks/router/actions';
import {actions as snackActions} from 'state/ducks/snackBar';
import {processError} from 'state/ducks/alert/saga';

function* fetchBookmarks() {
  try {
    const bookmarks: Bookmark[] = yield Api.getBookmarks();
    yield put(actions.fetchBookmarksCompleted({bookmarks}));
  } catch (e) {
    yield put(actions.fetchBookmarksCompleted(e));
  }
}

function* fetchBookmarksCompleted({error}: Action<FetchBookmarksCompleted>) {
  if (error) {
    yield put(alertActions.showError(error));
  }
}

function* addBookmark({payload}: Action<{text: string; roomId: string}>) {
  try {
    yield Api.addBookmark(payload.text, payload.roomId);
  } catch (error) {
    yield put(actions.addBookmarkCompleted(error));
  }
}

function* addBookmarkCompleted({payload, error}: Action<NavigationPayload>) {
  if (error) {
    yield put(
      snackActions.showSnackbar({message: processError({error: payload}), type: 'error'}),
    );
  }
  yield put(
    snackActions.showSnackbar({
      message: 'Bookmark added!',
      type: 'success',
    }),
  );
}

export default function* () {
  yield all([
    takeEvery(types.FETCH_BOOKMARKS, fetchBookmarks),
    takeEvery(types.FETCH_BOOKMARKS_COMPLETED, fetchBookmarksCompleted),
    takeEvery(types.ADD_BOOKMARK, addBookmark),
    takeEvery(types.ADD_BOOKMARK_COMPLETED, addBookmarkCompleted),
  ]);
}
