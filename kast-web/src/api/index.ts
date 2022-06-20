import AvikastApi from './AvikastApi';
import {IAvikastApi} from './IAvikastApi';
import {createConfiguration} from './ApiConfiguration';
import IApiTokenHolder from '@spryrocks/react-api/IApiTokenHolder';
import ApiTokenHolder from '@spryrocks/react-api/ApiTokenHolder';
import ApiDelegate from '@spryrocks/react-api/ApiDelegate';
import {getHeaders} from './AvikastApiUtils';
import {AuthInfoKeeper} from '../auth';

const tokenHolder: IApiTokenHolder = new ApiTokenHolder();

const delegate: ApiDelegate = {
  getHeaders,
  getAuthInfo: async () => {
    const session = await AuthInfoKeeper.getSession();
    if (!session) return undefined;

    return {
      accessToken: session.jwt,
      refreshToken: session.refreshToken,
    };
  },
  updateAuthInfo: async (authInfo) => {
    await AuthInfoKeeper.updateSession({
      jwt: authInfo.accessToken,
      refreshToken: authInfo.refreshToken,
    });
  },
};

const avikastApi: IAvikastApi = new AvikastApi(
  createConfiguration(),
  delegate,
  tokenHolder,
);

export {avikastApi as AvikastApi, tokenHolder as AvikastApiTokenHolder};
