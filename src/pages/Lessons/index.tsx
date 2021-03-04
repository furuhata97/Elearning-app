import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { useInfos } from '../../hooks/infos';

import Header from '../../components/Header';
import RoundedBody from '../../components/RoundedBody';

import {
  Container,
  CourseInfo,
  CourseTitle,
  ClassCount,
  LessonCard,
  LessonView,
  PlayCard,
  LessonTitle,
  LessonInfoView,
  LessonInfo,
  CompletedTag,
  CompletedText,
} from './styles';

interface Lesson {
  id: string;
  name: string;
  duration: number;
  description: string;
  video_id: string;
  course_id: string;
  completed: true;
}

const Lessons: React.FC = () => {
  const {
    lessons,
    selectedCourseName,
    setSelectedLesson,
    setLessonIndex,
  } = useInfos();
  const { navigate } = useNavigation();

  const convertToMinutes = useCallback((seconds: number) => {
    return Math.round(seconds / 60);
  }, []);

  const navigateToLesson = useCallback(
    (lesson: Lesson, index: number) => {
      setSelectedLesson(lesson);
      setLessonIndex(index);
      navigate('Lesson');
    },
    [setSelectedLesson, navigate, setLessonIndex],
  );

  return (
    <Container>
      <Header />
      <RoundedBody>
        <CourseInfo>
          <CourseTitle numberOfLines={1}>{selectedCourseName}</CourseTitle>
          <ClassCount>{`${lessons.length} aulas`}</ClassCount>
        </CourseInfo>
        <FlatList
          data={lessons}
          keyExtractor={(lesson: Lesson) => lesson.id}
          renderItem={({ item: lesson, index }) => (
            <Pressable onPress={() => navigateToLesson(lesson, index)}>
              <LessonView>
                <LessonCard>
                  <View>
                    <LessonTitle numberOfLines={2}>{lesson.name}</LessonTitle>
                  </View>
                  <LessonInfoView>
                    <LessonInfo>Aula {index + 1}</LessonInfo>
                    <LessonInfo>
                      <Icon name="clock" size={10} color="#c4c4d1" />{' '}
                      {convertToMinutes(lesson.duration)}min
                    </LessonInfo>
                    {lesson.completed ? (
                      <CompletedTag>
                        <CompletedText>Completo!</CompletedText>
                      </CompletedTag>
                    ) : null}
                  </LessonInfoView>
                </LessonCard>
                {lesson.completed ? (
                  <PlayCard completed>
                    <Icon name="play-circle" size={40} color="#fff" />
                  </PlayCard>
                ) : (
                  <PlayCard>
                    <Icon name="play-circle" size={40} color="#fff" />
                  </PlayCard>
                )}
              </LessonView>
            </Pressable>
          )}
        />
      </RoundedBody>
    </Container>
  );
};

export default Lessons;
