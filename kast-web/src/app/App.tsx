import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {Layout} from 'components';
import Routes from 'routes';
import {getStore} from 'state';
import AppLoading from 'app/AppLoading';
import {initAsync} from './AppInitializer';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  const handleError = (e: any) => {
    // eslint-disable-next-line no-console
    console.log('eee', e);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={async () => {
          await initAsync();
        }}
        onFinish={() => setIsReady(true)}
        onError={handleError}
      />
    );
  }

  return (
    <Provider store={getStore()}>
      <Layout>
        <Routes />
      </Layout>
    </Provider>
  );
};

export default App;
