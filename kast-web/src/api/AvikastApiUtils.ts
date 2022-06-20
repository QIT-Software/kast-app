import {AvikastApiTokenHolder} from 'api';
import {AppType} from 'app/AppType';
import {Platform} from 'entities/Platform';

export const getHeaders = () => {
  const token = AvikastApiTokenHolder.getToken();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headers: any = {
    app: AppType.Client,
    platform: Platform.Web,
  };
  if (token) {
    headers.authorization = token;
  }

  return headers;
};
