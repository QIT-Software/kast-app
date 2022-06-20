import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import routerActions, {NavigationPayload} from '../router/actions';
import {AvikastApi as Api} from 'api';
import {AuthInfoKeeper} from 'auth';
import {mapLoginRequestToApi, mapRegisterRequestToApi} from 'api/Mappers';
import actions, {AuthCompleted, Login, RecoverPassword, RegisterUser} from './actions';
import {actions as snackActions} from '../snackBar';
import {processError} from '../alert/saga';
import AuthResponse from 'api/entities/AuthResponse';
import {actions as mediasoupActions} from '../mediasoup';
import {alertActions} from 'state/ducks/alert';

function* registerUser({payload: {request, history, returnUrl}}: Action<RegisterUser>) {
  try {
    const authResponse: AuthResponse = yield Api.register(
      mapRegisterRequestToApi(request),
    );
    yield put(actions.authCompleted({authResponse, history, returnUrl}));
  } catch (e) {
    yield put(actions.authCompleted(e));
  }
}

function* loginUser({payload: {request, returnUrl, history}}: Action<Login>) {
  try {
    const authResponse: AuthResponse = yield Api.login(mapLoginRequestToApi(request));
    yield put(actions.authCompleted({authResponse, history, returnUrl}));
  } catch (e) {
    yield put(actions.authCompleted(e));
  }
}

function* authCompleted({payload, error}: Action<AuthCompleted>) {
  if (error) {
    yield put(
      snackActions.showSnackbar({message: processError({error: payload}), type: 'error'}),
    );
    return;
  }

  const {
    authResponse: {jwt, refreshToken, user},
    returnUrl,
    history,
  } = payload;

  yield AuthInfoKeeper.authenticate({jwt, refreshToken}, user);

  history.push(returnUrl || '/main');
}

function* logout({payload}: Action<NavigationPayload>) {
  try {
    yield put(mediasoupActions.stopStreaming());
    yield put(mediasoupActions.stopRecording({roomId: undefined}));
    yield AuthInfoKeeper.reset();
    yield put(routerActions.navigateToAuth(payload));
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* recoverPassword({payload: {request, history}}: Action<RecoverPassword>) {
  try {
    yield Api.forgotPassword(request);
    yield put(actions.recoverPasswordCompleted({history}));
  } catch (e) {
    yield put(actions.recoverPasswordCompleted(e));
  }
}

function* recoverPasswordCompleted({payload, error}: Action<NavigationPayload>) {
  if (error) {
    yield put(
      snackActions.showSnackbar({message: processError({error: payload}), type: 'error'}),
    );
  }
  yield put(
    snackActions.showSnackbar({
      message: 'Password successfully changed!',
      type: 'success',
    }),
  );
  yield put(routerActions.navigateToAuth({history: payload.history}));

  // yield put(routerActions.goBack(payload));
}

export default function* () {
  yield all([
    takeEvery(types.LOGOUT, logout),
    takeEvery(types.REGISTER_USER, registerUser),
    takeEvery(types.AUTH_COMPLETED, authCompleted),
    takeEvery(types.LOGIN_USER, loginUser),
    takeEvery(types.RECOVER_PASSWORD, recoverPassword),
    takeEvery(types.RECOVER_PASSWORD_COMPLETED, recoverPasswordCompleted),
  ]);
}
