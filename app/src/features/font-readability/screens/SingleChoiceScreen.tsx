import { TouchableOpacity, View } from 'react-native';
import { CtaButton } from '@lib/ui/components/CtaButton';
import { StackParamList } from '../components/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from '@lib/ui/components/Text';

type Props = NativeStackScreenProps<StackParamList, 'SingleChoice'>;
export const SingleChoiceScreen = ({ navigation }: Props) => {

  const choices = ["Option 1", "Option 2", "Option 3"];

  const onOptionPress = (option: string) => {
    navigation.navigate('Midtime')
  }

  return (
    <View>
      <Text>Pick an Option</Text>
      <Text>Please choose one of the following:</Text>
      {choices.map((choice, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onOptionPress(choice)}
        >
          <Text>{choice}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
