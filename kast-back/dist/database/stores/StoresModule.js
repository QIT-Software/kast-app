"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const DatabaseModule_1 = require("../DatabaseModule");
const ILoginStore_1 = __importDefault(require("./login/ILoginStore"));
const LoginStore_1 = __importDefault(require("./login/LoginStore"));
const ISessionStore_1 = __importDefault(require("./session/ISessionStore"));
const SessionStore_1 = __importDefault(require("./session/SessionStore"));
const IUserStore_1 = __importDefault(require("./user/IUserStore"));
const UserStore_1 = __importDefault(require("./user/UserStore"));
const IRoomStore_1 = __importDefault(require("./room/IRoomStore"));
const RoomStore_1 = __importDefault(require("./room/RoomStore"));
const IBookmarkStore_1 = __importDefault(require("./bookmark/IBookmarkStore"));
const BookmarkStore_1 = __importDefault(require("./bookmark/BookmarkStore"));
const IAvikastFileStore_1 = __importDefault(require("./avikastFile/IAvikastFileStore"));
const AvikastFileStore_1 = __importDefault(require("./avikastFile/AvikastFileStore"));
const IMessageStore_1 = __importDefault(require("./message/IMessageStore"));
const MessageStore_1 = __importDefault(require("./message/MessageStore"));
const IRecordStore_1 = __importDefault(require("./record/IRecordStore"));
const RecordStore_1 = __importDefault(require("./record/RecordStore"));
const IFileStore_1 = __importDefault(require("./file/IFileStore"));
const FileStore_1 = __importDefault(require("./file/FileStore"));
const IResumeStore_1 = __importDefault(require("./resume/IResumeStore"));
const ResumeStore_1 = __importDefault(require("./resume/ResumeStore"));
let StoresModule = class StoresModule {
};
StoresModule = __decorate([
    common_1.Module({
        imports: [
            DatabaseModule_1.DatabaseModule,
        ],
        providers: [
            {
                provide: IUserStore_1.default,
                useClass: UserStore_1.default,
            },
            {
                provide: ILoginStore_1.default,
                useClass: LoginStore_1.default,
            },
            {
                provide: ISessionStore_1.default,
                useClass: SessionStore_1.default,
            },
            {
                provide: IRoomStore_1.default,
                useClass: RoomStore_1.default,
            },
            {
                provide: IBookmarkStore_1.default,
                useClass: BookmarkStore_1.default,
            },
            {
                provide: IAvikastFileStore_1.default,
                useClass: AvikastFileStore_1.default,
            },
            {
                provide: IMessageStore_1.default,
                useClass: MessageStore_1.default,
            },
            {
                provide: IRecordStore_1.default,
                useClass: RecordStore_1.default,
            },
            {
                provide: IFileStore_1.default,
                useClass: FileStore_1.default,
            },
            {
                provide: IResumeStore_1.default,
                useClass: ResumeStore_1.default,
            },
        ],
        exports: [
            ISessionStore_1.default,
            ILoginStore_1.default,
            IUserStore_1.default,
            IRoomStore_1.default,
            IBookmarkStore_1.default,
            IAvikastFileStore_1.default,
            IMessageStore_1.default,
            IRecordStore_1.default,
            IFileStore_1.default,
            IResumeStore_1.default,
        ],
    })
], StoresModule);
exports.StoresModule = StoresModule;
//# sourceMappingURL=StoresModule.js.map