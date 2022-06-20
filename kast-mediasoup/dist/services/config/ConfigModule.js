"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_node_1 = require("@spryrocks/config-node");
let ConfigModule = (() => {
    let ConfigModule = class ConfigModule {
    };
    ConfigModule = __decorate([
        common_1.Module({
            providers: [
                {
                    provide: config_node_1.IConfigService,
                    useValue: config_node_1.createConfigService(config_node_1.getConfigEnv(), undefined),
                },
            ],
            exports: [config_node_1.IConfigService],
        })
    ], ConfigModule);
    return ConfigModule;
})();
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=ConfigModule.js.map