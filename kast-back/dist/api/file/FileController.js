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
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const IFileManager_1 = __importDefault(require("../../managers/file/IFileManager"));
const Ignore_1 = __importDefault(require("../../enhancers/decorators/Ignore"));
const Common_1 = require("../../entities/Common");
let FilesController = class FilesController {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }
    async uploadFile(file) {
        const image = await this.fileManager.addFile(file.originalname, file.mimetype, file.buffer);
        return image.id;
    }
    async getFile(id, res) {
        const file = await this.fileManager.getFile({ id });
        file.stream
            .on('error', (err) => {
            res.status(400).send(err);
        })
            .pipe(res.attachment(file.name));
    }
};
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    Ignore_1.default('Authorization'),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadFile", null);
__decorate([
    common_1.Get(':id'),
    Ignore_1.default('Platform', 'AppType', 'Authorization'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getFile", null);
FilesController = __decorate([
    common_1.Controller('api/files'),
    __metadata("design:paramtypes", [IFileManager_1.default])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=FileController.js.map