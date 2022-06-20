import IBookmarkManager from '../../managers/bookmark/IBookmarkManager';
import Bookmark from '../entities/bookmark/Bookmark';
import SessionInfo from 'entities/SessionInfo';
export declare class BookmarkResolver {
    private readonly bookmarksManager;
    constructor(bookmarksManager: IBookmarkManager);
    bookmarks({ userId }: SessionInfo): Promise<Bookmark[]>;
    addBookmark({ userId }: SessionInfo, text: string, roomId: string): Promise<boolean>;
}
