"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
exports.httpLogger = () => {
    return morgan_1.default
        .token('headers', (req) => JSON.stringify(req.headers))
        .token('protocol', (req) => req.protocol)
        .token('host', (req) => req.get('host'))(':headers:\n:protocol :host :method :url :status :res[content-length] - :response-time ms');
};
exports.storeLogger = (message, subject) => {
    return `${message} ${subject}`;
};
exports.managerLogger = (message, subject) => {
    return `${message} ${subject}`;
};
exports.graphQlLogger = (message, subject) => {
    return `${message} ${subject}`;
};
//# sourceMappingURL=AppUtils.js.map