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
var AuthInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const IAuthManager_1 = __importDefault(require("../../managers/auth/IAuthManager"));
const RequestExtractors_1 = require("../RequestExtractors");
const AvikastError_1 = __importDefault(require("../../AvikastError"));
const AppType_1 = __importDefault(require("../../entities/AppType"));
const ErrorUtils_1 = require("../utils/ErrorUtils");
const Common_1 = require("../../entities/Common");
const core_1 = require("@nestjs/core");
const Platform_1 = require("../../entities/Platform");
const SessionInfo_1 = __importDefault(require("../../entities/SessionInfo"));
let AuthInterceptor = AuthInterceptor_1 = class AuthInterceptor {
    constructor(authManager, reflector) {
        this.authManager = authManager;
        this.reflector = reflector;
    }
    async intercept(context, next) {
        try {
            const ignoreElements = this.getIgnoreElements(context);
            const ignoreAppType = ignoreElements && ignoreElements.includes('AppType');
            const ignorePlatform = ignoreElements && ignoreElements.includes('Platform');
            const ignoreAuthorization = ignoreElements && ignoreElements.includes('Authorization');
            let session;
            let appType;
            if (!ignoreAppType) {
                appType = AuthInterceptor_1.extractAppTypeFromContext(context);
            }
            let platform;
            if (!ignorePlatform) {
                platform = AuthInterceptor_1.extractPlatformFromContext(context);
            }
            if (!ignoreAuthorization) {
                const jwt = RequestExtractors_1.extractJwtFromContext(context);
                if (jwt) {
                    session = await this.authManager.validateSessionOrThrow(jwt);
                }
            }
            if (session) {
                if (!ignoreAppType && (!appType || session.appType !== appType)) {
                    throw new AvikastError_1.default('appType malformed');
                }
                if (!ignorePlatform && (!platform || session.platform !== platform)) {
                    throw new AvikastError_1.default('platform malformed');
                }
            }
            const roles = this.getRoles(context);
            if (appType && roles) {
                AuthInterceptor_1.checkRoles(appType, roles);
            }
            const injectRequestData = (request) => {
                if (!ignoreAuthorization) {
                    request.session = session;
                }
                if (!ignoreAppType) {
                    request.appType = appType;
                }
                if (!ignorePlatform) {
                    request.platform = platform;
                }
            };
            const request = RequestExtractors_1.getRequest(context);
            if (request) {
                injectRequestData(request);
            }
            return next.handle();
        }
        catch (e) {
            return ErrorUtils_1.processError(e);
        }
    }
    static extractAppTypeFromContext(context) {
        const app = RequestExtractors_1.extractAppFromContext(context);
        if (!app) {
            throw new AvikastError_1.default('app header is not provided');
        }
        const appType = AppType_1.default[app];
        if (!appType) {
            throw new AvikastError_1.default('app header contains unknown value');
        }
        return appType;
    }
    static extractPlatformFromContext(context) {
        const platformHeader = RequestExtractors_1.extractPlatformHeaderFromContext(context);
        if (!platformHeader) {
            throw new AvikastError_1.default('platform header is not provided');
        }
        const platform = Platform_1.Platform[platformHeader];
        if (!platform) {
            throw new AvikastError_1.default('platform header contains unknown value');
        }
        return platform;
    }
    getRoles(context) {
        const getRolesFunc = (target) => this.reflector.get('roles', target);
        return [
            getRolesFunc(context.getHandler()),
            getRolesFunc(context.getClass()),
        ]
            .filter((r) => !!r)
            .shift();
    }
    getIgnoreElements(context) {
        const getIgnoreElementsFunc = (target) => this.reflector.get('ignore', target);
        return [
            getIgnoreElementsFunc(context.getHandler()),
            getIgnoreElementsFunc(context.getClass()),
        ]
            .filter((r) => !!r)
            .shift();
    }
    static checkRoles(appType, roles) {
        if (!roles.includes(appType)) {
            throw new AvikastError_1.default(`Execution of this method denied for the role '${appType}'`);
        }
    }
};
AuthInterceptor = AuthInterceptor_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IAuthManager_1.default,
        core_1.Reflector])
], AuthInterceptor);
exports.AuthInterceptor = AuthInterceptor;
//# sourceMappingURL=AuthInterceptor.js.map