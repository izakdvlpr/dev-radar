import styled from "styled-components/native";

import MapView from "react-native-maps";

export const Map = styled(MapView)`
  flex: 1;
`;

export const Avatar = styled.Image`
  width: 54px;
  height: 54px;

  border-radius: 4px;
  border-width: 4px;
  border-color: #fff;
`;

export const CalloutContainer = styled.View`
  width: 260px;
`;

export const DevName = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const DevBio = styled.Text`
  margin-top: 5px;
  color: #666;
`;

export const DevTechs = styled.Text`
  margin-top: 5px;
`;

export const SearchForm = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;

  z-index: 5;

  flex-direction: row;
`;

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: "#999",
  autoCapitalize: "words",
  autoCorrect: false,
})`
  padding-horizontal: 20px;

  height: 50px;

  flex: 1;

  border-radius: 25px;

  font-size: 16px;

  color: #333;
  

  shadow-color: #000;
  shadow-offset: {
    width: 4;
    height: 4;
  };
  shadow-opacity: 0.2;
  elevation: 2;

  background-color: #FFF;
`;

export const SearchButton = styled.TouchableOpacity`
  margin-left: 15px;

  width: 50px;
  height: 50px;

  justify-content: center;
  align-items: center;

  border-radius: 25px;

  background-color: #8e4dff;
`;
