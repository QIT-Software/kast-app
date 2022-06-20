"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DecoratorUtils_1 = require("../utils/DecoratorUtils");
const AppType_1 = __importDefault(require("../../entities/AppType"));
const Platform_1 = require("../../entities/Platform");
exports.default = DecoratorUtils_1.createParamDecorator((request) => {
    const baseUrl = `${request.protocol}://${request.get('Host')}`;
    if (!request.appType)
        throw new Error('App type is not provided');
    if (!request.platform)
        throw new Error('App type is not provided');
    return {
        baseUrl,
        appType: request.appType,
        platform: request.platform,
    };
});
//# sourceMappingURL=HttpRequest.js.map