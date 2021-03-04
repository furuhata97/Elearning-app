import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  color: string;
  width?: number;
  height?: number;
}

const RoundFlatButton: React.FC<ButtonProps> = ({
  children,
  color,
  ...rest
}) => {
  return (
    <Container {...rest} color={color}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default RoundFlatButton;
