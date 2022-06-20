import ApiConfiguration from '@spryrocks/react-api/ApiConfiguration';
import {ConfigService} from 'services';

export const createConfiguration = (): ApiConfiguration => ({
  host: ConfigService.get('REACT_APP_API_HOST'),
  port: ConfigService.getNumberOptional('REACT_APP_API_PORT'),
  securePort: ConfigService.getNumberOptional('REACT_APP_API_SECURE_PORT'),
  globalPrefix: ConfigService.getOptional('REACT_APP_API_GLOBAL_PREFIX'),
  graphql: {
    path: ConfigService.get('REACT_APP_API_GRAPHQL_PATH'),
    connectWebsocketTransport: true,
  },
  rest: {
    path: ConfigService.get('REACT_APP_API_REST_PATH'),
  },
  secure: ConfigService.getBooleanOptional('REACT_APP_API_SECURE'),
});
