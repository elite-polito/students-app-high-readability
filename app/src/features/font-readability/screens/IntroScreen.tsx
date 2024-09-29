import { Keyboard, ScrollView } from 'react-native';
import { Text } from '@lib/ui/components/Text';
import { CtaButton } from '@lib/ui/components/CtaButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../components/Navigator';
import { ScreenTitle } from '@lib/ui/components/ScreenTitle';
import { TextField } from '@lib/ui/components/TextField';
import { useEffect, useMemo, useState } from 'react';
import { useTesterContext } from '../contexts/TesterContext';
import { Col } from '@lib/ui/components/Col';
import { LanguageDropdown } from '../components/LanguageDropdown';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<StackParamList, 'Intro'>;

export const IntroScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [testerId, setTesterId] = useState<string>();
  const { setTesterId: setTesterInContext } = useTesterContext();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <LanguageDropdown />
      ),
    });
  }, []);

  const isNumericTesterId = useMemo(() => {
    return Number(testerId) > 0;
  }, [testerId]);

  const onStartTest = () => {
    setTesterInContext(Number(testerId));
    navigation.replace('Start');
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Col ph={5} pv={3} justify={'space-between'} style={{ flexGrow: 1 }}>
        <Col gap={3}>
          <ScreenTitle title={t('fontReadability.welcome')} />
          <Text>{t('fontReadability.intro')}</Text>
          <TextField
            label={t('fontReadability.testerNumber')}
            onChangeText={setTesterId}
            value={testerId}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
              if (isNumericTesterId) onStartTest();
            }}
          />
        </Col>
        <CtaButton absolute={false} title={t('fontReadability.next')} disabled={!isNumericTesterId} action={() => onStartTest()} />
      </Col>
    </ScrollView>
  );
};

