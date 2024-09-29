import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../components/Navigator';
import { Text } from '@lib/ui/components/Text';
import { CtaButton } from '@lib/ui/components/CtaButton';
import { Col } from '@lib/ui/components/Col';
import { ScreenTitle } from '@lib/ui/components/ScreenTitle';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<StackParamList, 'End'>;

export const EndScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Col ph={5} pv={3} justify={'space-between'} style={{ flexGrow: 1 }}>
        <Col gap={3}>
          <ScreenTitle title={t('fontReadability.thankYou')} />
          <Text>
            {t('fontReadability.support')}
          </Text>
          <Text>
            {t('fontReadability.results')}
          </Text>
        </Col>
        <CtaButton absolute={false} title={t('fontReadability.finish')} action={() => navigation.replace('Intro')} />
      </Col>
    </ScrollView>
  );
};