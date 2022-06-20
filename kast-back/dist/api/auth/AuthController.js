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
const common_1 = require("@nestjs/common");
const RegisterRequest_1 = __importDefault(require("../entities/RegisterRequest"));
const Mappers_1 = require("../entities/Mappers");
const IAuthManager_1 = __importDefault(require("../../managers/auth/IAuthManager"));
const LoginRequest_1 = __importDefault(require("../entities/LoginRequest"));
const RefreshTokenRequest_1 = __importDefault(require("../entities/RefreshTokenRequest"));
const RasswordRecoveryRequest_1 = __importDefault(require("../entities/RasswordRecoveryRequest"));
const ChangePasswordRequest_1 = __importDefault(require("../entities/ChangePasswordRequest"));
const AuthGuard_1 = __importDefault(require("../../enhancers/guards/AuthGuard"));
const Ignore_1 = __importDefault(require("../../enhancers/decorators/Ignore"));
const HttpRequest_1 = __importStar(require("../../enhancers/decorators/HttpRequest"));
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const FirebaseTokenRequest_1 = __importDefault(require("../entities/FirebaseTokenRequest"));
const AuthResponse_1 = __importDefault(require("../entities/AuthResponse"));
const SessionInfo_1 = __importDefault(require("../../entities/SessionInfo"));
let AuthController = class AuthController {
    constructor(authManager) {
        this.authManager = authManager;
    }
    async register(request, { appType, platform }) {
        return Mappers_1.mapAuthResponseToApi(await this.authManager.register(appType, platform, request.email, request.password, request.name, request.referralCode));
    }
    async login(request, { appType, platform }) {
        return Mappers_1.mapAuthResponseToApi(await this.authManager.login(appType, platform, request.email, request.password));
    }
    async refresh(request) {
        return Mappers_1.mapSessionToApi(await this.authManager.refresh(request.refreshToken));
    }
    async forgotPassword(request) {
        await this.authManager.recoverPassword(request.email);
    }
    async changePassword(request, session) {
        await this.authManager.changePassword(session.userId, request.oldPassword, request.password);
    }
    async addFirebaseRegistrationToken(request, session) {
        await this.authManager.updateFirebaseToken(session.token, request.registrationId);
    }
};
__decorate([
    common_1.Post('register'),
    Ignore_1.default('Authorization'),
    __param(0, common_1.Body()),
    __param(1, HttpRequest_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterRequest_1.default, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    Ignore_1.default('Authorization'),
    __param(0, common_1.Body()),
    __param(1, HttpRequest_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginRequest_1.default, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('refresh'),
    Ignore_1.default('Authorization'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RefreshTokenRequest_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    common_1.Post('forgotPassword'),
    Ignore_1.default('Authorization'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RasswordRecoveryRequest_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    common_1.UseGuards(AuthGuard_1.default),
    common_1.Put('password'),
    __param(0, common_1.Body()),
    __param(1, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChangePasswordRequest_1.default, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    common_1.Post('firebaseToken'),
    common_1.UseGuards(AuthGuard_1.default),
    __param(0, common_1.Body()),
    __param(1, CurrentSession_1.default()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FirebaseTokenRequest_1.default, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "addFirebaseRegistrationToken", null);
AuthController = __decorate([
    common_1.Controller('api/auth'),
    __metadata("design:paramtypes", [IAuthManager_1.default])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map