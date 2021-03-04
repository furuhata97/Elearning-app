import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { Course } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const CoursesHeader = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const CoursesTitle = styled.Text`
  color: #3d3d4c;
  font-family: 'Rubik-Regular';
  font-size: 20px;
  line-height: 23.7px;
`;

export const CoursesCount = styled.Text`
  color: #a0a0b2;
  font-family: 'Roboto-Regular';
  font-size: 15px;
  line-height: 17.58px;
`;

export const CourseList = styled(FlatList as new () => FlatList<Course>)`
  flex-direction: column;
`;

export const SingleCourseContainer = styled(RectButton)`
  background: #fff;
  border-radius: 16px;
  width: 156px;
  height: 172px;
  padding: 0 45px 16px 20px;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  margin: 8px;
`;

export const CourseImage = styled.Image`
  width: 64px;
  height: 64px;
  margin: 0;
  padding: 0;
`;

export const SingleCourseTitle = styled.Text`
  color: #6c6c80;
  font-family: 'Rubik-Regular';
  font-size: 15px;
  line-height: 20px;
  margin: 24px 0 0 0;
  padding: 0;
`;

export const CourseClasses = styled.Text`
  color: #c4c4d1;
  font-family: 'Roboto-Regular';
  font-size: 10px;
  line-height: 11.72px;
  margin: 4px 0 0 0;
  padding: 0;
`;

export const TrashButton = styled(RectButton)`
  position: absolute;
  width: 22px;
  height: 22px;
  left: 138.33%;
  right: 8.33%;
  top: 8.33%;
  bottom: 8.33%;
`;

export const ModalBox = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.View`
  background: #fff;
  border-radius: 16px;
  width: 277px;
  height: 242px;
  align-items: center;
  box-shadow: 10px 5px 5px #000;
`;

export const TrashIcon = styled(Icon)`
  margin: 36px 0 28px 0;
`;

export const RemoveText = styled.Text`
  color: #6c6c80;
  font-family: 'Rubik-Regular';
  font-size: 15px;
  line-height: 25px;
  margin: 0 0 16px 0;
  padding: 0;
  width: 152px;
  height: 50px;
  text-align: center;
`;

export const ModalButtonBox = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ModalCancelButton = styled.Text`
  color: #ff6680;
  font-family: 'Roboto-Regular';
  font-size: 15px;
  line-height: 18px;
  padding: 11px 24px;
`;
