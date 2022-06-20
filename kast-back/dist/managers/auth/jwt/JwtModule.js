"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const ConfigModule_1 = require("../../../services/config/ConfigModule");
const IJwtService_1 = require("./IJwtService");
const JwtService_1 = require("./JwtService");
const config_node_1 = require("@spryrocks/config-node");
const options = (configService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
});
let JwtModule = class JwtModule {
};
JwtModule = __decorate([
    common_1.Module({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [ConfigModule_1.ConfigModule],
                inject: [config_node_1.IConfigService],
                useFactory: options,
            }),
        ],
        providers: [
            {
                provide: IJwtService_1.IJwtService,
                useClass: JwtService_1.JwtService,
            },
        ],
        exports: [
            IJwtService_1.IJwtService,
        ],
    })
], JwtModule);
exports.JwtModule = JwtModule;
//# sourceMappingURL=JwtModule.js.map