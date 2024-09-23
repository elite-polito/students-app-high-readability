import { Platform } from 'react-native';

import { useTheme } from '@lib/ui/hooks/useTheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HeaderLogo } from '../../../core/components/HeaderLogo';
import { IntroScreen } from '../screens/IntroScreen';

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
        headerTitle: 'High readability',
      }}
    >
      <Stack.Screen name="Intro" component={IntroScreen} />
    </Stack.Navigator>
  );
};
