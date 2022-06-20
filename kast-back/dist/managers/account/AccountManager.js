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
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const Mappers_1 = require("../../database/entities/Mappers");
const AvikastError_1 = __importDefault(require("../../AvikastError"));
const IResumeStore_1 = __importDefault(require("../../database/stores/resume/IResumeStore"));
const User_1 = __importDefault(require("../../entities/User"));
const IPdfService_1 = require("../../services/pdf/IPdfService");
let AccountManager = class AccountManager {
    constructor(userStore, resumeStore, pdfService) {
        this.userStore = userStore;
        this.resumeStore = resumeStore;
        this.pdfService = pdfService;
    }
    async getMyAccount(myUserId) {
        const dbUser = await this.userStore.getUser(myUserId);
        if (!dbUser)
            throw new AvikastError_1.default('Resume is not found');
        return Mappers_1.mapAccountFromDB(dbUser);
    }
    async updateAccount(myUserId, user) {
        await this.userStore.updateUser(myUserId, user);
        const dbUser = await this.userStore.getUser(myUserId);
        if (!dbUser)
            throw new AvikastError_1.default('Resume is not found');
        return Mappers_1.mapAccountFromDB(dbUser);
    }
    async updateUserImage(myUserId, fileId) {
        return this.userStore.updateUserImage(myUserId, fileId);
    }
    async updateUserLogoImage(myUserId, fileId) {
        return this.userStore.updateUserLogoImage(myUserId, fileId);
    }
    async updateUserBackgroundImage(myUserId, fileId) {
        return this.userStore.updateUserBackgroundImage(myUserId, fileId);
    }
    async updateUserResumeUrl(myUserId, fileId) {
        return this.userStore.updateUserResumeUrl(myUserId, fileId);
    }
    async getUsers() {
        const users = await this.userStore.getUsers();
        return Mappers_1.mapUsersFromDB(users);
    }
    async deleteUsers(userIds) {
        await this.userStore.deleteUsers(userIds);
    }
    async banUsersTemporary(userIds, untilDate) {
        await this.userStore.banUsersTemporary(userIds, untilDate);
    }
    async banUsersPermanently(userIds) {
        await this.userStore.banUsersPermanently(userIds);
    }
    async restoreUsers(userIds) {
        await this.userStore.restoreUsers(userIds);
    }
    async referrersByUserId(userId) {
        const user = await this.userStore.getUser(userId);
        if (!user)
            throw new AvikastError_1.default('User is not found');
        const userRefs = [];
        const getReferrers = async (user, userArr = []) => {
            const referrers = await this.userStore.getReferrersByUserId(user.id);
            referrers.forEach((ref) => {
                var _a;
                userArr.push(ref);
                if ((_a = ref.referrer) === null || _a === void 0 ? void 0 : _a.referrer) {
                    return getReferrers(ref.referrer, userArr);
                }
            });
            return userArr;
        };
        await getReferrers(user, userRefs);
        return Mappers_1.mapUsersFromDB(userRefs);
    }
    async getUserById(userId) {
        const user = await this.userStore.getUser(userId);
        if (!user) {
            throw new Error(`User with id: ${userId} does not exist`);
        }
        return Mappers_1.mapUserFromDb(user);
    }
    async uploadResume(myUserId, fileId) {
        return this.userStore.updateUserResumeUrl(myUserId, fileId);
    }
};
AccountManager = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IUserStore_1.default,
        IResumeStore_1.default,
        IPdfService_1.IPdfService])
], AccountManager);
exports.default = AccountManager;
//# sourceMappingURL=AccountManager.js.map