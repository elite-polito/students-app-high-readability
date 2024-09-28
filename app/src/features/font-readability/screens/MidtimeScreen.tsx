import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../components/Navigator';
import { Text } from '@lib/ui/components/Text';
import { CtaButton } from '@lib/ui/components/CtaButton';

type Props = NativeStackScreenProps<StackParamList, 'Midtime'>;

export const MidtimeScreen = ({ navigation }: Props) => {
  const questionId = 1;
  const fontId = 1;

  return (
    <View>
      <Text>Take a Break!</Text>
      <Text>
        You've just finished reading two short stories. Take a moment to relax before moving on to the next section.
        After this, you'll be asked to answer 4 single-choice questions: pick the course that might be taught here at the Polythechnic.
      </Text>
      <CtaButton absolute title="End (for now)" action={() => navigation.navigate('End')} />
      {/*<CtaButton absolute title="Continue" action={() => navigation.navigate('SingleChoice', {questionId, fontId})} />*/}
    </View>
  );
};