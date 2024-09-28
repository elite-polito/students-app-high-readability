import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../components/Navigator';
import { Text } from '@lib/ui/components/Text';
import { CtaButton } from '@lib/ui/components/CtaButton';

type Props = NativeStackScreenProps<StackParamList, 'End'>;

export const EndScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text variant="heading">Thank You!</Text>
      <Text>
        Thank you for participating in this usability study. Your input is invaluable to us!
      </Text>
      <Text>
        You will receive the results of the study once they are ready from the Special Needs office.
      </Text>

      <CtaButton absolute title={'Finish'} action={() => navigation.popToTop()} />
    </View>
  );
};