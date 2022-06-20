"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const StoresModule_1 = require("../../database/stores/StoresModule");
const IAuthManager_1 = __importDefault(require("./IAuthManager"));
const AuthManager_1 = __importDefault(require("./AuthManager"));
const JwtModule_1 = require("./jwt/JwtModule");
const ServicesModule_1 = require("../../services/ServicesModule");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            JwtModule_1.JwtModule,
            StoresModule_1.StoresModule,
            ServicesModule_1.ServicesModule,
        ],
        providers: [
            {
                provide: IAuthManager_1.default,
                useClass: AuthManager_1.default,
            },
        ],
        exports: [
            IAuthManager_1.default,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=AuthModule.js.map