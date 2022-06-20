"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const AppModule_1 = require("./AppModule");
const express_1 = __importDefault(require("express"));
const AppUtils_1 = require("./AppUtils");
const config_node_1 = require("@spryrocks/config-node");
async function initApplication() {
    const configService = config_node_1.createConfigService(config_node_1.getConfigEnv(), undefined);
    const server = express_1.default().set('trust proxy', true);
    const globalPrefix = configService.getOptional('HTTP_GLOBAL_PREFIX');
    const httpPort = configService.getNumber('HTTP_PORT');
    const app = await core_1.NestFactory.create(AppModule_1.AppModule, new platform_express_1.ExpressAdapter(server));
    if (globalPrefix) {
        app.setGlobalPrefix(globalPrefix);
    }
    app.use(AppUtils_1.httpLogger());
    const logsEnabled = configService.getBoolean('LOGS_ENABLED', true);
    if (logsEnabled) {
        app.enableCors();
    }
    await app.listen(httpPort);
}
exports.initApplication = initApplication;
//# sourceMappingURL=App.js.map