import AuthResponse from 'entities/AuthResponse';
import ApiAuthResponse from './AuthResponse';
import User from 'entities/User';
import ApiUser from './User';
import Session from 'entities/Session';
import ApiSession from './Session';
export declare const mapUserToApi: (user: User) => ApiUser;
export declare const mapSessionToApi: (session: Session) => ApiSession;
export declare const mapAuthResponseToApi: (response: AuthResponse) => ApiAuthResponse;
