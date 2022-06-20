import translations from 'resources/Translations.json';
import Localization from './localization/Localization';
import {AuthInfoKeeper} from 'auth/index';
import {initializeServicesAsync} from 'services';
import {configureStore} from 'state/StateInitializer';
import {rootSaga} from 'state/ducks';

const initAsync = async () => {
  await Localization.initAsync(translations);

  await configureStore(rootSaga);

  await AuthInfoKeeper.initialize();

  await initializeServicesAsync();
};

export {
  //
  initAsync,
};
