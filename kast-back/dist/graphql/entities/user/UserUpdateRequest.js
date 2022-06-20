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
let UserUpdateRequest = class UserUpdateRequest {
    constructor(name, email, country, city, position, telephone, dateOfBirth, tags, skills, mission, vision, interests) {
        this.name = name;
        this.email = email;
        this.country = country;
        this.city = city;
        this.position = position;
        this.telephone = telephone;
        this.dateOfBirth = dateOfBirth;
        this.tags = tags;
        this.skills = skills;
        this.mission = mission;
        this.vision = vision;
        this.interests = interests;
    }
};
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "email", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "country", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "city", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "position", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "telephone", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "dateOfBirth", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "tags", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "skills", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "mission", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "vision", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "interests", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], UserUpdateRequest.prototype, "referralCode", void 0);
UserUpdateRequest = __decorate([
    graphql_1.InputType(),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], UserUpdateRequest);
exports.default = UserUpdateRequest;
//# sourceMappingURL=UserUpdateRequest.js.map