import { itStories } from '../data/it/stories';
import { enStories } from '../data/en/stories';
import { useTesterContext } from '../contexts/TesterContext';
import { itQuestions } from '../data/it/questions';
import { enQuestions } from '../data/en/questions';
import { Question } from '../types/task';
import { useTranslation } from 'react-i18next';

export const useGetStory = (storyIndex: number) => {
  const {language} = useTesterContext();

  if(language === 'it') {
    return itStories[storyIndex];
  } else {
    return enStories[storyIndex];
  }
}

export const useGetQuestion = (questionIndex: number): Question => {
  const {language} = useTesterContext();
  const {t} = useTranslation();

  if(language === 'it') {
    return { statement: t('selectionTaskQuestion'), ...itQuestions[questionIndex] };
  } else {
    return { statement: t('selectionTaskQuestion'), ...enQuestions[questionIndex] };
  }
}
