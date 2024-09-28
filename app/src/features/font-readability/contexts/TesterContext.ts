import { createContext, useContext } from 'react';

import { Feedback } from '@lib/ui/types/Feedback';

type TesterContextProps = {
  testerId?: number;
  setTesterId: (id: number) => void;
};

export const TesterContext = createContext<TesterContextProps | undefined>(
  undefined,
);

export const useTesterContext = () => {
  const testerContext = useContext(TesterContext);
  if (!testerContext)
    throw new Error(
      'No TesterContext.Provider found when calling useFeedbackContext.',
    );
  return testerContext;
};
