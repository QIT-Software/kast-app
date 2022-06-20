"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const EnhancersModule_1 = require("../enhancers/EnhancersModule");
const ManagerModule_1 = require("../managers/ManagerModule");
const AuthController_1 = require("./auth/AuthController");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const ApiExceptionInterceptor_1 = require("../enhancers/interceptors/ApiExceptionInterceptor");
const HealthController_1 = require("./HealthController");
const FileController_1 = require("./file/FileController");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [
            EnhancersModule_1.EnhancersModule,
            ManagerModule_1.ManagerModule,
            platform_express_1.MulterModule.registerAsync({
                useFactory: () => ({
                    storage: multer_1.memoryStorage(),
                }),
            }),
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: ApiExceptionInterceptor_1.ApiExceptionInterceptor,
            },
            {
                provide: core_1.APP_PIPE,
                useClass: common_1.ValidationPipe,
            },
        ],
        controllers: [
            AuthController_1.AuthController,
            HealthController_1.HealthController,
            FileController_1.FilesController,
        ],
        exports: [],
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=ApiModule.js.map