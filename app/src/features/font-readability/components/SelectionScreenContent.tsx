import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './Navigator';
import { useActivityTimer } from '../hooks/activityTimer';
import { useAddResponse } from '../queries/response.queries';
import { useFeedbackContext } from '../../../core/contexts/FeedbackContext';
import { useTesterContext } from '../contexts/TesterContext';
import { TaskRef } from '../types/tester';
import { useGetQuestion } from '../hooks/contentRetriever';
import React from 'react';
import { getFontStyles } from '../helpers/fonts';
import { QuestionSelection } from './QuestionSelection';

type Props = NativeStackScreenProps<StackParamList, 'Task'> & { taskRef: TaskRef };
export const SelectionScreenContent = ({ navigation, taskRef, route }: Props) => {

  const { testerId } = useTesterContext();
  const { time, stopTimer } = useActivityTimer();
  const { setFeedback } = useFeedbackContext();
  const addResponse = useAddResponse();

  const question = useGetQuestion(taskRef.contentIndex);
  const fontStyle = getFontStyles(taskRef.fontIndex);

  const onSelect = (option: string) => {
    stopTimer();
    addResponse.mutateAsync({
      testerId: testerId!,
      ...taskRef,
      timeMs: time,
      isCorrect: question.correctOption === option,
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

  return <QuestionSelection question={question} onSelect={onSelect} fontStyle={fontStyle} />;
};