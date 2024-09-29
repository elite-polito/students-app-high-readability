import { StackParamList } from '../components/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGetTask } from '../queries/tester.queries';
import { StoryScreenContent } from '../components/StoryScreenContent';
import { SelectionScreenContent } from '../components/SelectionScreenContent';

type Props = NativeStackScreenProps<StackParamList, 'Task'>;

export const TaskScreen = (props: Props) => {
  const { taskIndex } = props.route.params;
  const task = useGetTask(taskIndex);

  if (!task) return null;

  if (task.taskType === 'reading') {
    return <StoryScreenContent taskRef={task}  {...props} />;
  } else {
    return <SelectionScreenContent taskRef={task} {...props} />;
  }

};