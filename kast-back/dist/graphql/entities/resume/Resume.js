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
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
let ResumeInput = class ResumeInput {
    constructor(summary, experience, education, awards) {
        this.summary = summary;
        this.experience = experience;
        this.education = education;
        this.awards = awards;
    }
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ResumeInput.prototype, "summary", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ResumeInput.prototype, "experience", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ResumeInput.prototype, "education", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ResumeInput.prototype, "awards", void 0);
ResumeInput = __decorate([
    graphql_1.InputType(),
    __metadata("design:paramtypes", [String, String, String, String])
], ResumeInput);
exports.ResumeInput = ResumeInput;
let ResumeOutput = class ResumeOutput {
    constructor(summary, experience, education, awards) {
        this.summary = summary;
        this.experience = experience;
        this.education = education;
        this.awards = awards;
    }
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ResumeOutput.prototype, "summary", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ResumeOutput.prototype, "experience", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ResumeOutput.prototype, "education", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ResumeOutput.prototype, "awards", void 0);
ResumeOutput = __decorate([
    graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, String, String, String])
], ResumeOutput);
exports.ResumeOutput = ResumeOutput;
//# sourceMappingURL=Resume.js.map