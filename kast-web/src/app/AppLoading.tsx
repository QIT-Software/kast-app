import {FC, useEffect, useState} from 'react';

interface AppLoadingProps {
  startAsync: () => Promise<void>;
  onFinish?: () => void;
  onError?: (error: Error) => void;
}

const AppLoading: FC<AppLoadingProps> = ({startAsync, onFinish, onError}) => {
  const [isMounted, setIsMounted] = useState(false);
  const startLoadingAppResourcesAsync = async () => {
    if (!onFinish)
      throw new Error('AppLoading onFinish prop is required if startAsync is provided');
    try {
      await startAsync();
      onFinish();
    } catch (e) {
      if (!isMounted) return;
      if (onError) {
        onError(e);
      } else {
        throw e;
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
    startLoadingAppResourcesAsync().catch((error) => {
      // eslint-disable-next-line no-console
      console.error(`AppLoading threw an unexpected error when loading:\n${error.stack}`);
    });
    return () => {
      // SplashScreen.hide();
    };
  }, []);
  return null;
};

export default AppLoading;
