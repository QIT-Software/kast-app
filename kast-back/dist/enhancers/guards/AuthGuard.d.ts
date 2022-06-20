import { CanActivate, ExecutionContext } from '@nestjs/common';
import IAuthManager from '../../managers/auth/IAuthManager';
export default class AuthGuard implements CanActivate {
    private readonly authManager;
    constructor(authManager: IAuthManager);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
