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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
let User = User_1 = class User {
    constructor(id, name, email, country, city, position, telephone, dateOfBirth, avatarUrl, tags, skills, vision, mission, interests, referralCode, banUntilDate, banForever, referrer, logoUrl, backgroundUrl, resumeUrl) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.country = country;
        this.city = city;
        this.position = position;
        this.telephone = telephone;
        this.dateOfBirth = dateOfBirth;
        this.avatarUrl = avatarUrl;
        this.tags = tags;
        this.skills = skills;
        this.vision = vision;
        this.mission = mission;
        this.interests = interests;
        this.referralCode = referralCode;
        this.banUntilDate = banUntilDate;
        this.banForever = banForever;
        this.referrer = referrer;
        this.logoUrl = logoUrl;
        this.backgroundUrl = backgroundUrl;
        this.resumeUrl = resumeUrl;
    }
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "position", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "telephone", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
__decorate([
    graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], User.prototype, "tags", void 0);
__decorate([
    graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], User.prototype, "skills", void 0);
__decorate([
    graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], User.prototype, "mission", void 0);
__decorate([
    graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], User.prototype, "vision", void 0);
__decorate([
    graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], User.prototype, "interests", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "referralCode", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "banUntilDate", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "banForever", void 0);
__decorate([
    graphql_1.Field(() => User_1, { nullable: true }),
    __metadata("design:type", User)
], User.prototype, "referrer", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "logoUrl", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "backgroundUrl", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "resumeUrl", void 0);
User = User_1 = __decorate([
    graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Object, String, Array, Array, Array, Array, Array, String, Object, Object, Object, Object, Object, Object])
], User);
exports.default = User;
//# sourceMappingURL=User.js.map