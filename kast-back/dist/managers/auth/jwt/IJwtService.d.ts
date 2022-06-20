import { JwtPayload } from './JwtPayload';
export declare abstract class IJwtService {
    abstract sign(payload: JwtPayload): Promise<string>;
    abstract verify(jwt: string): Promise<JwtPayload>;
}
