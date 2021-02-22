import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../../assets/Logotipo.png';

import {
  Container,
  Header,
  HeaderTop,
  SearchBox,
  TextInput,
  CoursesContainer,
  CoursesHeader,
  CoursesTitle,
  CoursesCount,
  CourseList,
  SingleCourseContainer,
  TabContainer,
  TabButton,
  TabText,
  TabButtonContainer,
} from './styles';
import api from '../../services/api';

export interface Course {
  id: string;
  name: string;
  image: string;
}

const Dashboard: React.FC = () => {
  const { navigate } = useNavigation();
  const [inputValue, setInputValue] = useState('');
  const [courses, setCourses] = useState('');

  useEffect(() => {
    api.get('courses').then((response) => {
      setCourses(response.data);
    });
  }, []);

  const navigateToDashboard = useCallback(() => {
    navigate('Dashboard');
  }, [navigate]);

  const handleChangeInput = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTop>
          <Image source={logo} />
          <Icon name="power" size={24} color="#FF6680" />
        </HeaderTop>
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
      </Header>
      <Container>
        <CoursesContainer>
          <CoursesHeader>
            <CoursesTitle>Categorias</CoursesTitle>
            <CoursesCount>43 cursos</CoursesCount>
          </CoursesHeader>
          <CourseList
            data={courses}
            numColumns={2}
            keyExtractor={(course) => course.id}
            renderItem={({ item: provider }) => (
              <SingleCourseContainer>
                <CoursesTitle>Teste</CoursesTitle>
              </SingleCourseContainer>
            )}
          />
        </CoursesContainer>
      </Container>

      <TabContainer>
        <TabButtonContainer>
          <TabButton>
            <Icon name="home" size={24} color="#FF6680" />
            <TabText>Home</TabText>
          </TabButton>
        </TabButtonContainer>
        <TabButtonContainer>
          <TabButton>
            <Icon name="heart" size={24} color="#FF6680" />
            <TabText>Salvos</TabText>
          </TabButton>
        </TabButtonContainer>
      </TabContainer>
    </Container>
  );
};

export default Dashboard;
