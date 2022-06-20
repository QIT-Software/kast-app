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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const IFileStore_1 = __importDefault(require("./IFileStore"));
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const FileModel_1 = __importStar(require("../../models/FileModel"));
const mongoose_2 = require("@nestjs/mongoose");
const Mappers_1 = require("../../models/Mappers");
let FileStore = class FileStore {
    constructor(fileModel) {
        this.fileModel = fileModel;
        this.populateFiles = {
            path: 'files',
        };
    }
    async addFile(name, mimeType, mediaLink) {
        const newFile = {
            mediaLink,
            name,
            mimeType,
        };
        return Mappers_1.mapFileFromModel(await this.fileModel.create(newFile));
    }
    async getFile(file) {
        const result = await this.fileModel.findById(file.id);
        return result ? Mappers_1.mapFileFromModel(result) : undefined;
    }
    async addResume(name, mimeType, mediaLink) {
        const newFile = {
            mediaLink,
            name,
            mimeType,
        };
        const updateResume = await this.fileModel.findOneAndUpdate({ name, mimeType }, { newFile });
        if (!updateResume) {
            return Mappers_1.mapFileFromModel(await this.fileModel.create(newFile));
        }
        return Mappers_1.mapFileFromModel(updateResume);
    }
};
FileStore = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(FileModel_1.FileSchema.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], FileStore);
exports.default = FileStore;
//# sourceMappingURL=FileStore.js.map