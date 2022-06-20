import ISessionStore from './ISessionStore';
import Session from '../../entities/Session';
import { ID } from 'entities/Common';
import AppType from 'entities/AppType';
import { Platform } from 'entities/Platform';
import SessionModel from '../../models/SessionModel';
import { Model } from 'mongoose';
export default class SessionStore extends ISessionStore {
    private sessionModel;
    constructor(sessionModel: Model<SessionModel>);
    private populate;
    createSession(user: {
        id: string;
    }, token: string, refreshToken: string, appType: AppType, platform: Platform): Promise<Session>;
    getSession(session: {
        id: string;
    }): Promise<Session | undefined>;
    getSessionOrFail(sessionId: ID): Promise<Session>;
    getSessionByToken(token: string): Promise<Session | undefined>;
    getSessionByTokenOrThrow(token: string): Promise<Session>;
    getSessionByRefreshToken(refreshToken: string): Promise<Session | undefined>;
    updateSession(session: {
        id: string;
    }, token: string, refreshToken: string): Promise<Session>;
    updateFirebaseToken(session: {
        id: string;
    }, registrationId: string): Promise<void>;
}
