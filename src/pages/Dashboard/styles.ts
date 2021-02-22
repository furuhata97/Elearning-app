import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Course } from './index';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  padding: 24px 24px 6px 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  width: 100%;

  flex-direction: column;
`;

export const HeaderTop = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SearchBox = styled.View`
  width: 100%;
  height: 56px;
  flex-direction: row;
  align-items: center;
  margin: 36px 0;
  border-radius: 100px;
  background: #ffffff;
  padding: 0 26px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #666360;
  font-size: 15px;
  font-family: 'Roboto-Regular';
`;

export const CoursesContainer = styled.View`
  width: 100%;
  height: 100%;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background: #f0edf5;
  padding: 24px 24px 0 24px;
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
  padding: 8px 45px 16px 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

export const TabContainer = styled.View`
  width: 100%;
  height: 73px;
  margin: 0;
  background: #fff;
  flex-direction: row;
`;

export const TabButtonContainer = styled.View`
  flex: 1;
  padding: 0;
  margin: 0;
  border-radius: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top-color: #ff6680;
  border-top-width: 1.5px;
`;

export const TabButton = styled(RectButton)`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TabText = styled.Text`
  color: #ff6680;
  font-family: 'Roboto-Regular';
  font-size: 15px;
  margin-left: 12px;
`;
