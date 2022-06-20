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
const StoresModule_1 = require("../database/stores/StoresModule");
const IAccountManager_1 = __importDefault(require("./account/IAccountManager"));
const AccountManager_1 = __importDefault(require("./account/AccountManager"));
const AuthModule_1 = require("./auth/AuthModule");
const ServicesModule_1 = require("../services/ServicesModule");
const IRoomManager_1 = __importDefault(require("./room/IRoomManager"));
const RoomManager_1 = __importDefault(require("./room/RoomManager"));
const IMediasoupManager_1 = __importDefault(require("./mediasoup/IMediasoupManager"));
const MediasoupManager_1 = __importDefault(require("./mediasoup/MediasoupManager"));
const IBookmarkManager_1 = __importDefault(require("./bookmark/IBookmarkManager"));
const BookmarkManager_1 = __importDefault(require("./bookmark/BookmarkManager"));
const IAvikastFileManager_1 = __importDefault(require("./avikastFile/IAvikastFileManager"));
const AvikastFileManager_1 = __importDefault(require("./avikastFile/AvikastFileManager"));
const MessageManager_1 = __importDefault(require("./message/MessageManager"));
const IMessageManager_1 = __importDefault(require("./message/IMessageManager"));
const IRecordManager_1 = __importDefault(require("./record/IRecordManager"));
const RecordManager_1 = __importDefault(require("./record/RecordManager"));
const IFileManager_1 = __importDefault(require("./file/IFileManager"));
const FileManager_1 = __importDefault(require("./file/FileManager"));
const ILogger_1 = __importDefault(require("../utils/ILogger"));
const Logger_1 = __importDefault(require("../utils/Logger"));
const IResumeManager_1 = __importDefault(require("./resume/IResumeManager"));
const ResumeManager_1 = __importDefault(require("./resume/ResumeManager"));
let ManagerModule = class ManagerModule {
};
ManagerModule = __decorate([
    common_1.Module({
        imports: [
            StoresModule_1.StoresModule,
            AuthModule_1.AuthModule,
            ServicesModule_1.ServicesModule,
        ],
        providers: [
            {
                provide: IAccountManager_1.default,
                useClass: AccountManager_1.default,
            },
            {
                provide: IRoomManager_1.default,
                useClass: RoomManager_1.default,
            },
            {
                provide: IMediasoupManager_1.default,
                useClass: MediasoupManager_1.default,
            },
            {
                provide: IBookmarkManager_1.default,
                useClass: BookmarkManager_1.default,
            },
            {
                provide: IAvikastFileManager_1.default,
                useClass: AvikastFileManager_1.default,
            },
            {
                provide: IAvikastFileManager_1.default,
                useClass: AvikastFileManager_1.default,
            },
            {
                provide: IMessageManager_1.default,
                useClass: MessageManager_1.default,
            },
            {
                provide: IRecordManager_1.default,
                useClass: RecordManager_1.default,
            },
            {
                provide: IFileManager_1.default,
                useClass: FileManager_1.default,
            },
            {
                provide: IResumeManager_1.default,
                useClass: ResumeManager_1.default,
            },
            {
                provide: ILogger_1.default,
                useClass: Logger_1.default,
            },
        ],
        exports: [
            IAccountManager_1.default,
            AuthModule_1.AuthModule,
            IRoomManager_1.default,
            IMediasoupManager_1.default,
            IBookmarkManager_1.default,
            IAvikastFileManager_1.default,
            IMessageManager_1.default,
            IRecordManager_1.default,
            IFileManager_1.default,
            ILogger_1.default,
            IResumeManager_1.default,
        ],
    })
], ManagerModule);
exports.ManagerModule = ManagerModule;
//# sourceMappingURL=ManagerModule.js.map