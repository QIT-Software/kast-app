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
const ILoginStore_1 = __importDefault(require("./ILoginStore"));
const Common_1 = require("../../../entities/Common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const LocalLoginModel_1 = require("../../models/LocalLoginModel");
const Mappers_1 = require("../../models/Mappers");
let LoginStore = class LoginStore extends ILoginStore_1.default {
    constructor(localLoginModel) {
        super();
        this.localLoginModel = localLoginModel;
        this.populate = {
            path: 'user',
            populate: { path: 'referrer' },
        };
    }
    async createLocalLogin(user, email, passwordHash) {
        const login = await this.localLoginModel.create(Mappers_1.mapLocalLoginToModel(user, email, passwordHash));
        return Mappers_1.mapLocalLoginFromModel(login, user);
    }
    async getLocalLoginByEmail(email) {
        const login = await this.localLoginModel
            .findOne({
            email,
        })
            .populate(this.populate);
        return login ? Mappers_1.mapLocalLoginFromModel(login) : undefined;
    }
    async getLocalLoginByUser(user) {
        const login = await this.localLoginModel
            .findOne({ user: user.id })
            .populate(this.populate);
        return login ? Mappers_1.mapLocalLoginFromModel(login) : undefined;
    }
    async updateLocalLoginPassword(user, passwordHash) {
        await this.localLoginModel.updateOne({ _id: user.id }, { $set: { passwordHash } });
    }
    async findLocalLoginByEmail(email) {
        const login = await this.localLoginModel.findOne({ email });
        return login ? Mappers_1.mapLocalLoginFromModel(login) : undefined;
    }
};
LoginStore = __decorate([
    __param(0, mongoose_1.InjectModel(LocalLoginModel_1.LocalLoginSchema.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LoginStore);
exports.default = LoginStore;
//# sourceMappingURL=LoginStore.js.map