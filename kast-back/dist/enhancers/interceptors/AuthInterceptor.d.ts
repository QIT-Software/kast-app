import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import IAuthManager from '../../managers/auth/IAuthManager';
import AppType from 'entities/AppType';
import { IgnoreElement, Role } from 'entities/Common';
import { Reflector } from '@nestjs/core';
export declare class AuthInterceptor implements NestInterceptor {
    private readonly authManager;
    private readonly reflector;
    constructor(authManager: IAuthManager, reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Promise<any>;
    private static extractAppTypeFromContext;
    private static extractPlatformFromContext;
    getRoles(context: ExecutionContext): Role[] | undefined;
    getIgnoreElements(context: ExecutionContext): IgnoreElement[] | undefined;
    static checkRoles(appType: AppType, roles: Role[]): void;
}
