import IBookmarkManager from './IBookmarkManager';
import IBookmarkStore from '../../database/stores/bookmark/IBookmarkStore';
import IUserStore from 'database/stores/user/IUserStore';
import IRoomStore from 'database/stores/room/IRoomStore';
export default class BookmarkManager extends IBookmarkManager {
    private readonly bookmarkStore;
    private readonly userStore;
    private readonly roomStore;
    constructor(bookmarkStore: IBookmarkStore, userStore: IUserStore, roomStore: IRoomStore);
    getBookmarks(userId: string): Promise<import("../../entities/Bookmark").default[]>;
    addBookmark(text: string, userId: string, roomId: string): Promise<boolean>;
}
