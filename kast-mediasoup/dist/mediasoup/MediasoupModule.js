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
exports.MediasoupModule = void 0;
const common_1 = require("@nestjs/common");
const IMediasoup_1 = __importDefault(require("./IMediasoup"));
const MediasoupInitializer_1 = require("./MediasoupInitializer");
const config_node_1 = require("@spryrocks/config-node");
const ConfigModule_1 = require("../services/config/ConfigModule");
let MediasoupModule = (() => {
    let MediasoupModule = class MediasoupModule {
    };
    MediasoupModule = __decorate([
        common_1.Module({
            imports: [
                ConfigModule_1.ConfigModule,
            ],
            providers: [
                {
                    provide: IMediasoup_1.default,
                    useFactory: (configService) => {
                        return MediasoupInitializer_1.initializeMediasoup(configService);
                    },
                    inject: [config_node_1.IConfigService],
                },
            ],
            exports: [
                IMediasoup_1.default,
            ],
        })
    ], MediasoupModule);
    return MediasoupModule;
})();
exports.MediasoupModule = MediasoupModule;
//# sourceMappingURL=MediasoupModule.js.map