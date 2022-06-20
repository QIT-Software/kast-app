import { ExecutionContext } from '@nestjs/common';
import { Request } from './entities/Request';
export declare function getRequest(context: ExecutionContext): Request | undefined;
export declare function extractJwtFromContext(context: ExecutionContext): string | undefined;
export declare function extractAppFromContext(context: ExecutionContext): string | undefined;
export declare function extractPlatformHeaderFromContext(context: ExecutionContext): string | undefined;
