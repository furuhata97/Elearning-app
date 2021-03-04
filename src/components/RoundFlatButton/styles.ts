import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  color: string;
  width?: number;
  height?: number;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 303px;
  height: 60px;
  border-radius: 100px;
  margin-top: 8px;
  background: ${(props) => props.color};

  justify-content: center;
  align-items: center;

  ${(props) =>
    props.width &&
    css`
      width: ${props.width}px;
    `}

  ${(props) =>
    props.height &&
    css`
      height: ${props.height}px;
    `}
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto-Regular';
  color: #fff;
  font-size: 15px;
`;
