import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../components/Navigator';
import { ScrollView } from 'react-native';
import { CtaButton } from '@lib/ui/components/CtaButton';
import { useGetTester } from '../queries/tester.queries';
import { useTesterContext } from '../contexts/TesterContext';
import { Text } from '@lib/ui/components/Text';
import { ScreenTitle } from '@lib/ui/components/ScreenTitle';
import { Col } from '@lib/ui/components/Col';
import { RefreshControl } from '@lib/ui/components/RefreshControl';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<StackParamList, 'Start'>;

export const StartScreen = ({ navigation }: Props) => {
  const {t} = useTranslation();
  const { testerId } = useTesterContext();

  const testerQuery = useGetTester(testerId);
  const onContinue = () => {
    if (testerQuery.data?.nextTask !== undefined) {
      navigation.replace('Task', {
        taskIndex: testerQuery.data.nextTask,
      });
    }
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl queries={[testerQuery]} manual />}
    >
      <Col ph={5} pv={3} justify={'space-between'} style={{ flexGrow: 1 }}>
        <Col gap={3}>
          <ScreenTitle title={t('fontReadability.whatToExpect')} />
          <Text>
            {t('fontReadability.whatToExpectText')}
          </Text>
        </Col>
        <CtaButton absolute={false} action={onContinue} title={t('fontReadability.next')} loading={testerQuery.isLoading}
                   disabled={testerQuery.isLoading} />
      </Col>
    </ScrollView>
  );
};

