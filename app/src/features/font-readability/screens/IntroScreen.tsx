import { Keyboard, ScrollView } from 'react-native';
import { Text } from '@lib/ui/components/Text';
import { CtaButton } from '@lib/ui/components/CtaButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../components/Navigator';
import { ScreenTitle } from '@lib/ui/components/ScreenTitle';
import { TextField } from '@lib/ui/components/TextField';
import { useMemo, useState } from 'react';
import { useTesterContext } from '../contexts/TesterContext';
import { Col } from '@lib/ui/components/Col';

type Props = NativeStackScreenProps<StackParamList, 'Intro'>;

export const IntroScreen = ({ navigation }: Props) => {
  const [testerId, setTesterId] = useState<string>();
  const { setTesterId: setTesterInContext } = useTesterContext();

  const isNumericTesterId = useMemo(() => {
    return Number(testerId) > 0;
  }, [testerId]);

  const onStartTest = () => {
    setTesterInContext(Number(testerId));
    navigation.navigate('Start');
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1 }}
      // refreshControl={<RefreshControl queries={[useNewsItemQuery]} manual />}
    >
      <Col ph={5} pv={3} justify={'space-between'} style={{ flexGrow: 1 }}>
        <Col gap={3}>
          <ScreenTitle title={'Welcome'} />
          <Text>Please sign the consent form if you haven't yet, and insert the tester number below.</Text>
          <TextField
            label={'tester number'}
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
        <CtaButton absolute={false} title="Next" disabled={!isNumericTesterId} action={() => onStartTest()} />
      </Col>
    </ScrollView>
  );
};

