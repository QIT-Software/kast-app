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
const IFileManager_1 = __importDefault(require("./IFileManager"));
const IFileStore_1 = __importDefault(require("../../database/stores/file/IFileStore"));
const uuid_1 = require("uuid");
const file_storage_1 = require("@spryrocks/file-storage");
const AvikastError_1 = __importDefault(require("../../AvikastError"));
let FileManager = class FileManager extends IFileManager_1.default {
    constructor(fileStore, fileStorage) {
        super();
        this.fileStore = fileStore;
        this.fileStorage = fileStorage;
    }
    async addFile(name, mimeType, buffer) {
        const mediaLink = uuid_1.v4();
        const file = await this.fileStore.addFile(name, mimeType, mediaLink);
        await this.fileStorage.addFile(mediaLink, buffer);
        return { id: file.id };
    }
    async getFile(file) {
        const f = await this.fileStore.getFile(file);
        if (!f)
            throw new AvikastError_1.default('File not found');
        const { stream } = await this.fileStorage.getFile(f.mediaLink);
        return { stream, name: f.name };
    }
};
FileManager = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IFileStore_1.default,
        file_storage_1.IFileStorage])
], FileManager);
exports.default = FileManager;
//# sourceMappingURL=FileManager.js.map