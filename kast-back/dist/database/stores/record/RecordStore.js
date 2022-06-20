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
const IRecordStore_1 = __importDefault(require("./IRecordStore"));
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const RecordModel_1 = __importStar(require("../../models/RecordModel"));
const Mappers_1 = require("../../models/Mappers");
let RecordStore = class RecordStore extends IRecordStore_1.default {
    constructor(recordModel) {
        super();
        this.recordModel = recordModel;
        this.populateRecord = [
            { path: 'file' },
            { path: 'user' },
        ];
    }
    async createRecord(userId, recordName, recordingId, fileId) {
        const updateObject = {
            id: recordingId,
            name: recordName,
            date: new Date(),
            user: userId,
            file: fileId,
        };
        await this.recordModel.create(updateObject);
    }
    async getRecords(userId) {
        const rec = await this.recordModel.find({ user: userId }).populate(this.populateRecord);
        return Mappers_1.mapRecordsFromModel(rec);
    }
    async findRecordByIdOrThrow(id) {
        const record = await this.recordModel.findById(id).populate(this.populateRecord);
        if (!record)
            throw new Error('file is not exists');
        return Mappers_1.mapRecordFromModel(record);
    }
    async deleteRecord(id) {
        await this.recordModel.deleteOne({ _id: id });
    }
};
RecordStore = __decorate([
    __param(0, mongoose_1.InjectModel(RecordModel_1.RecordSchema.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RecordStore);
exports.default = RecordStore;
//# sourceMappingURL=RecordStore.js.map