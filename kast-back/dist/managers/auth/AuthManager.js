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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var AuthManager_1;
Object.defineProperty(exports, "__esModule", { value: true });
const IAuthManager_1 = __importDefault(require("./IAuthManager"));
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const common_1 = require("@nestjs/common");
const ILoginStore_1 = __importDefault(require("../../database/stores/login/ILoginStore"));
const bcrypt = __importStar(require("bcrypt"));
const AvikastError_1 = __importDefault(require("../../AvikastError"));
const ISessionStore_1 = __importDefault(require("../../database/stores/session/ISessionStore"));
const IJwtService_1 = require("./jwt/IJwtService");
const crypto_1 = require("crypto");
const AvikastAuthError_1 = __importStar(require("./AvikastAuthError"));
const generate_password_1 = require("generate-password");
const Common_1 = require("../../entities/Common");
const AppType_1 = __importDefault(require("../../entities/AppType"));
const Platform_1 = require("../../entities/Platform");
const User_1 = __importDefault(require("../../entities/User"));
const SessionInfo_1 = __importDefault(require("../../entities/SessionInfo"));
const INotificationService_1 = __importDefault(require("../../services/notifications/INotificationService"));
let AuthManager = AuthManager_1 = class AuthManager extends IAuthManager_1.default {
    constructor(userStore, loginStore, sessionStore, jwtService, notificationService) {
        super();
        this.userStore = userStore;
        this.loginStore = loginStore;
        this.sessionStore = sessionStore;
        this.jwtService = jwtService;
        this.notificationService = notificationService;
    }
    async register(appType, platform, email, password, name, referralCode) {
        let referrer;
        if (referralCode && referralCode.length > 0) {
            referrer = await this.userStore.findUserByReferralCode(referralCode);
            if (!referrer) {
                throw new AvikastError_1.default('This referralCode is not exists');
            }
        }
        const generatedReferralCode = AuthManager_1.generateReferralCode();
        const user = await this.userStore.createUser({
            name,
            email,
            country: ' ',
            city: ' ',
            position: ' ',
            telephone: ' ',
            dateOfBirth: new Date(),
            avatarUrl: ' ',
            tags: [],
            skills: [],
            mission: [],
            vision: [],
            interests: [],
            referralCode: generatedReferralCode,
            referrer: referrer ? referrer.id : undefined,
        });
        const login = await this.createLocalLogin(user, email, password);
        await this.notificationService.sendRegistrationMessage(name, email);
        return this.createSession(login.user, appType, platform);
    }
    async login(appType, platform, email, password) {
        const login = await this.findLoginOrThrow({ email }, AvikastAuthError_1.AvikastErrorType.AuthFailed);
        await AuthManager_1.checkPasswordOrThrow(login, password, AvikastAuthError_1.AvikastErrorType.AuthFailed);
        return this.createSession(login.user, appType, platform);
    }
    static async checkPasswordOrThrow(login, password, errorType) {
        if (!(await AuthManager_1.isPasswordValid(login, password))) {
            throw new AvikastAuthError_1.default('Password is not valid', errorType);
        }
    }
    async findLoginOrThrow(user, errorType) {
        let login;
        if (user.email) {
            login = await this.loginStore.getLocalLoginByEmail(user.email);
        }
        else if (user.id) {
            login = await this.loginStore.getLocalLoginByUser({ id: user.id });
        }
        if (!login) {
            throw new AvikastAuthError_1.default('Login not found', errorType);
        }
        return login;
    }
    async createLocalLogin(user, email, password) {
        const passwordHash = await AuthManager_1.createPasswordHash(password);
        return this.loginStore.createLocalLogin(user, email, passwordHash);
    }
    static async createPasswordHash(password) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }
    static async isPasswordValid(login, password) {
        return bcrypt.compare(password, login.passwordHash);
    }
    static createCryptoToken() {
        const tmp = crypto_1.randomBytes(32).toString('hex');
        return crypto_1.pbkdf2Sync(tmp, tmp, 2048, 32, 'sha512').toString('hex');
    }
    async createSession(user, appType, platform) {
        return this.createSessionInfo(appType, platform, user, (token, refreshToken) => this.sessionStore.createSession(user, token, refreshToken, appType, platform));
    }
    async refresh(refreshToken) {
        const session = await this.sessionStore.getSessionByRefreshToken(refreshToken);
        if (!session) {
            throw new AvikastAuthError_1.default('Session not found', AvikastAuthError_1.AvikastErrorType.RefreshFailed);
        }
        const sessionInfo = await this.createSessionInfo(session.appType, session.platform, session.user, (token, refreshToken) => this.sessionStore.updateSession(session, token, refreshToken));
        return {
            jwt: sessionInfo.jwt,
            refreshToken: sessionInfo.refreshToken,
        };
    }
    async createSessionInfo(appType, platform, user, createOrUpdateSession) {
        const token = AuthManager_1.createCryptoToken();
        const refreshToken = AuthManager_1.createCryptoToken();
        const session = await createOrUpdateSession(token, refreshToken);
        if (!session) {
            throw new AvikastError_1.default('Session wasn`t created!');
        }
        const payload = {
            userId: user.id,
            sessionToken: session.token,
            appType: AppType_1.default[appType],
            platform: Platform_1.Platform[platform],
        };
        const jwt = await this.jwtService.sign(payload);
        return { jwt, refreshToken, user };
    }
    async getSessionFromTokenOrThrow(jwt) {
        try {
            const { userId, sessionToken, appType: appTypeString, platform: platformString, } = await this.jwtService.verify(jwt);
            const appType = AppType_1.default[appTypeString];
            if (!appType)
                throw new AvikastAuthError_1.default('JWT payload should contains a valid appType', AvikastAuthError_1.AvikastErrorType.JwtPayloadMalformed);
            const platform = Platform_1.Platform[platformString];
            if (!platform)
                throw new AvikastAuthError_1.default('JWT payload should contains a valid platform', AvikastAuthError_1.AvikastErrorType.JwtPayloadMalformed);
            const session = {
                token: sessionToken,
                userId,
                appType,
                platform,
            };
            return session;
        }
        catch (e) {
            if (e.message === 'jwt expired') {
                throw new AvikastAuthError_1.default('JWT token expired', AvikastAuthError_1.AvikastErrorType.TokenExpired);
            }
            throw new AvikastError_1.default(e.message);
        }
    }
    async validateSessionOrThrow(jwt) {
        const session = await this.getSessionFromTokenOrThrow(jwt);
        const dbSession = await this.sessionStore.getSessionByToken(session.token);
        if (!dbSession)
            throw new AvikastAuthError_1.default('Session not found', AvikastAuthError_1.AvikastErrorType.AuthFailed);
        if (dbSession.user.id !== session.userId)
            throw new AvikastAuthError_1.default('Resume malformed', AvikastAuthError_1.AvikastErrorType.AuthFailed);
        if (dbSession.appType !== session.appType)
            throw new AvikastAuthError_1.default('appType malformed', AvikastAuthError_1.AvikastErrorType.AuthFailed);
        return session;
    }
    static generateNewPassword() {
        return generate_password_1.generate({
            length: 10,
            numbers: true,
            symbols: false,
            uppercase: true,
        });
    }
    static generateReferralCode() {
        return generate_password_1.generate({
            length: 12,
            numbers: true,
            lowercase: false,
            uppercase: false,
        });
    }
    async recoverPassword(email) {
        const login = await this.findLoginOrThrow({ email }, AvikastAuthError_1.AvikastErrorType.RestorePasswordFailed);
        const password = AuthManager_1.generateNewPassword();
        await this.updatePassword(login, password);
        await this.notificationService.sendNewPassword(login.user.id, password);
    }
    async updatePassword(login, password) {
        const passwordHash = await AuthManager_1.createPasswordHash(password);
        await this.loginStore.updateLocalLoginPassword(login, passwordHash);
    }
    async changePassword(userId, oldPassword, password) {
        const login = await this.findLoginOrThrow({ id: userId }, AvikastAuthError_1.AvikastErrorType.ChangePasswordFailed);
        await AuthManager_1.checkPasswordOrThrow(login, oldPassword, AvikastAuthError_1.AvikastErrorType.ChangePasswordFailed);
        await this.updatePassword(login, password);
    }
    async updateFirebaseToken(token, registrationId) {
        const session = await this.sessionStore.getSessionByTokenOrThrow(token);
        await this.sessionStore.updateFirebaseToken(session, registrationId);
    }
};
AuthManager = AuthManager_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IUserStore_1.default,
        ILoginStore_1.default,
        ISessionStore_1.default,
        IJwtService_1.IJwtService,
        INotificationService_1.default])
], AuthManager);
exports.default = AuthManager;
//# sourceMappingURL=AuthManager.js.map