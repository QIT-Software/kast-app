import { Model } from 'mongoose';
import IBookmarkStore from './IBookmarkStore';
import BookmarkModel from '../../models/BookmarkModel';
export default class BookmarkStore extends IBookmarkStore {
    private bookmarkModel;
    constructor(bookmarkModel: Model<BookmarkModel>);
    private readonly populateBookmark;
    getBookmarks(userId: string): Promise<import("../../entities/Bookmark").default[]>;
    findBookmarkByText(text: string): Promise<import("../../entities/Bookmark").default | undefined>;
    addBookmark(bookmark: {
        id: string;
        date: Date;
        topic: string;
        text: string;
        user: string;
    }): Promise<boolean>;
}
