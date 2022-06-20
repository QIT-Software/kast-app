import Bookmark from 'database/entities/Bookmark';
export default abstract class IBookmarkStore {
    abstract getBookmarks(userId: string): Promise<Bookmark[]>;
    abstract addBookmark(bookmark: {
        id: string;
        date: Date;
        topic: string;
        text: string;
        user: string;
    }): Promise<boolean>;
}
