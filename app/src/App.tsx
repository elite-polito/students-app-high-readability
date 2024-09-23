import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as Sentry from '@sentry/react-native';

import { AppContent } from './core/components/AppContent';
import { FeedbackProvider } from './core/providers/FeedbackProvider';
import { PreferencesProvider } from './core/providers/PreferencesProvider';
import { UiProvider } from './core/providers/UiProvider';
import { initSentry } from './utils/sentry';

initSentry();

export const App = () => {
  return (
    <Sentry.TouchEventBoundary>
      <SafeAreaProvider>
        <PreferencesProvider>
          <UiProvider>
            <FeedbackProvider>
              <AppContent />
            </FeedbackProvider>
          </UiProvider>
        </PreferencesProvider>
      </SafeAreaProvider>
    </Sentry.TouchEventBoundary>
  );
};
