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
const IAccountManager_1 = __importDefault(require("../../managers/account/IAccountManager"));
const Account_1 = __importDefault(require("../entities/account/Account"));
const common_1 = require("@nestjs/common");
const AuthGuard_1 = __importDefault(require("../../enhancers/guards/AuthGuard"));
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const UserUpdateRequest_1 = __importDefault(require("../entities/user/UserUpdateRequest"));
const Mappers_1 = require("../entities/Mappers");
const SessionInfo_1 = __importDefault(require("../../entities/SessionInfo"));
const User_1 = __importDefault(require("../entities/user/User"));
let AccountResolver = class AccountResolver {
    constructor(accountManager) {
        this.accountManager = accountManager;
    }
    async myAccount({ userId }) {
        return Mappers_1.mapAccountToGQL(await this.accountManager.getMyAccount(userId));
    }
    async updateMyAccount({ userId }, userInput) {
        return Mappers_1.mapAccountToGQL(await this.accountManager.updateAccount(userId, {
            name: userInput.name,
            country: userInput.country,
            city: userInput.city,
            position: userInput.position,
            telephone: userInput.telephone,
            dateOfBirth: userInput.dateOfBirth,
            tags: userInput.tags,
            skills: userInput.skills,
            mission: userInput.mission,
            vision: userInput.vision,
            interests: userInput.interests,
            referralCode: userInput.referralCode,
        }));
    }
    async updateUserImage({ userId }, fileId) {
        return this.accountManager.updateUserImage(userId, fileId);
    }
    async updateUserLogoImage({ userId }, fileId) {
        return this.accountManager.updateUserLogoImage(userId, fileId);
    }
    async updateUserBackgroundImage({ userId }, fileId) {
        return this.accountManager.updateUserBackgroundImage(userId, fileId);
    }
    async banUsersTemporary(userIds, untilDate) {
        await this.accountManager.banUsersTemporary(userIds, untilDate);
        return true;
    }
    async banUsersPermanently(userIds) {
        await this.accountManager.banUsersPermanently(userIds);
        return true;
    }
    async restoreUsers(userIds) {
        await this.accountManager.restoreUsers(userIds);
        return true;
    }
    async users() {
        return Mappers_1.mapUsersToGQL(await this.accountManager.getUsers());
    }
    async deleteUsers(userIds) {
        await this.accountManager.deleteUsers(userIds);
        return true;
    }
    async referrersByUserId(userId) {
        const test = await this.accountManager.referrersByUserId(userId);
        return Mappers_1.mapUsersToGQL(test);
    }
    async uploadResume({ userId }, fileId) {
        return this.accountManager.uploadResume(userId, fileId);
    }
    async userById(userId) {
        return Mappers_1.mapUserToGQL(await this.accountManager.getUserById(userId));
    }
};
__decorate([
    graphql_1.Query(() => Account_1.default),
    __param(0, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "myAccount", null);
__decorate([
    graphql_1.Mutation(() => Account_1.default),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('user', new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UserUpdateRequest_1.default]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "updateMyAccount", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "updateUserImage", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "updateUserLogoImage", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "updateUserBackgroundImage", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args({ name: 'userIds', type: () => [String] })),
    __param(1, graphql_1.Args({ name: 'untilDate', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "banUsersTemporary", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args({ name: 'userIds', type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "banUsersPermanently", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args({ name: 'userIds', type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "restoreUsers", null);
__decorate([
    graphql_1.Query(() => [User_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "users", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args({ name: 'userIds', type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "deleteUsers", null);
__decorate([
    graphql_1.Query(() => [User_1.default]),
    __param(0, graphql_1.Args({ name: 'userId', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "referrersByUserId", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "uploadResume", null);
__decorate([
    graphql_1.Query(() => User_1.default),
    __param(0, graphql_1.Args({ name: 'userId', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountResolver.prototype, "userById", null);
AccountResolver = __decorate([
    graphql_1.Resolver(),
    common_1.UseGuards(AuthGuard_1.default),
    __metadata("design:paramtypes", [IAccountManager_1.default])
], AccountResolver);
exports.AccountResolver = AccountResolver;
//# sourceMappingURL=AccountResolver.js.map