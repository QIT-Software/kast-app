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
const IAvikastFileManager_1 = __importDefault(require("./IAvikastFileManager"));
const IAvikastFileStore_1 = __importDefault(require("../../database/stores/avikastFile/IAvikastFileStore"));
const AvikastFile_1 = require("../../entities/AvikastFile");
let AvikastFileManager = class AvikastFileManager extends IAvikastFileManager_1.default {
    constructor(avikastFileStore) {
        super();
        this.avikastFileStore = avikastFileStore;
    }
    async getFiles(userId, parent) {
        return Mappers_1.mapAvikastFilesFromDB(await this.avikastFileStore.getFiles(userId, parent));
    }
    async getImages(userId) {
        const files = Mappers_1.mapAvikastFilesFromDB(await this.avikastFileStore.getImages(userId));
        const images = [];
        files.map((el) => {
            const fileType = el.name.substring(el.name.length - 3, el.name.length);
            if (fileType === 'jpg' || fileType === 'png') {
                images.push(el);
            }
        });
        return images;
    }
    async addFile(userId, name, fileId, parent) {
        return Mappers_1.mapAvikastFileFromDB(await this.avikastFileStore.createFile(userId, name, AvikastFile_1.AvikastFileType.File, fileId, parent));
    }
    async createDirectory(userId, name, parent) {
        return Mappers_1.mapAvikastFileFromDB(await this.avikastFileStore.createFile(userId, name, AvikastFile_1.AvikastFileType.Directory, undefined, parent));
    }
    async deleteFile(userId, id) {
        const file = await this.avikastFileStore.findFileByIdOrThrow(id);
        if (file.type !== AvikastFile_1.AvikastFileType.File)
            throw new Error('This is not a file');
        await this.avikastFileStore.deleteFile(file.id);
    }
    async deleteDirectory(userId, id) {
        const file = await this.avikastFileStore.findFileByIdOrThrow(id);
        if (file.type !== AvikastFile_1.AvikastFileType.Directory)
            throw new Error('This is not a directory');
        await this.avikastFileStore.deleteFile(file.id);
    }
};
AvikastFileManager = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IAvikastFileStore_1.default])
], AvikastFileManager);
exports.default = AvikastFileManager;
//# sourceMappingURL=AvikastFileManager.js.map