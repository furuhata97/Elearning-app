import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 24px 24px 6px 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  width: 100%;

  flex-direction: column;
`;

export const HeaderTop = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PaddingHeader = styled.View`
  width: 100%;
  margin: 0 0 36px 0;
  padding: 0;
`;

export const SearchBox = styled.View`
  width: 100%;
  height: 56px;
  flex-direction: row;
  align-items: center;
  margin: 36px 0;
  border-radius: 100px;
  background: #ffffff;
  padding: 0 26px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #666360;
  font-size: 15px;
  font-family: 'Roboto-Regular';
`;
