import styled, { css } from 'styled-components/native';

interface PlayCardProps {
  completed?: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const CourseInfo = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const CourseTitle = styled.Text`
  color: #3d3d4c;
  font-family: 'Rubik-Regular';
  font-size: 30px;
  line-height: 35.55px;
`;

export const ClassCount = styled.Text`
  color: #a0a0b2;
  font-family: 'Roboto-Regular';
  font-size: 15px;
  line-height: 17.58px;
`;

export const LessonView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

export const LessonCard = styled.View`
  width: 290px;
  height: 100px;
  border-radius: 16px;
  background: #fff;
  margin: 0 0 16px 0;
  padding: 16px 16px 14px 48px;
  flex-direction: column;
`;

export const PlayCard = styled.View<PlayCardProps>`
  position: absolute;
  width: 68px;
  height: 68px;
  border-radius: 16px;
  background: #ff6680;
  left: 4%;
  right: 79.14%;
  top: 16%;
  bottom: 16%;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.completed &&
    css`
      background: #61c5bd;
    `}
`;

export const LessonTitle = styled.Text`
  width: 133px;
  height: 40px;
  margin-bottom: 16px;
  color: #6c6c80;
  font-family: 'Rubik-Regular';
  font-size: 15px;
  line-height: 20px;
`;

export const LessonInfoView = styled.View`
  flex-direction: row;
`;

export const LessonInfo = styled.Text`
  color: #c4c4d1;
  font-family: 'Roboto-Regular';
  font-size: 10px;
  line-height: 11.72px;
  margin-right: 17px;
`;

export const CompletedTag = styled.View`
  position: absolute;
  width: 63px;
  height: 16px;
  border-radius: 12px;
  background: #61c5bd;
  justify-content: center;
  align-items: center;
  left: 70%;
  padding: 0;
  margin: 0;
`;

export const CompletedText = styled.Text`
  color: #fff;
  font-family: 'Roboto-Regular';
  font-size: 10px;
  line-height: 10px;
`;
