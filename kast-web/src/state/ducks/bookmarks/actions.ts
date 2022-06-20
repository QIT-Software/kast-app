import {createAction} from 'redux-actions';
import types from './types';
import Bookmark from 'entities/Bookmark';

export type FetchBookmarksCompleted = {bookmarks: Bookmark[]};

export default {
  fetchBookmarks: createAction(types.FETCH_BOOKMARKS),
  fetchBookmarksCompleted: createAction<FetchBookmarksCompleted>(
    types.FETCH_BOOKMARKS_COMPLETED,
  ),
  addBookmark: createAction(types.ADD_BOOKMARK),
  addBookmarkCompleted: createAction(types.ADD_BOOKMARK_COMPLETED),
};
