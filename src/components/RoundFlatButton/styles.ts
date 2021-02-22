import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  color: string;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 303px;
  height: 60px;
  border-radius: 100px;
  margin-top: 8px;
  background: ${(props) => props.color};

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'Roboto-Regular';
  color: #fff;
  font-size: 15px;
`;
