import React, { useEffect, useState } from 'react';
import { ModalPortal } from 'react-native-modals';
import { init, wrap } from '@sentry/react-native';
import notifee, { EventType } from '@notifee/react-native';
import { AppProvider } from './src/context/AppContext';
import { MainScreen } from './src/MainScreen';
import { notifications } from 'controllers/notifications';
import { useIsMounted } from 'hooks/useIsMounted';

init({
  dsn: 'https://3a91eacf25944a5a8cbc58b87a3e05a6@o1102915.ingest.sentry.io/6129518',
  environment: __DEV__ ? 'dev' : 'prod',
});

const App = () => {
  const isMounted = useIsMounted();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notifee
      .getInitialNotification()
      .then(initialNotification => {
        if (isMounted() && initialNotification) {
          notifications.handleEvents({
            type:
              initialNotification.pressAction?.id !== 'default'
                ? EventType.ACTION_PRESS
                : EventType.PRESS,
            detail: initialNotification,
          });
        }
      })
      .finally(() => {
        if (isMounted()) {
          setLoading(false);
        }
      });
  }, [isMounted]);

  useEffect(() => {
    return notifee.onForegroundEvent(notifications.handleEvents);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AppProvider>
      <MainScreen />
      <ModalPortal />
    </AppProvider>
  );
};

export default wrap(App);
