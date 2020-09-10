import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainPage from "../pages/Main";
import ProfilePage from "../pages/Profile";

const { Navigator, Screen } = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Navigator
      screenOptions={{
        headerTintColor: "#FFF",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "#7D40E7",
        },
        headerTitleAlign: "center",
      }}
    >
      <Screen
        name="Home"
        component={MainPage}
        options={{ title: "DevRadar" }}
      />
      <Screen
        name="Profile"
        component={ProfilePage}
        options={{ title: "Perfil no Github" }}
      />
    </Navigator>
  </NavigationContainer>
);

export default Routes;
