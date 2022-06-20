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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const IResumeStore_1 = __importDefault(require("./IResumeStore"));
const Mappers_1 = require("../../models/Mappers");
const Resume_1 = __importDefault(require("../../../entities/Resume"));
const ResumeModel_1 = __importStar(require("../../models/ResumeModel"));
let ResumeStore = class ResumeStore extends IResumeStore_1.default {
    constructor(resumeModel) {
        super();
        this.resumeModel = resumeModel;
        this.populateResume = [
            { path: 'resume' },
            { path: 'user' },
        ];
    }
    async createResume(userId, resume, fileName) {
        const newResume = {
            user: userId,
            summary: resume.summary,
            experience: resume.experience,
            education: resume.education,
            awards: resume.awards,
            fileName,
        };
        const oldResume = await this.resumeModel.findOne({ user: userId });
        if (oldResume) {
            await this.resumeModel.updateOne({ user: userId }, newResume, {
                new: true,
            });
        }
        else
            await this.resumeModel.create(newResume);
    }
    async findResumeByUserId(userId) {
        const resume = await this.resumeModel.findOne({ user: userId });
        return resume ? Mappers_1.mapResumeFromModel(resume) : undefined;
    }
};
ResumeStore = __decorate([
    __param(0, mongoose_1.InjectModel(ResumeModel_1.ResumeSchema.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ResumeStore);
exports.default = ResumeStore;
//# sourceMappingURL=ResumeStore.js.map