import { APP_BUILD, APP_VERSION } from '@env';
import * as Sentry from '@sentry/react-native';

import { isEnvProduction } from './env';

export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

export const initSentry = () => {
  Sentry.init({
    dsn: 'https://89d16f0797721869f2f24fa5725b1999@sentry.k8s.polito.it/10',
    enabled: isEnvProduction,
    enableNative: true,
    integrations: [
      new Sentry.ReactNativeTracing({
        routingInstrumentation,
      }),
    ],
    release: `it.polito.students@${APP_VERSION}`,
    dist: APP_BUILD,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  });
};
