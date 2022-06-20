"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const AvikastError_1 = __importDefault(require("../../AvikastError"));
const AvikastAuthError_1 = __importStar(require("../../managers/auth/AvikastAuthError"));
function processAuthError(error) {
    switch (error.type) {
        case AvikastAuthError_1.AvikastErrorType.TokenExpired:
        case AvikastAuthError_1.AvikastErrorType.AuthFailed:
        case AvikastAuthError_1.AvikastErrorType.RefreshFailed:
            throw new common_1.UnauthorizedException(error.message);
    }
}
function processError(error) {
    if (error instanceof AvikastError_1.default) {
        if (error instanceof AvikastAuthError_1.default) {
            processAuthError(error);
        }
        throw new common_1.BadRequestException(error.message);
    }
    else {
        throw error;
    }
}
exports.processError = processError;
//# sourceMappingURL=ErrorUtils.js.map