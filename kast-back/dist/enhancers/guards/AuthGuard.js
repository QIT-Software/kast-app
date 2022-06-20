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
const IAuthManager_1 = __importDefault(require("../../managers/auth/IAuthManager"));
const AvikastError_1 = __importDefault(require("../../AvikastError"));
const RequestExtractors_1 = require("../RequestExtractors");
const ErrorUtils_1 = require("../utils/ErrorUtils");
let AuthGuard = class AuthGuard {
    constructor(authManager) {
        this.authManager = authManager;
    }
    async canActivate(context) {
        try {
            const jwt = RequestExtractors_1.extractJwtFromContext(context);
            if (!jwt) {
                throw new AvikastError_1.default('Authorization token is empty');
            }
            await this.authManager.getSessionFromTokenOrThrow(jwt);
            return true;
        }
        catch (e) {
            ErrorUtils_1.processError(e);
            return false;
        }
    }
};
AuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IAuthManager_1.default])
], AuthGuard);
exports.default = AuthGuard;
//# sourceMappingURL=AuthGuard.js.map