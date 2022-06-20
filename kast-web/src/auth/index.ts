import IAuthInfoKeeper, {
  AuthInfoKeeperDelegate,
} from '@spryrocks/react-auth/IAuthInfoKeeper';
import AuthInfoKeeper from '@spryrocks/react-auth/AuthInfoKeeper';
import {AvikastApiTokenHolder} from 'api';
import WebStorage from '@react-native-community/async-storage-backend-web';
import User from 'entities/User';

const delegate: AuthInfoKeeperDelegate = {
  setToken: (accessToken) => {
    AvikastApiTokenHolder.setToken(accessToken);
  },
};

// @ts-ignore
const webStorage = new WebStorage('idb'); // todo: remove // @ts-ignore

const authInfoKeeper: IAuthInfoKeeper<User> = new AuthInfoKeeper<User>(
  delegate,
  webStorage,
);

export {authInfoKeeper as AuthInfoKeeper};
