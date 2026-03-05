import React, { useEffect } from "react";
import { ActivityIndicator, LogBox, View } from "react-native";
import { useFonts } from "expo-font";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import Navigator from "./src/navigation/Navigator";

import { UserProvider } from "./src/context/UserContext";
import colors from "./src/theme/colors";

function App() {
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    LogBox.ignoreLogs([
      "Setting a timer", //This is firebase realtime database error
      "AsyncStorage has been extracted", //This is firebase realtime database error
      "Non-serializable values were found in the navigation state", //Passing function as route.params such as refreshUserInformation() from CustomDrawer to MyAccount
      "Clipboard has been extracted", //This is @twotalltotems/react-native-otp-input error
    ]);
  }, []);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.charcoal,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.amber} />
      </View>
    );
  }
  return (
    <UserProvider>
      <Navigator />
    </UserProvider>
  );
}

export default App;
