import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './Navigator';
import { Text } from '@lib/ui/components/Text';
import { ScrollView } from 'react-native';
import { CtaButton } from '@lib/ui/components/CtaButton';
import { useActivityTimer } from '../hooks/activityTimer';
import { useAddResponse } from '../queries/response.queries';
import { useFeedbackContext } from '../../../core/contexts/FeedbackContext';
import { useTesterContext } from '../contexts/TesterContext';
import { TaskRef } from '../types/tester';
import { useGetStory } from '../hooks/contentRetriever';
import React, { useState } from 'react';
import { Col } from '@lib/ui/components/Col';
import { getFontStyles } from '../helpers/fonts';
import { QuestionSelection } from './QuestionSelection';

type Props = NativeStackScreenProps<StackParamList, 'Task'> & { taskRef: TaskRef };
export const StoryScreenContent = ({ navigation, taskRef, route }: Props) => {

  const { testerId } = useTesterContext();
  const { time, stopTimer } = useActivityTimer();
  const { setFeedback } = useFeedbackContext();
  const addResponse = useAddResponse();

  const story = useGetStory(taskRef.contentIndex);
  const fontStyle = getFontStyles(taskRef.fontIndex);

  const [readingComplete, setReadingComplete] = useState(false);


  const onContinue = () => {
    stopTimer();
    setReadingComplete(true);
  };

  const onSelect = (option: string) => {
    addResponse.mutateAsync({
      testerId: testerId!,
      ...taskRef,
      timeMs: time,
      isCorrect: option === story.correctOption,
    }).then((r) => {
      if (route.params.taskIndex >= 11) {
        navigation.replace('End');
      } else {
        navigation.replace('Task', {
          taskIndex: route.params.taskIndex + 1,
        });
      }
    }).catch((error) => {
      setFeedback({ text: error.message, isError: true });
    });
  };

  return  readingComplete ?
      <QuestionSelection
        question={{statement: story.question, options: story.options, correctOption: story.correctOption}}
        onSelect={onSelect} fontStyle={fontStyle} isLoading={addResponse.isLoading} />
      : <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={{ flexGrow: 1 }}
  >
    <Col ph={5} pv={3} justify={'space-between'} style={{ flexGrow: 1 }}>
      <Text variant="longProse" style={fontStyle}>{story.content}</Text>
      <CtaButton absolute={false} action={onContinue} title={'Next'} />
    </Col>
  </ScrollView>;
};