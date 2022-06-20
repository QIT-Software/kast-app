import { IJwtService } from './IJwtService';
import { JwtPayload } from './JwtPayload';
import { JwtService as NestJwtService } from '@nestjs/jwt';
export declare class JwtService extends IJwtService {
    private readonly jwtService;
    constructor(jwtService: NestJwtService);
    sign(payload: JwtPayload): Promise<string>;
    verify(jwt: string): Promise<JwtPayload>;
}
