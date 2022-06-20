import { Request } from '../entities/Request';
export declare const createParamDecorator: (func: (request: Request) => unknown) => (...dataOrPipes: any[]) => ParameterDecorator;
