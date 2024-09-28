import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../components/Navigator';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { CtaButton } from '@lib/ui/components/CtaButton';
import { useGetTester } from '../queries/tester.queries';
import { useTesterContext } from '../contexts/TesterContext';
import { Section } from '@lib/ui/components/Section';
import { Theme } from '@lib/ui/types/Theme';
import { useStylesheet } from '@lib/ui/hooks/useStylesheet';
import { Text } from '@lib/ui/components/Text';
import { ScreenTitle } from '@lib/ui/components/ScreenTitle';
import { Col } from '@lib/ui/components/Col';
import { RefreshControl } from '@lib/ui/components/RefreshControl';
import { TextField } from '@lib/ui/components/TextField';

type Props = NativeStackScreenProps<StackParamList, 'Start'>;

export const StartScreen = ({ navigation }: Props) => {

  const { testerId } = useTesterContext();

  const testerQuery = useGetTester(testerId);
  const onContinue = () => {
    if (testerQuery.data?.next_question) {
      navigation.navigate('ShortStory', {
        questionId: testerQuery.data.next_question,
        fontId: 1, // TODO handle fonts
      });
    }
  };

  const styles = useStylesheet(createStyles);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl queries={[testerQuery]} manual />}
    >
      <Col ph={5} pv={3} justify={'space-between'} style={{ flexGrow: 1 }}>
        <Col gap={3}>
          <ScreenTitle title={'Getting started'} />
          <Text>
            In the next screens, you will read four short stories. After reading each story, you will be asked to answer
            a single-choice question on it.
          </Text>
        </Col>
        <CtaButton absolute={false} action={onContinue} title="Continue" loading={testerQuery.isLoading}
                   disabled={testerQuery.isLoading} />
      </Col>
    </ScrollView>
  );
};


const createStyles = ({ spacing }: Theme) =>
  StyleSheet.create({
    content: {
      // height: '100%',
      backgroundColor: 'red',
    },
    heading: {
      paddingVertical: spacing[3],
    },
  });