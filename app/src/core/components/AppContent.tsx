import { Navigator } from '../../features/font-readability/components/Navigator';
import { TesterContext } from '../../features/font-readability/contexts/TesterContext';
import { useEffect, useState } from 'react';
import i18n from 'i18next';

export const AppContent = () => {
  const [testerId, setTesterId] = useState<number>();
  const [language, setLanguage] = useState<string>('it');
  
  useEffect(() => {
    i18n.changeLanguage(language);

  }, [language]);
  return <TesterContext.Provider
    value={{ testerId, setTesterId, language, setLanguage }}>
    <Navigator />
  </TesterContext.Provider>;
};
