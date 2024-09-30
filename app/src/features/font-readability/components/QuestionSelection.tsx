import { ScrollView, StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
import { Question } from '../types/task';
import { Text } from '@lib/ui/components/Text';
import React, { useMemo } from 'react';
import { Col } from '@lib/ui/components/Col';
import { useStylesheet } from '@lib/ui/hooks/useStylesheet';
import { Theme } from '@lib/ui/types/Theme';

type Props = {
  question: Question;
  onSelect: (option: string) => void;
  isLoading?: boolean;
  fontStyle?: TextStyle;
}

export const QuestionSelection = ({ question, onSelect, isLoading, fontStyle }: Props) => {
  const styles = useStylesheet(createStyles);

  const options = useMemo(() => {
    return question.options.sort(() => Math.random() - 0.5);
  }, [question.options]);

  return (<ScrollView
    contentInsetAdjustmentBehavior="automatic"
    contentContainerStyle={{ flexGrow: 1 }}
  >
    <Col ph={5} pv={3}>

      <Text variant="heading" style={fontStyle}>{question.statement}</Text>

      <Col pv={3}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
            ]}
            disabled={isLoading}
            onPress={() => onSelect(option)}
          >
            <Text style={fontStyle}>{option}</Text>
          </TouchableOpacity>
        ))}
      </Col>
    </Col>
  </ScrollView>);
};

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    optionButton: {
      padding: 15,
      borderRadius: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.heading,
      marginVertical: 10,
    },
  });