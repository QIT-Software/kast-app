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
const IRecordManager_1 = __importDefault(require("../../managers/record/IRecordManager"));
const Record_1 = __importDefault(require("../entities/record/Record"));
const SessionInfo_1 = __importDefault(require("../../entities/SessionInfo"));
let RecordResolver = class RecordResolver {
    constructor(recordManager) {
        this.recordManager = recordManager;
    }
    async records({ userId }) {
        return Mappers_1.mapRecordsToGQL(await this.recordManager.getRecords(userId));
    }
    async deleteRecord({ userId }, id) {
        await this.recordManager.deleteRecord(userId, id);
        return true;
    }
};
__decorate([
    graphql_1.Query(() => [Record_1.default]),
    __param(0, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecordResolver.prototype, "records", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()), __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RecordResolver.prototype, "deleteRecord", null);
RecordResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(AuthGuard_1.default),
    __metadata("design:paramtypes", [IRecordManager_1.default])
], RecordResolver);
exports.RecordResolver = RecordResolver;
//# sourceMappingURL=RecordResolver.js.map