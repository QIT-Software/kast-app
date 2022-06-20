import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
export declare class ApiExceptionInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
}
