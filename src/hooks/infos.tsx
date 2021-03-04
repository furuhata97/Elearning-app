import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMacAddress } from 'react-native-device-info';

import api from '../services/api';

interface Lesson {
  id: string;
  name: string;
  duration: number;
  description: string;
  video_id: string;
  course_id: string;
  completed: true;
}

interface Course {
  id: string;
  name: string;
  image: string;
  image_url: string;
  lessons: [];
}

interface CompletedLessons {
  course_id: string;
  lessons_id: string[];
}

interface InfosContextState {
  isClickedHome: boolean;
  isClickedSaved: boolean;
  savedCourses: Course[];
  lessons: Lesson[];
  selectedCourseName: string;
  selectedLesson: Lesson;
  lessonIndex: number;
  setSelectedCourseName: React.Dispatch<React.SetStateAction<string>>;
  setSelectedLesson: React.Dispatch<React.SetStateAction<Lesson>>;
  setLessonIndex: React.Dispatch<React.SetStateAction<number>>;
  loadLessons(course_id: string): Promise<void>;
  handleClickHome(): void;
  handleClickSaved(): void;
  savedCoursesList(courses: Course[]): Promise<void>;
  saveCourse(course_id: string): Promise<void>;
  removeSavedCourse(course_id: string): Promise<void>;
  setCompleted(course_id: string, lesson_id: string): Promise<void>;
}

const InfosContext = createContext<InfosContextState>({} as InfosContextState);

export const InfosProvider: React.FC = ({ children }) => {
  const [isClickedHome, setIsClickedHome] = useState(true);
  const [isClickedSaved, setIsClickedSaved] = useState(false);
  const [savedCourses, setSavedCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<Lesson>({} as Lesson);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<CompletedLessons[]>(
    [],
  );

  useEffect(() => {
    async function loadCompletedLessons(): Promise<void> {
      // await AsyncStorage.clear();
      const completed = await AsyncStorage.getItem('@Elearning:completed');
      if (completed) {
        setCompletedLessons(JSON.parse(completed));
      }
    }

    loadCompletedLessons();
  }, []);

  const handleClickHome = useCallback(() => {
    setIsClickedHome(true);
    setIsClickedSaved(false);
  }, []);

  const handleClickSaved = useCallback(() => {
    setIsClickedSaved(true);
    setIsClickedHome(false);
  }, []);

  const loadLessons = useCallback(
    async (course_id) => {
      const mac = await getMacAddress();
      try {
        api.defaults.headers.authorization = mac;
        const response = await api.get(`/courses/${course_id}/lessons`);
        const completed = completedLessons.find(
          (obj) => obj.course_id === course_id,
        );
        if (completed) {
          for (let i = 0; i < response.data.length; i++) {
            const lesson_id = completed.lessons_id.find(
              (id) => id === response.data[i].id,
            );
            if (lesson_id) {
              response.data[i].completed = true;
            } else response.data[i].completed = false;
          }
        } else {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].completed = false;
          }
        }
        setLessons(response.data);
      } catch (err) {
        setLessons([]);
      }
    },
    [completedLessons],
  );

  const setCompleted = useCallback(
    async (course_id: string, lesson_id: string) => {
      const response = await AsyncStorage.getItem('@Elearning:completed');
      if (response) {
        const completed: CompletedLessons[] = JSON.parse(response);
        const completedIndex = completed.findIndex(
          (obj) => obj.course_id === course_id,
        );
        if (completedIndex >= 0) {
          completed[completedIndex].lessons_id.push(lesson_id);
          setCompletedLessons(completed);
          await AsyncStorage.setItem(
            '@Elearning:completed',
            JSON.stringify(completed),
          );
        } else {
          const newRegister: CompletedLessons = {
            course_id,
            lessons_id: [lesson_id],
          };
          completed.push(newRegister);
          setCompletedLessons(completed);
          await AsyncStorage.setItem(
            '@Elearning:completed',
            JSON.stringify(completed),
          );
        }
      } else {
        const firstRegister: CompletedLessons[] = [
          {
            course_id,
            lessons_id: [lesson_id],
          },
        ];
        setCompletedLessons(firstRegister);
        await AsyncStorage.setItem(
          '@Elearning:completed',
          JSON.stringify(firstRegister),
        );
      }
      const updatedLessons = lessons.map((lesson) => {
        if (lesson.id === lesson_id) {
          const updLesson = lesson;
          updLesson.completed = true;
          return updLesson;
        }
        return lesson;
      });
      setLessons(updatedLessons);
    },
    [lessons],
  );

  const saveCourse = useCallback(async (course_id) => {
    const courses = await AsyncStorage.getItem('@Elearning:saved');
    let parsedCourses: string[] = [];

    if (courses) {
      parsedCourses = JSON.parse(courses);
    }

    const findCourse = parsedCourses.find((fCourse) => fCourse === course_id);

    if (findCourse) {
      return;
    }

    parsedCourses.push(course_id);

    await AsyncStorage.setItem(
      '@Elearning:saved',
      JSON.stringify(parsedCourses),
    );
    // await AsyncStorage.clear();
  }, []);

  function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    if (value === null || value === undefined) return false;
    const testDummy: TValue = value;
    return true;
  }

  const savedCoursesList = useCallback(async (courses: Course[]) => {
    const coursesList = await AsyncStorage.getItem('@Elearning:saved');
    let idList: string[] = [];

    if (coursesList) {
      idList = JSON.parse(coursesList);
    }
    const coursesMatched = idList.map((courseId) => {
      const foundCourse = courses.find((course) => course.id === courseId);
      return foundCourse;
    });

    setSavedCourses(coursesMatched.filter(notEmpty));
  }, []);

  const removeSavedCourse = useCallback(
    async (course_id: string) => {
      const coursesList = await AsyncStorage.getItem('@Elearning:saved');
      let parsedCourses: string[] = [];

      if (coursesList) {
        parsedCourses = JSON.parse(coursesList);
      }

      const coursesNotRemoved = parsedCourses.filter((id) => id !== course_id);
      await AsyncStorage.setItem(
        '@Elearning:saved',
        JSON.stringify(coursesNotRemoved),
      );

      setSavedCourses(savedCourses.filter((course) => course.id !== course_id));
    },
    [savedCourses],
  );

  return (
    <InfosContext.Provider
      value={{
        isClickedHome,
        isClickedSaved,
        handleClickHome,
        handleClickSaved,
        saveCourse,
        savedCoursesList,
        savedCourses,
        removeSavedCourse,
        lessons,
        loadLessons,
        selectedCourseName,
        setSelectedCourseName,
        selectedLesson,
        setSelectedLesson,
        lessonIndex,
        setLessonIndex,
        setCompleted,
      }}
    >
      {children}
    </InfosContext.Provider>
  );
};

export function useInfos(): InfosContextState {
  const context = useContext(InfosContext);

  if (!context) {
    throw new Error('useInfos must be used within as InfosProvider');
  }

  return context;
}
