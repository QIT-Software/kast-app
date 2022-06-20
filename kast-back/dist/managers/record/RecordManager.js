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
const IRecordManager_1 = __importDefault(require("./IRecordManager"));
const IRecordStore_1 = __importDefault(require("../../database/stores/record/IRecordStore"));
const Mappers_1 = require("../../database/entities/Mappers");
let RecordManager = class RecordManager extends IRecordManager_1.default {
    constructor(recordStore) {
        super();
        this.recordStore = recordStore;
    }
    async getRecords(userId) {
        const records = await this.recordStore.getRecords(userId);
        return Mappers_1.mapRecordsFromDb(records);
    }
    async deleteRecord(userId, id) {
        const record = await this.recordStore.findRecordByIdOrThrow(id);
        await this.recordStore.deleteRecord(record.id);
    }
};
RecordManager = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IRecordStore_1.default])
], RecordManager);
exports.default = RecordManager;
//# sourceMappingURL=RecordManager.js.map