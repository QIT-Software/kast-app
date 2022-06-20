"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthResponse_1 = __importDefault(require("../../entities/AuthResponse"));
const User_1 = __importDefault(require("../../entities/User"));
const Session_1 = __importDefault(require("../../entities/Session"));
exports.mapUserToApi = (user) => ({
    id: user.id,
    avatarUrl: user.avatarUrl,
    city: user.city,
    country: user.country,
    dateOfBirth: user.dateOfBirth,
    email: user.email,
    name: user.name,
    referralCode: user.referralCode,
    skills: user.skills,
    tags: user.tags,
});
exports.mapSessionToApi = (session) => ({
    jwt: session.jwt,
    refreshToken: session.refreshToken,
});
exports.mapAuthResponseToApi = (response) => (Object.assign(Object.assign({}, exports.mapSessionToApi(response)), { user: exports.mapUserToApi(response.user) }));
//# sourceMappingURL=Mappers.js.map