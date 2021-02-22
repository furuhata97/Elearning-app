import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import elearningImage from '../../../assets/elearning.png';
import manImage from '../../../assets/manBoard.png';

import {
  Container,
  ButtonContainer,
  BackgroundImage,
  ManImage,
  Subtitle,
  Title,
} from './styles';
import RoundFlatButton from '../../components/RoundFlatButton';

const StartScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const navigateToDashboard = useCallback(() => {
    navigate('Dashboard');
  }, [navigate]);

  return (
    <Container>
      <BackgroundImage source={elearningImage} />
      <ManImage source={manImage} />
      <ButtonContainer>
        <Title>Aprenda da {'\n'}melhor forma</Title>
        <Subtitle>
          Entre na plataforma e {'\n'}acesse cursos de diversas áreas {'\n'}de
          conhecimento
        </Subtitle>
        <RoundFlatButton color="#FF6680" onPress={navigateToDashboard}>
          Começar os estudos
        </RoundFlatButton>
      </ButtonContainer>
    </Container>
  );
};

export default StartScreen;
