"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApplication = void 0;
const core_1 = require("@nestjs/core");
const AppModule_1 = require("./AppModule");
const config_node_1 = require("@spryrocks/config-node");
const microservices_1 = require("@nestjs/microservices");
async function initApplication() {
    const configService = config_node_1.createConfigService(config_node_1.getConfigEnv(), undefined);
    const tcpHost = configService.get('TCP_HOST');
    const tcpPort = configService.getNumber('TCP_PORT');
    const app = await core_1.NestFactory.createMicroservice(AppModule_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: tcpHost,
            port: tcpPort,
        },
    });
    await app.listenAsync();
}
exports.initApplication = initApplication;
//# sourceMappingURL=App.js.map