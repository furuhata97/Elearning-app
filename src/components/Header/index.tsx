import React, { useState, useCallback } from 'react';
import { View, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import logo from '../../../assets/Logotipo.png';

import {
  Container,
  HeaderTop,
  PaddingHeader,
  SearchBox,
  TextInput,
} from './styles';

type HeaderProps = {
  dashboard?: boolean;
};

const Header: React.FC<HeaderProps> = ({ dashboard }) => {
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();

  const handleReturnButton = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleChangeInput = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return (
    <Container>
      {dashboard ? (
        <HeaderTop>
          <Image source={logo} />
          <Icon name="power" size={24} color="#FF6680" />
        </HeaderTop>
      ) : (
        <>
          <HeaderTop>
            <Pressable style={{ width: 26 }} onPress={handleReturnButton}>
              <Icon name="arrow-left" size={24} color="#ff6680" />
            </Pressable>

            <Image source={logo} />
            <Icon name="heart" size={24} color="#FF6680" />
          </HeaderTop>
          <PaddingHeader />
        </>
      )}

      {dashboard ? (
        <SearchBox>
          <Icon name="search" size={20} color="#C4C4D1" />
          <TextInput
            keyboardAppearance="dark"
            placeholderTextColor="#C4C4D1"
            placeholder="Busque uma aula"
            defaultValue=""
            onChangeText={(text) => handleChangeInput(text)}
          />
        </SearchBox>
      ) : null}
    </Container>
  );
};

export default Header;
