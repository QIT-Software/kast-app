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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const AuthGuard_1 = __importDefault(require("../../enhancers/guards/AuthGuard"));
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const Mappers_1 = require("../entities/Mappers");
const IBookmarkManager_1 = __importDefault(require("../../managers/bookmark/IBookmarkManager"));
const Bookmark_1 = __importDefault(require("../entities/bookmark/Bookmark"));
const SessionInfo_1 = __importDefault(require("../../entities/SessionInfo"));
let BookmarkResolver = class BookmarkResolver {
    constructor(bookmarksManager) {
        this.bookmarksManager = bookmarksManager;
    }
    async bookmarks({ userId }) {
        return Mappers_1.mapBookmarksToGQL(await this.bookmarksManager.getBookmarks(userId));
    }
    async addBookmark({ userId }, text, roomId) {
        return this.bookmarksManager.addBookmark(text, userId, roomId);
    }
};
__decorate([
    graphql_1.Query(() => [Bookmark_1.default]),
    __param(0, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookmarkResolver.prototype, "bookmarks", null);
__decorate([
    graphql_1.Mutation(() => [Boolean]),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('text')),
    __param(2, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], BookmarkResolver.prototype, "addBookmark", null);
BookmarkResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(AuthGuard_1.default),
    __metadata("design:paramtypes", [IBookmarkManager_1.default])
], BookmarkResolver);
exports.BookmarkResolver = BookmarkResolver;
//# sourceMappingURL=BookmarkResolver.js.map