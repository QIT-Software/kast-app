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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Common_1 = require("../../../entities/Common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const UserModel_1 = require("../../models/UserModel");
const Mappers_1 = require("../../models/Mappers");
const RoomModel_1 = __importStar(require("../../models/RoomModel"));
const LocalLoginModel_1 = __importStar(require("../../models/LocalLoginModel"));
let UserStore = class UserStore {
    constructor(userModel, roomModel, localLoginModel) {
        this.userModel = userModel;
        this.roomModel = roomModel;
        this.localLoginModel = localLoginModel;
        this.populate = 'referrer';
    }
    async getUser(userId) {
        const user = await this.userModel.findOne({ _id: userId }).populate(this.populate);
        return user ? Mappers_1.mapUserFromModel(user) : undefined;
    }
    async getUsers() {
        return Mappers_1.mapUsersFromModel(await this.userModel.find().populate(this.populate));
    }
    async deleteUsers(userIds) {
        await this.userModel.deleteMany({ _id: { $in: userIds } });
        await this.localLoginModel.deleteMany({ user: { $in: userIds } });
        await this.roomModel.deleteMany({ user: { $in: userIds } });
    }
    async banUsersTemporary(userIds, untilDate) {
        const date = new Date(untilDate);
        await this.userModel.updateMany({ _id: userIds }, { banUntilDate: date, banForever: undefined });
    }
    async banUsersPermanently(userIds) {
        await this.userModel.updateMany({ _id: userIds }, { banUntilDate: undefined, banForever: true });
    }
    async restoreUsers(userIds) {
        await this.userModel.updateMany({ _id: userIds }, { banUntilDate: undefined, banForever: undefined });
    }
    async createUser(data) {
        const newUser = await this.userModel.create(data);
        return this.findUserByIdOrThrow(newUser._id);
    }
    async updateUser(userId, data) {
        const updateObject = {};
        if (data.name !== undefined)
            updateObject.name = data.name;
        if (data.country !== undefined)
            updateObject.country = data.country;
        if (data.city !== undefined)
            updateObject.city = data.city;
        if (data.position !== undefined)
            updateObject.position = data.position;
        if (data.telephone !== undefined)
            updateObject.telephone = data.telephone;
        if (data.dateOfBirth !== undefined)
            updateObject.dateOfBirth = data.dateOfBirth;
        if (data.tags !== undefined)
            updateObject.tags = data.tags;
        if (data.skills !== undefined)
            updateObject.skills = data.skills;
        if (data.mission !== undefined)
            updateObject.mission = data.mission;
        if (data.vision !== undefined)
            updateObject.vision = data.vision;
        if (data.interests !== undefined)
            updateObject.interests = data.interests;
        if (data.referralCode !== undefined)
            updateObject.referralCode = data.referralCode;
        await this.userModel.updateOne({ _id: userId }, updateObject);
    }
    async updateUserImage(myUserId, fileId) {
        const updateObject = {};
        updateObject.avatarUrl = fileId;
        await this.userModel.updateOne({ _id: myUserId }, updateObject);
        return true;
    }
    async updateUserLogoImage(myUserId, fileId) {
        const updateObject = {};
        updateObject.logoUrl = fileId;
        await this.userModel.updateOne({ _id: myUserId }, updateObject);
        return true;
    }
    async updateUserBackgroundImage(myUserId, fileId) {
        const updateObject = {};
        updateObject.backgroundUrl = fileId;
        await this.userModel.updateOne({ _id: myUserId }, updateObject);
        return true;
    }
    async updateUserResumeUrl(myUserId, fileId) {
        const updateObject = {};
        updateObject.resumeUrl = fileId;
        await this.userModel.updateOne({ _id: myUserId }, updateObject);
        return true;
    }
    async findUserByIdOrThrow(id) {
        const user = await this.userModel.findById(id).populate(this.populate);
        if (!user)
            throw new Error('Resume not found');
        return Mappers_1.mapUserFromModel(user);
    }
    async getUserName(id) {
        const user = await this.findUserByIdOrThrow(id);
        if (!user)
            return 'unknown';
        return user.name;
    }
    async findUserByReferralCode(referralCode) {
        const user = await this.userModel.findOne({ referralCode }).populate(this.populate);
        return user ? Mappers_1.mapUserFromModel(user) : undefined;
    }
    async getReferrersByUserId(id) {
        const referrers = await this.userModel.find({ referrer: id }).populate(this.populate);
        return Mappers_1.mapUsersFromModel(referrers);
    }
};
UserStore = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(UserModel_1.UserSchema.name)),
    __param(1, mongoose_1.InjectModel(RoomModel_1.RoomSchema.name)),
    __param(2, mongoose_1.InjectModel(LocalLoginModel_1.LocalLoginSchema.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UserStore);
exports.default = UserStore;
//# sourceMappingURL=UserStore.js.map