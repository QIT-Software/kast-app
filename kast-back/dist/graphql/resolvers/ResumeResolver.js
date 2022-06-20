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
const SessionInfo_1 = __importDefault(require("../../entities/SessionInfo"));
const Resume_1 = require("../entities/resume/Resume");
const IResumeManager_1 = __importDefault(require("../../managers/resume/IResumeManager"));
let ResumeResolver = class ResumeResolver {
    constructor(resumeManager) {
        this.resumeManager = resumeManager;
    }
    async saveResume({ userId }, resume) {
        await this.resumeManager.createResume(userId, resume);
        return true;
    }
    async getResume({ userId }) {
        const resume = await this.resumeManager.getResume(userId);
        return resume;
    }
    async getResumeLink({ userId }) {
        const link = await this.resumeManager.getResumeLink(userId);
        return link;
    }
};
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('resume')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Resume_1.ResumeInput]),
    __metadata("design:returntype", Promise)
], ResumeResolver.prototype, "saveResume", null);
__decorate([
    graphql_1.Query(() => Resume_1.ResumeOutput, { nullable: true }),
    __param(0, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResumeResolver.prototype, "getResume", null);
__decorate([
    graphql_1.Query(() => String, { nullable: true }),
    __param(0, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResumeResolver.prototype, "getResumeLink", null);
ResumeResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(AuthGuard_1.default),
    __metadata("design:paramtypes", [IResumeManager_1.default])
], ResumeResolver);
exports.ResumeResolver = ResumeResolver;
//# sourceMappingURL=ResumeResolver.js.map