import { Platform } from 'react-native';

import { useTheme } from '@lib/ui/hooks/useTheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderLogo } from '../../../core/components/HeaderLogo';
import { IntroScreen } from '../screens/IntroScreen';
import { StartScreen } from '../screens/StartScreen';
import { EndScreen } from '../screens/EndScreen';
import { TaskScreen } from '../screens/TaskScreen';

export type StackParamList = {
  Intro: undefined;
  Start: undefined;
  Task: { taskIndex: number };
  End: undefined;
};

export const Navigator = () => {
  const Stack = createNativeStackNavigator<StackParamList>();
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: false,
        headerLargeStyle: { backgroundColor: colors.background },
        headerTransparent: Platform.select({ ios: true }),
        headerBlurEffect: 'systemUltraThinMaterial',
        headerLeft: () => <HeaderLogo />,
        headerTitle: '',
      }}
    >
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Task" component={TaskScreen} />
      <Stack.Screen name="End" component={EndScreen} />

    </Stack.Navigator>
  );
};
