import { useTranslation } from 'react-i18next';
import { useTheme } from '@lib/ui/hooks/useTheme';
import { useTesterContext } from '../contexts/TesterContext';
import { useMemo } from 'react';
import { MenuAction, NativeActionEvent } from '@react-native-menu/menu';
import { Text, View } from 'react-native';
import { StatefulMenuView } from '@lib/ui/components/StatefulMenuView';
import { Row } from '@lib/ui/components/Row';
import { Icon } from '@lib/ui/components/Icon';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export const LanguageDropdown = () => {
  const { t } = useTranslation();
  const { palettes, spacing } = useTheme();
  const {language, setLanguage} = useTesterContext();

  const actions = useMemo((): MenuAction[] => {
    return (['it', 'en']).map(lang => {
      return {
        id: lang,
        title: t(lang),
        state: lang === language ? 'on' : undefined,
      };
    });
  }, [language]);

  const onPressAction = ({ nativeEvent: { event } }: NativeActionEvent) => {
    if (event === language) return;
    setLanguage(event);
  };

  return (
    <View
      style={{ padding: spacing[2] }}
      accessible={true}
      accessibilityRole={'button' }
    >
      <StatefulMenuView actions={actions} onPressAction={onPressAction}>
        <Row>
          <Text style={{ marginRight: 5 }}>
            {language}
          </Text>
            <Icon icon={faAngleDown} color={palettes.primary[500]} />
        </Row>
      </StatefulMenuView>
    </View>
  );
};