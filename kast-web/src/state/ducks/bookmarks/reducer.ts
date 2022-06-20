import {handleActions, ReducerNextThrow} from 'redux-actions';
import {empty, failed, loading, success} from '../../entities/LoadableContainer';
import {BookmarksReducerState} from '../../entities/State';
import types from './types';
import {FetchBookmarksCompleted} from './actions';

const fetchBookmarksCompleted: ReducerNextThrow<
  BookmarksReducerState,
  FetchBookmarksCompleted
> = {
  next: (state, {payload}) => ({...state, ...success({data: payload.bookmarks})}),
  throw: (_, {payload}) => failed(payload),
};

export default handleActions<BookmarksReducerState, any>(
  {
    [types.FETCH_BOOKMARKS]: (state) => loading(state),
    [types.FETCH_BOOKMARKS_COMPLETED]: fetchBookmarksCompleted,
  },
  empty(),
);
