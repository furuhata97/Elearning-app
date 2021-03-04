import styled, { css } from 'styled-components/native';
import { WebView } from 'react-native-webview';

export const Container = styled.View`
  flex: 1;
`;

export const VideoContainer = styled.View`
  width: 100%;
  height: 240px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  overflow: hidden;
`;

export const BodyContainer = styled.View`
  flex: 1;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background: #f0edf5;
  padding: 0;
`;

export const LessonTitle = styled.Text`
  color: #3d3d4c;
  font-family: 'Rubik-Regular';
  font-size: 30px;
  line-height: 35.55px;
  margin: 24px 80px 17px 20px;
`;

export const LessonInfoView = styled.View`
  flex-direction: row;
  padding-left: 24px;
`;

export const LessonInfo = styled.Text`
  color: #a0a0b2;
  font-family: 'Roboto-Regular';
  font-size: 12px;
  line-height: 14.06px;
  margin-right: 17px;
`;

export const Description = styled.Text`
  padding: 12px 24px;
  color: #6c6c80;
  font-family: 'Roboto-Regular';
  font-size: 15px;
  line-height: 25px;
`;

export const BottomButton = styled.View`
  width: 100%;
  height: 58px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 8px;
`;

export const ReturnText = styled.Text`
  color: #ff6680;
  font-family: 'Roboto-Regular';
  font-size: 15px;
  line-height: 17.58px;
  padding-top: 12px;
`;
