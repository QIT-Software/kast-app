import {createAction} from 'redux-actions';
import types from './types';
import * as H from 'history';
import {FetchUser} from 'state/ducks/user/actions';

export type NavigationPayload = {history: H.History};
export type NavigateToRoom = {
  roomId: string;
  enableMicrophone: boolean;
  enableCamera: boolean;
} & NavigationPayload;

export type NavigateToReferrers = {
  id: string;
} & NavigationPayload;

export default {
  goBack: createAction<NavigationPayload>(types.GO_BACK),
  navigateToAuth: createAction<NavigationPayload>(types.NAVIGATE_TO_AUTH),
  navigateToSignIn: createAction<NavigationPayload>(types.NAVIGATE_TO_SIGN_IN),
  navigateToMain: createAction<NavigationPayload>(types.NAVIGATE_TO_MAIN),
  navigateToRoom: createAction<NavigateToRoom>(types.NAVIGATE_TO_ROOM),
  navigateToReferrers: createAction<NavigateToReferrers>(types.NAVIGATE_TO_REFERRERS),
  navigateToUser: createAction<FetchUser>(types.NAVIGATE_TO_USER),
  navigateToPdf: createAction<NavigationPayload>(types.NAVIGATE_TO_PDF),
};
