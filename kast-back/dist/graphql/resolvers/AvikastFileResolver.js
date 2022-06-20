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
const IAvikastFileManager_1 = __importDefault(require("../../managers/avikastFile/IAvikastFileManager"));
const AvikastFile_1 = __importDefault(require("../entities/avikastFile/AvikastFile"));
const SessionInfo_1 = __importDefault(require("../../entities/SessionInfo"));
let AvikastFileResolver = class AvikastFileResolver {
    constructor(avikastFilesManager) {
        this.avikastFilesManager = avikastFilesManager;
    }
    async avikastFiles({ userId }, parent) {
        return Mappers_1.mapAvikastFilesToGQL(await this.avikastFilesManager.getFiles(userId, parent));
    }
    async getImages({ userId }) {
        return Mappers_1.mapAvikastFilesToGQL(await this.avikastFilesManager.getImages(userId));
    }
    async addAvikastFile({ userId }, name, fileId, parent) {
        return Mappers_1.mapAvikastFileToGQL(await this.avikastFilesManager.addFile(userId, name, fileId, parent));
    }
    async createAvikastDirectory({ userId }, name, parent) {
        return Mappers_1.mapAvikastFileToGQL(await this.avikastFilesManager.createDirectory(userId, name, parent));
    }
    async deleteAvikastFile({ userId }, id) {
        await this.avikastFilesManager.deleteFile(userId, id);
        return true;
    }
    async deleteAvikastDirectory({ userId }, id) {
        await this.avikastFilesManager.deleteDirectory(userId, id);
        return true;
    }
};
__decorate([
    graphql_1.Query(() => [AvikastFile_1.default]),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('parent', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AvikastFileResolver.prototype, "avikastFiles", null);
__decorate([
    graphql_1.Query(() => [AvikastFile_1.default]),
    __param(0, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AvikastFileResolver.prototype, "getImages", null);
__decorate([
    graphql_1.Mutation(() => AvikastFile_1.default),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('name')),
    __param(2, graphql_1.Args('fileId')),
    __param(3, graphql_1.Args('parent', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], AvikastFileResolver.prototype, "addAvikastFile", null);
__decorate([
    graphql_1.Mutation(() => AvikastFile_1.default),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('name')),
    __param(2, graphql_1.Args('parent', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AvikastFileResolver.prototype, "createAvikastDirectory", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AvikastFileResolver.prototype, "deleteAvikastFile", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AvikastFileResolver.prototype, "deleteAvikastDirectory", null);
AvikastFileResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(AuthGuard_1.default),
    __metadata("design:paramtypes", [IAvikastFileManager_1.default])
], AvikastFileResolver);
exports.AvikastFileResolver = AvikastFileResolver;
//# sourceMappingURL=AvikastFileResolver.js.map