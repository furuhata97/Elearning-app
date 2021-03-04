import React from 'react';
import { View, FlatList } from 'react-native';
import withObservables from '@nozbe/with-observables';
import { Q, Model, Collection } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';

import {
  SingleCourseContainer,
  SingleCourseTitle,
  CourseList,
  CourseImage,
  CourseClasses,
} from '../styles';

import noImage from '../../../../assets/no-image.png';

interface ModelCourse extends Model {
  id: string;
  name: string;
  image_url: string;
}

interface ModelLesson extends Model {
  id: string;
  name: string;
  description: string;
  duration: number;
}

type DBTypes = {
  courses: ModelCourse;
  lessons: ModelLesson;
};

const ListSaved: React.FC<DBTypes> = ({ courses, lessons }) => {
  return (
    <CourseList
      data={courses}
      keyExtractor={(course: ModelCourse) => course.id}
      numColumns={2}
      renderItem={({ item: course }) => (
        <SingleCourseContainer>
          <CourseImage
            source={
              course.image_url !== null
                ? {
                    uri: course.image_url.replace('localhost', '10.0.2.2'),
                  }
                : noImage
            }
          />

          <SingleCourseTitle>{course.name}</SingleCourseTitle>
          {/* <CourseClasses>{course.lessons.length} aulas</CourseClasses> */}
        </SingleCourseContainer>
      )}
    />
  );
};

const enhance = withObservables(['courses'], ({ database }) => ({
  todos: database.collections.get('todos'),
}));

export default withDatabase(enhance(ListSaved));
