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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const IAvikastFileStore_1 = __importDefault(require("./IAvikastFileStore"));
const Mappers_1 = require("../../models/Mappers");
const AvikastFileModel_1 = require("../../models/AvikastFileModel");
const AvikastFile_1 = require("../../../entities/AvikastFile");
let AvikastFileStore = class AvikastFileStore extends IAvikastFileStore_1.default {
    constructor(avikastFileModel) {
        super();
        this.avikastFileModel = avikastFileModel;
        this.populateAvikastFile = [
            {
                path: 'user',
            },
            {
                path: 'file',
            },
        ];
    }
    async findFileByIdOrThrow(id) {
        const file = await this.avikastFileModel
            .findById(id)
            .populate(this.populateAvikastFile);
        if (!file)
            throw new Error('file is not exists');
        return Mappers_1.mapAvikastFileFromModel(file);
    }
    async getFiles(userId, parent) {
        return Mappers_1.mapAvikastFilesFromModel(await this.avikastFileModel
            .find({ user: userId, parent })
            .populate(this.populateAvikastFile));
    }
    async getImages(userId) {
        const files = await this.avikastFileModel
            .find({ user: userId })
            .populate(this.populateAvikastFile);
        return Mappers_1.mapAvikastFilesFromModel(files);
    }
    async createFile(userId, name, type, fileId, parent) {
        const model = {
            name,
            type,
            user: userId,
            file: fileId,
            parent,
        };
        const file = await this.avikastFileModel.create(model);
        return Mappers_1.mapAvikastFileFromModel(await file.populate(this.populateAvikastFile).execPopulate());
    }
    async deleteFile(id) {
        await this.avikastFileModel.deleteOne({ _id: id });
    }
};
AvikastFileStore = __decorate([
    __param(0, mongoose_1.InjectModel(AvikastFileModel_1.AvikastFileSchema.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AvikastFileStore);
exports.default = AvikastFileStore;
//# sourceMappingURL=AvikastFileStore.js.map