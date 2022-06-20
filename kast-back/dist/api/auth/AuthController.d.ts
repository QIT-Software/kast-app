import RegisterRequest from '../entities/RegisterRequest';
import IAuthManager from '../../managers/auth/IAuthManager';
import LoginRequest from '../entities/LoginRequest';
import RefreshTokenRequest from '../entities/RefreshTokenRequest';
import ForgotPasswordRequest from '../entities/RasswordRecoveryRequest';
import ChangePasswordRequest from '../entities/ChangePasswordRequest';
import { HttpRequestInfo } from 'enhancers/decorators/HttpRequest';
import FirebaseTokenRequest from 'api/entities/FirebaseTokenRequest';
import AuthResponse from 'api/entities/AuthResponse';
import SessionInfo from 'entities/SessionInfo';
import Session from '../entities/Session';
export declare class AuthController {
    private readonly authManager;
    constructor(authManager: IAuthManager);
    register(request: RegisterRequest, { appType, platform }: HttpRequestInfo): Promise<AuthResponse>;
    login(request: LoginRequest, { appType, platform }: HttpRequestInfo): Promise<AuthResponse>;
    refresh(request: RefreshTokenRequest): Promise<Session>;
    forgotPassword(request: ForgotPasswordRequest): Promise<void>;
    changePassword(request: ChangePasswordRequest, session: SessionInfo): Promise<void>;
    addFirebaseRegistrationToken(request: FirebaseTokenRequest, session: SessionInfo): Promise<void>;
}
