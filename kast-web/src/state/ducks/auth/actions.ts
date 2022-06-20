import {createAction} from 'redux-actions';
import types from './types';
import LoginRequest from '@spryrocks/react-auth/LoginRequest';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import {NavigationPayload} from 'state/ducks/router/actions';
import RegisterRequest from 'auth/RegisterRequest';
import AuthResponse from 'api/entities/AuthResponse';

export type RegisterUser = {
  request: RegisterRequest;
  returnUrl: string | undefined;
} & NavigationPayload;
export type AuthCompleted = {
  authResponse: AuthResponse;
  returnUrl: string | undefined;
} & NavigationPayload;
export type Login = {
  request: LoginRequest;
  returnUrl: string | undefined;
} & NavigationPayload;
export type RecoverPassword = {request: ForgotPasswordRequest} & NavigationPayload;

export default {
  registerUser: createAction<RegisterUser>(types.REGISTER_USER),
  login: createAction<Login>(types.LOGIN_USER),
  authCompleted: createAction<AuthCompleted>(types.AUTH_COMPLETED),
  logout: createAction<NavigationPayload>(types.LOGOUT),
  recoverPassword: createAction<RecoverPassword>(types.RECOVER_PASSWORD),
  recoverPasswordCompleted: createAction<NavigationPayload>(
    types.RECOVER_PASSWORD_COMPLETED,
  ),
  setIsChecking: createAction<boolean>(types.SET_IS_CHECKING),
};
