import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

import { Alert, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useInfos } from '../../hooks/infos';
import noImage from '../../../assets/no-image.png';

import ButtonFooter from '../../components/ButtonFooter';
import Header from '../../components/Header';
import RoundedBody from '../../components/RoundedBody';
import RoundFlatButton from '../../components/RoundFlatButton';

import {
  Container,
  CoursesHeader,
  CoursesTitle,
  CourseImage,
  SingleCourseTitle,
  CourseClasses,
  CoursesCount,
  CourseList,
  SingleCourseContainer,
  TrashButton,
  ModalBox,
  ModalView,
  TrashIcon,
  RemoveText,
  ModalButtonBox,
  ModalCancelButton,
} from './styles';
import api from '../../services/api';

export interface Course {
  id: string;
  name: string;
  image: string;
  image_url: string;
  lessons: [];
}

const Dashboard: React.FC = () => {
  const {
    isClickedHome,
    savedCoursesList,
    saveCourse,
    savedCourses,
    removeSavedCourse,
    loadLessons,
    setSelectedCourseName,
  } = useInfos();
  const { navigate } = useNavigation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseCount, setCourseCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [courseForRemoval, setCourseForRemoval] = useState<Course>(
    {} as Course,
  );

  useEffect(() => {
    async function loadCourses(): Promise<void> {
      try {
        const response = await api.get('courses');
        setCourses(response.data[0]);
        setCourseCount(response.data[1]);
        await savedCoursesList(response.data[0]);
      } catch (err) {
        setCourseCount(0);
        setCourses([]);
      }
    }

    loadCourses();
  }, [savedCoursesList]);

  useEffect(() => {
    try {
      api.get('courses').then((response) => {
        setCourses(response.data[0]);
        setCourseCount(response.data[1]);
      });
    } catch (err) {
      setCourseCount(0);
      setCourses([]);
    }
  }, [isClickedHome]);

  const navigateToLessons = useCallback(
    async (course: Course) => {
      await loadLessons(course.id);
      setSelectedCourseName(course.name);
      navigate('Lessons');
    },
    [navigate, loadLessons, setSelectedCourseName],
  );

  const handleLongPress = useCallback(
    async (course: Course) => {
      await saveCourse(course.id);
      await savedCoursesList(courses);
      Alert.alert(
        'Curso salvo',
        `O curso ${course.name} foi salvo`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    },
    [saveCourse, savedCoursesList, courses],
  );

  const handleTrashButton = useCallback((course: Course) => {
    setModalVisible(true);
    setCourseForRemoval(course);
  }, []);

  const handleCancelButton = useCallback(() => {
    setModalVisible(false);
    setCourseForRemoval({} as Course);
  }, []);

  const handleRemoveCourse = useCallback(async () => {
    await removeSavedCourse(courseForRemoval.id);
    setModalVisible(false);
    setCourseForRemoval({} as Course);
  }, [courseForRemoval.id, removeSavedCourse]);

  return (
    <Container>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalBox>
          <ModalView>
            <TrashIcon name="trash" size={40} color="#ff6680" />
            <RemoveText>{`Quer excluir as aulas de ${courseForRemoval.name}?`}</RemoveText>
            <ModalButtonBox>
              <Pressable onPress={handleCancelButton}>
                <ModalCancelButton>Não!</ModalCancelButton>
              </Pressable>
              <Pressable onPress={handleRemoveCourse}>
                <RoundFlatButton color="#ff6680" width={133} height={40}>
                  Confirmar
                </RoundFlatButton>
              </Pressable>
            </ModalButtonBox>
          </ModalView>
        </ModalBox>
      </Modal>

      <Header dashboard />

      <RoundedBody>
        <CoursesHeader>
          <CoursesTitle>
            {isClickedHome ? 'Categorias' : 'Cursos Salvos'}
          </CoursesTitle>
          <CoursesCount>
            {isClickedHome ? `${courseCount} cursos` : ''}{' '}
          </CoursesCount>
        </CoursesHeader>
        {isClickedHome ? (
          <CourseList
            data={courses}
            keyExtractor={(course: Course) => course.id}
            numColumns={2}
            renderItem={({ item: course }) => (
              <LongPressGestureHandler
                onHandlerStateChange={({ nativeEvent }) => {
                  if (nativeEvent.state === State.ACTIVE) {
                    handleLongPress(course);
                  }
                }}
                minDurationMs={800}
              >
                <SingleCourseContainer
                  onPress={() => navigateToLessons(course)}
                >
                  <CourseImage
                    source={
                      course.image_url !== null
                        ? {
                            uri: course.image_url.replace(
                              'localhost',
                              '10.0.2.2',
                            ),
                          }
                        : noImage
                    }
                  />

                  <SingleCourseTitle numberOfLines={1}>
                    {course.name}
                  </SingleCourseTitle>
                  <CourseClasses>{course.lessons.length} aulas</CourseClasses>
                </SingleCourseContainer>
              </LongPressGestureHandler>
            )}
          />
        ) : (
          <CourseList
            data={savedCourses}
            keyExtractor={(course: Course) => course}
            numColumns={2}
            renderItem={({ item: course }) => (
              <SingleCourseContainer onPress={() => navigateToLessons(course)}>
                <TrashButton onPress={() => handleTrashButton(course)}>
                  <Icon name="trash" size={20} color="#C4C4D1" />
                </TrashButton>
                <CourseImage
                  source={
                    course.image_url !== null
                      ? {
                          uri: course.image_url.replace(
                            'localhost',
                            '10.0.2.2',
                          ),
                        }
                      : noImage
                  }
                />

                <SingleCourseTitle numberOfLines={1}>
                  {course.name}
                </SingleCourseTitle>
                <CourseClasses>{course.lessons.length} aulas</CourseClasses>
              </SingleCourseContainer>
            )}
          />
        )}
      </RoundedBody>

      <ButtonFooter />
    </Container>
  );
};

export default Dashboard;
