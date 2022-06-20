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
const ISessionStore_1 = __importDefault(require("./ISessionStore"));
const Common_1 = require("../../../entities/Common");
const AppType_1 = __importDefault(require("../../../entities/AppType"));
const Platform_1 = require("../../../entities/Platform");
const SessionModel_1 = require("../../models/SessionModel");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const AvikastError_1 = __importDefault(require("../../../AvikastError"));
const Mappers_1 = require("../../models/Mappers");
let SessionStore = class SessionStore extends ISessionStore_1.default {
    constructor(sessionModel) {
        super();
        this.sessionModel = sessionModel;
        this.populate = {
            path: 'user',
            populate: { path: 'referrer' },
        };
    }
    async createSession(user, token, refreshToken, appType, platform) {
        const newSession = await this.sessionModel.create(Mappers_1.mapSessionToModel(user.id, refreshToken, token, appType, platform));
        return Mappers_1.mapSessionFromModel(await newSession.populate(this.populate).execPopulate());
    }
    async getSession(session) {
        const newSession = await this.sessionModel
            .findOne({ _id: session.id })
            .populate(this.populate);
        return newSession ? Mappers_1.mapSessionFromModel(newSession) : undefined;
    }
    async getSessionOrFail(sessionId) {
        const session = await this.sessionModel
            .findOne({ _id: sessionId })
            .populate(this.populate);
        if (!session)
            throw new AvikastError_1.default('Session not exists');
        return Mappers_1.mapSessionFromModel(session);
    }
    async getSessionByToken(token) {
        const session = await this.sessionModel.findOne({ token }).populate(this.populate);
        return session ? Mappers_1.mapSessionFromModel(session) : undefined;
    }
    async getSessionByTokenOrThrow(token) {
        const session = await this.sessionModel.findOne({ token }).populate(this.populate);
        if (!session)
            throw new AvikastError_1.default('Session not found');
        return Mappers_1.mapSessionFromModel(session);
    }
    async getSessionByRefreshToken(refreshToken) {
        const session = await this.sessionModel
            .findOne({ refreshToken })
            .populate(this.populate);
        return session ? Mappers_1.mapSessionFromModel(session) : undefined;
    }
    async updateSession(session, token, refreshToken) {
        await this.sessionModel.update({ _id: session.id }, { token, refreshToken });
        return this.getSessionOrFail(session.id);
    }
    async updateFirebaseToken(session, registrationId) {
        await this.sessionModel.update({ _id: session.id }, { firebaseRegistrationId: registrationId });
    }
};
SessionStore = __decorate([
    __param(0, mongoose_1.InjectModel(SessionModel_1.SessionSchema.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SessionStore);
exports.default = SessionStore;
//# sourceMappingURL=SessionStore.js.map