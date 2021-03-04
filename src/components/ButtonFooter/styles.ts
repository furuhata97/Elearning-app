import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ColorProps {
  isClicked: boolean;
}

export const Container = styled.View`
  width: 100%;
  height: 73px;
  margin: 0;
  background: #fff;
  flex-direction: row;
`;

export const TabButtonContainer = styled.View<ColorProps>`
  flex: 1;
  padding: 0;
  margin: 0;
  border-radius: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top-color: transparent;
  border-top-width: 2px;

  ${(props) =>
    props.isClicked &&
    css`
      border-top-color: #ff6680;
    `}
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

export const TabText = styled.Text<ColorProps>`
  color: #c4c4d1;
  font-family: 'Roboto-Regular';
  font-size: 15px;
  margin-left: 12px;

  ${(props) =>
    props.isClicked &&
    css`
      color: #ff6680;
    `}
`;
