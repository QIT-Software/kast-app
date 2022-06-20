"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AvikastError_1 = __importDefault(require("../../AvikastError"));
var AvikastErrorType;
(function (AvikastErrorType) {
    AvikastErrorType[AvikastErrorType["TokenExpired"] = 0] = "TokenExpired";
    AvikastErrorType[AvikastErrorType["AuthFailed"] = 1] = "AuthFailed";
    AvikastErrorType[AvikastErrorType["RefreshFailed"] = 2] = "RefreshFailed";
    AvikastErrorType[AvikastErrorType["ChangePasswordFailed"] = 3] = "ChangePasswordFailed";
    AvikastErrorType[AvikastErrorType["RestorePasswordFailed"] = 4] = "RestorePasswordFailed";
    AvikastErrorType[AvikastErrorType["JwtPayloadMalformed"] = 5] = "JwtPayloadMalformed";
})(AvikastErrorType = exports.AvikastErrorType || (exports.AvikastErrorType = {}));
class AvikastAuthError extends AvikastError_1.default {
    constructor(message, type) {
        super(message);
        this.type = type;
    }
}
exports.default = AvikastAuthError;
//# sourceMappingURL=AvikastAuthError.js.map