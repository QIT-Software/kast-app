"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Mappers_1 = require("../../database/entities/Mappers");
const IBookmarkManager_1 = __importDefault(require("./IBookmarkManager"));
const IBookmarkStore_1 = __importDefault(require("../../database/stores/bookmark/IBookmarkStore"));
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const uuid_1 = require("uuid");
const IRoomStore_1 = __importDefault(require("../../database/stores/room/IRoomStore"));
let BookmarkManager = class BookmarkManager extends IBookmarkManager_1.default {
    constructor(bookmarkStore, userStore, roomStore) {
        super();
        this.bookmarkStore = bookmarkStore;
        this.userStore = userStore;
        this.roomStore = roomStore;
    }
    async getBookmarks(userId) {
        const bookmarks = await this.bookmarkStore.getBookmarks(userId);
        return Mappers_1.mapBookmarksFromDB(bookmarks);
    }
    async addBookmark(text, userId, roomId) {
        const room = await this.roomStore.findRoomByIdOrThrow(roomId);
        return this.bookmarkStore.addBookmark({
            id: uuid_1.v4(),
            date: new Date(),
            topic: room.name,
            text,
            user: userId,
        });
    }
};
BookmarkManager = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IBookmarkStore_1.default,
        IUserStore_1.default,
        IRoomStore_1.default])
], BookmarkManager);
exports.default = BookmarkManager;
//# sourceMappingURL=BookmarkManager.js.map