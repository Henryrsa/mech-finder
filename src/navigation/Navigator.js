import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UserContext } from "../context/UserContext";

import DrawerNavigation from "./DrawerNavigation";
import Home from "../screens/home/Home";
import SignInWithPhoneNumber from "../screens/authentication/SignInWithPhoneNumber";
import Otp from "../screens/authentication/Otp";
import Loading from "../screens/authentication/Loading";
import SignUpForm from "../screens/authentication/SignUpForm";

const Stack = createNativeStackNavigator();

function Navigator() {
  const [isSignedIn, setIsSignedIn] = useContext(UserContext);

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Stack.Navigator
          initialRouteName="DrawerNavigation"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Loading" component={Loading} />

          <Stack.Screen
            name="SignInWithPhoneNumber"
            component={SignInWithPhoneNumber}
          />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="SignUpForm" component={SignUpForm} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Navigator;
