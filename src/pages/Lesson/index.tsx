import React, { useCallback, useMemo } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  VideoContainer,
  BodyContainer,
  LessonTitle,
  LessonInfo,
  LessonInfoView,
  Description,
  BottomButton,
  ReturnText,
} from './styles';

import { useInfos } from '../../hooks/infos';

import Header from '../../components/Header';
import RoundFlatButton from '../../components/RoundFlatButton';

const Lesson: React.FC = () => {
  const {
    selectedLesson,
    lessonIndex,
    lessons,
    setSelectedLesson,
    setLessonIndex,
    setCompleted,
  } = useInfos();

  const navigation = useNavigation();

  const convertToMinutes = useCallback((seconds: number) => {
    return Math.round(seconds / 60);
  }, []);

  const hasPrevious = useMemo(() => {
    return lessonIndex > 0;
  }, [lessonIndex]);

  const hasNext = useMemo(() => {
    return lessonIndex !== lessons.length - 1;
  }, [lessonIndex, lessons]);

  const previousClick = useCallback(() => {
    setSelectedLesson(lessons[lessonIndex - 1]);
    setLessonIndex(lessonIndex - 1);
  }, [lessons, lessonIndex, setLessonIndex, setSelectedLesson]);

  const nextClick = useCallback(() => {
    if (!selectedLesson.completed) {
      setCompleted(selectedLesson.course_id, selectedLesson.id);
    }
    setSelectedLesson(lessons[lessonIndex + 1]);
    setLessonIndex(lessonIndex + 1);
  }, [
    lessons,
    lessonIndex,
    setLessonIndex,
    setSelectedLesson,
    setCompleted,
    selectedLesson.completed,
    selectedLesson.course_id,
    selectedLesson.id,
  ]);

  const finishClick = useCallback(() => {
    if (!selectedLesson.completed) {
      setCompleted(selectedLesson.course_id, selectedLesson.id);
    }
    navigation.goBack();
  }, [
    setCompleted,
    selectedLesson.completed,
    selectedLesson.course_id,
    selectedLesson.id,
    navigation,
  ]);

  return (
    <Container>
      <Header />
      <BodyContainer>
        <VideoContainer>
          <WebView
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction
            source={{
              uri: `https://www.youtube.com/embed/${selectedLesson.video_id}`,
            }}
          />
        </VideoContainer>
        <LessonTitle>{selectedLesson.name}</LessonTitle>
        <LessonInfoView>
          <LessonInfo>Aula {lessonIndex + 1}</LessonInfo>
          <LessonInfo>
            <Icon name="clock" size={12} color="#a0a0b2" />{' '}
            {convertToMinutes(selectedLesson.duration)}min
          </LessonInfo>
        </LessonInfoView>

        <ScrollView>
          <Description>{selectedLesson.description}</Description>
        </ScrollView>

        {hasPrevious || hasNext ? (
          <BottomButton>
            {hasPrevious ? (
              <Pressable onPress={previousClick}>
                <ReturnText>
                  <Icon name="arrow-left" size={15} color="#ff6680" /> Aula
                  anterior
                </ReturnText>
              </Pressable>
            ) : null}

            {hasNext ? (
              <RoundFlatButton
                onPress={nextClick}
                color="#ff6680"
                height={56}
                width={163}
              >
                Próxima aula <Icon name="arrow-right" size={15} color="#fff" />
              </RoundFlatButton>
            ) : (
              <RoundFlatButton
                onPress={finishClick}
                color="#ff6680"
                height={56}
                width={163}
              >
                Finalizar <Icon name="check-circle" size={15} color="#fff" />
              </RoundFlatButton>
            )}
          </BottomButton>
        ) : null}
      </BodyContainer>
    </Container>
  );
};

export default Lesson;
