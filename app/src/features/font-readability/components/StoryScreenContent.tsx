import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './Navigator';
import { Text } from '@lib/ui/components/Text';
import { View } from 'react-native';
import { CtaButton } from '@lib/ui/components/CtaButton';
import { useActivityTimer } from '../hooks/activityTimer';
import { useAddResponse } from '../queries/response.queries';
import { useFeedbackContext } from '../../../core/contexts/FeedbackContext';
import { useTesterContext } from '../contexts/TesterContext';
import { TaskRef } from '../types/tester';

export const StoryScreenContent = (taskRef: TaskRef) => {

  const { testerId } = useTesterContext();
  const { time, stopTimer } = useActivityTimer();
  const { setFeedback } = useFeedbackContext();
  const addResponse = useAddResponse();
  // TODO implement
  // const fontStyle  = useGetFontStyle(fontId);
  const fontStyle = {};

  const onContinue = () => {
    stopTimer();
    addResponse.mutateAsync({
      testerId!,
      question_id: taskRef.,
      font_id: fontId,
      time_ms: time,
      question_type: 'read',
      is_correct: true,
    }).then((r) => {
      navigation.navigate('SingleChoice', {
        questionId: 1,
        fontId: 1,
      });
    }).catch((error) => {
      setFeedback({ text: error.message, isError: true });
    });
  };

  return <View>
    <Text variant="longProse" style={fontStyle}>Lorem ipsum up to 400 chars </Text>
    <CtaButton action={onContinue} title={'Next'} />
  </View>;
};