import { Platform } from 'react-native';

import { useTheme } from '@lib/ui/hooks/useTheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderLogo } from '../../../core/components/HeaderLogo';
import { IntroScreen } from '../screens/IntroScreen';
import { TesterNumberScreen } from '../screens/TesterNumberScreen';
import { ShortStoryScreen } from '../screens/ShortStoryScreen';
import { BufferScreen } from '../screens/BufferScreen';
import { SingleChoiceScreen } from '../screens/SingleChoiceScreen';

export const Navigator = () => {
  const Stack = createNativeStackNavigator();
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: false,
        headerLargeStyle: { backgroundColor: colors.background },
        headerTransparent: Platform.select({ ios: true }),
        headerBlurEffect: 'systemUltraThinMaterial',
        headerLeft: () => <HeaderLogo />,
        headerTitle: 'Font readability test',
      }}
    >
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="TesterNumber" component={TesterNumberScreen} />
      <Stack.Screen name="ShortStory" component={ShortStoryScreen} />
      <Stack.Screen name="SingleChoice" component={SingleChoiceScreen} />
      <Stack.Screen name="Buffer" component={BufferScreen} />
    </Stack.Navigator>
  );
};
