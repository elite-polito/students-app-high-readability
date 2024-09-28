import { StackParamList } from '../components/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGetTask } from '../queries/tester.queries';

type Props = NativeStackScreenProps<StackParamList, 'Task'>;

export const TaskScreen = ({navigation, route}: Props) => {
  const { taskIndex } = route.params;
  const task = useGetTask(taskIndex);

  if(!task) return null;

  if(task.taskType === 'reading') {
    return <TextTask task={task} />;
  } else {
    return <SelectionTask task={task
  }

}