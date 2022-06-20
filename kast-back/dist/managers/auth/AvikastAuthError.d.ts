import AvikastError from '../../AvikastError';
export declare enum AvikastErrorType {
    TokenExpired = 0,
    AuthFailed = 1,
    RefreshFailed = 2,
    ChangePasswordFailed = 3,
    RestorePasswordFailed = 4,
    JwtPayloadMalformed = 5
}
export default class AvikastAuthError extends AvikastError {
    readonly type: AvikastErrorType;
    constructor(message: string, type: AvikastErrorType);
}
