"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ILogger_1 = __importDefault(require("./ILogger"));
class Logger extends ILogger_1.default {
    logger(message, info) {
        console.log(`${message} ${info}`);
    }
}
exports.default = Logger;
//# sourceMappingURL=Logger.js.map