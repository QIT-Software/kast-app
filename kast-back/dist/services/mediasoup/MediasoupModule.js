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
const IMediasoupService_1 = __importDefault(require("./IMediasoupService"));
const MediasoupService_1 = __importDefault(require("./MediasoupService"));
const config_node_1 = require("@spryrocks/config-node");
const microservices_1 = require("@nestjs/microservices");
const Constants_1 = require("./Constants");
const ConfigModule_1 = require("../config/ConfigModule");
let MediasoupModule = class MediasoupModule {
};
MediasoupModule = __decorate([
    common_1.Module({
        imports: [
            ConfigModule_1.ConfigModule,
        ],
        providers: [
            {
                provide: Constants_1.MEDIASOUP_SERVICE,
                inject: [config_node_1.IConfigService],
                useFactory: (configService) => {
                    const tcpHost = configService.get('MICROSERVICES_TCP_HOST');
                    const tcpPort = configService.getNumber('MICROSERVICES_TCP_PORT');
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: tcpHost,
                            port: tcpPort,
                        },
                    });
                },
            },
            {
                provide: IMediasoupService_1.default,
                useClass: MediasoupService_1.default,
            },
        ],
        exports: [IMediasoupService_1.default],
    })
], MediasoupModule);
exports.MediasoupModule = MediasoupModule;
//# sourceMappingURL=MediasoupModule.js.map