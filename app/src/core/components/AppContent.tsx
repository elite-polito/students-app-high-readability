import { Navigator } from '../../features/font-readability/components/Navigator';
import { TesterContext } from '../../features/font-readability/contexts/TesterContext';
import { useState } from 'react';

export const AppContent = () => {
  const [testerId, setTesterId] = useState<number>();
  return <TesterContext.Provider value={{ testerId, setTesterId }}><Navigator /></TesterContext.Provider>;
};
