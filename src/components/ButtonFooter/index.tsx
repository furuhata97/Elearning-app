import React, { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useInfos } from '../../hooks/infos';

import { Container, TabButtonContainer, TabButton, TabText } from './styles';

const ButtonFooter: React.FC = () => {
  const {
    isClickedHome,
    isClickedSaved,
    handleClickSaved,
    handleClickHome,
  } = useInfos();

  return (
    <Container>
      <TabButtonContainer isClicked={isClickedHome}>
        <TabButton onPress={handleClickHome}>
          <Icon
            name="home"
            size={24}
            color={isClickedHome ? '#FF6680' : '#C4C4D1'}
          />
          <TabText isClicked={isClickedHome}>Home</TabText>
        </TabButton>
      </TabButtonContainer>
      <TabButtonContainer isClicked={isClickedSaved}>
        <TabButton onPress={handleClickSaved}>
          <Icon
            name="heart"
            size={24}
            color={isClickedSaved ? '#FF6680' : '#C4C4D1'}
          />
          <TabText isClicked={isClickedSaved}>Salvos</TabText>
        </TabButton>
      </TabButtonContainer>
    </Container>
  );
};

export default ButtonFooter;
