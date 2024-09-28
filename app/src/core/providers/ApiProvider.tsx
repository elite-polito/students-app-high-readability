import { PropsWithChildren, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import NetInfo from '@react-native-community/netinfo';
import { onlineManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';


import { isEnvProduction } from '../../utils/env';
import { useFeedbackContext } from '../contexts/FeedbackContext';

export const ApiProvider = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const { setFeedback } = useFeedbackContext();

  useEffect(() => {
    // Handle login status
    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        const wasOnline = onlineManager.isOnline();
        if (wasOnline && !state.isConnected) {
          // Phone just went offline
          setOnline(false);
          setFeedback({
            text: t('common.noInternet'),
            isError: true,
            isPersistent: true,
          });
        } else if (!wasOnline && state.isConnected) {
          // Phone is back online
          setOnline(true);
          setFeedback(null);
        }
      });
    });
  }, [setFeedback, t]);

  const queryClient = useMemo(() => {


    return new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 1000 * 60 * 60 * 24 * 3, // 3 days
          staleTime: 300000, // 5 minutes
          retry: isEnvProduction ? 2 : 1,
          refetchOnWindowFocus: isEnvProduction,
        },
        mutations: {
          retry: 1,
        },
      },
    });
  }, [t]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
