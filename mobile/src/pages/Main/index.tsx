import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Callout } from "react-native-maps";

import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

import api from "../../services/api";

import {
  Map,
  Avatar,
  CalloutContainer,
  DevName,
  DevBio,
  DevTechs,
  SearchForm,
  SearchInput,
  SearchButton,
} from "./styles";

interface ICurrentRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IDev {
  _id: string;
  techs: string[];
  github_username: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: {
    coordinates: number[];    
  }
}

const Main: React.FC = () => {
  const { navigate } = useNavigation();

  const [devs, setDevs] = useState<IDev[]>();
  const [currentRegion, setCurrentRegion] = useState<ICurrentRegion>();
  const [techs, setTechs] = useState('');

  async function loadInitialPosition() {
    const { granted } = await requestPermissionsAsync();

    if (granted) {
      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      const { latitude, longitude } = coords;

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
    }
  }
  
  async function loadDevs() {
    const { latitude, longitude } = currentRegion;
    
    const response = await api.get("/search", {
      params: {
        latitude,
        longitude,
        techs,
      },
    });        
      
    setDevs(response.data.devs);
  }
  
  function handleRegionChanged(region: ICurrentRegion) {    
    setCurrentRegion(region);
  }

  useEffect(() => {
    loadInitialPosition();
  }, []);  

  if (!currentRegion) {
    return null;
  }      

  return (
    <>
      <Map
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}        
      >
        {devs?.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[1],
              longitude: dev.location.coordinates[0]
            }}
          >
            <Avatar
              source={{
                uri: dev.avatar_url,
              }}
            />

            <Callout
              onPress={() => navigate("Profile", { github_username: dev.github_username })}
            >
              <CalloutContainer>
                <DevName>{dev.name}</DevName>
                <DevBio>{dev.bio}</DevBio>
                <DevTechs>{dev.techs.join(', ')}</DevTechs>
              </CalloutContainer>
            </Callout>
          </Marker>
        ))}
      </Map>

      <SearchForm>
        <SearchInput
          placeholder="Buscar devs por techs..."
          value={techs}
          onChangeText={text => setTechs(text)}
        />

        <SearchButton onPress={loadDevs}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </SearchButton>
      </SearchForm>
    </>
  );
};

export default Main;
