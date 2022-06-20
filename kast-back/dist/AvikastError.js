"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AvikastErrorType;
(function (AvikastErrorType) {
    AvikastErrorType[AvikastErrorType["TokenExpired"] = 0] = "TokenExpired";
    AvikastErrorType[AvikastErrorType["AuthFailed"] = 1] = "AuthFailed";
    AvikastErrorType[AvikastErrorType["RefreshFailed"] = 2] = "RefreshFailed";
    AvikastErrorType[AvikastErrorType["ChangePasswordFailed"] = 3] = "ChangePasswordFailed";
    AvikastErrorType[AvikastErrorType["RestorePasswordFailed"] = 4] = "RestorePasswordFailed";
    AvikastErrorType[AvikastErrorType["JwtPayloadMalformed"] = 5] = "JwtPayloadMalformed";
})(AvikastErrorType = exports.AvikastErrorType || (exports.AvikastErrorType = {}));
class AvikastError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.default = AvikastError;
//# sourceMappingURL=AvikastError.js.map