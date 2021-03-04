import React from 'react';

import { Container, BodyContainer } from './styles';

const RoundedBody: React.FC = ({ children }) => {
  return (
    <Container>
      <BodyContainer>{children}</BodyContainer>
    </Container>
  );
};

export default RoundedBody;
