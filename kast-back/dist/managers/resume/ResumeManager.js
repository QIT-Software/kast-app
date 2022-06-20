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
const IResumeStore_1 = __importDefault(require("../../database/stores/resume/IResumeStore"));
const IPdfService_1 = require("../../services/pdf/IPdfService");
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const IResumeManager_1 = __importDefault(require("./IResumeManager"));
const uuid_1 = require("uuid");
const IFileStore_1 = __importDefault(require("../../database/stores/file/IFileStore"));
const IAvikastFileStore_1 = __importDefault(require("../../database/stores/avikastFile/IAvikastFileStore"));
const AvikastFile_1 = require("../../entities/AvikastFile");
let ResumeManager = class ResumeManager extends IResumeManager_1.default {
    constructor(userStore, resumeStore, pdfService, fileStore, avikastFileStore) {
        super();
        this.userStore = userStore;
        this.resumeStore = resumeStore;
        this.pdfService = pdfService;
        this.fileStore = fileStore;
        this.avikastFileStore = avikastFileStore;
    }
    async createResume(userId, resume) {
        const user = await this.userStore.findUserByIdOrThrow(userId);
        const mediaLink = uuid_1.v4();
        const pdfName = await this.pdfService.createPdfResume(user, resume, mediaLink);
        const file = await this.fileStore.addResume(pdfName, 'pdf', mediaLink);
        await this.avikastFileStore.createFile(userId, `${user.name}-resume`, AvikastFile_1.AvikastFileType.File, file.id, undefined);
        await this.userStore.updateUserResumeUrl(userId, file.id);
        await this.resumeStore.createResume(userId, resume, pdfName);
    }
    async getResume(userId) {
        const resume = await this.resumeStore.findResumeByUserId(userId);
        return resume;
    }
    async getResumeLink(userId) {
        const user = await this.userStore.findUserByIdOrThrow(userId);
        if (!user.resumeUrl)
            throw new Error('no resume by this userId');
        return user.resumeUrl;
    }
};
ResumeManager = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IUserStore_1.default,
        IResumeStore_1.default,
        IPdfService_1.IPdfService,
        IFileStore_1.default,
        IAvikastFileStore_1.default])
], ResumeManager);
exports.default = ResumeManager;
//# sourceMappingURL=ResumeManager.js.map