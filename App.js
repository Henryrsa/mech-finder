import React, { useEffect } from "react";
import { LogBox } from "react-native";
import Navigator from "./src/navigation/Navigator";

import { UserProvider } from "./src/context/UserContext";

function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      "Setting a timer", //This is firebase realtime database error
      "AsyncStorage has been extracted", //This is firebase realtime database error
      "Non-serializable values were found in the navigation state", //Passing function as route.params such as refreshUserInformation() from CustomDrawer to MyAccount
      "Clipboard has been extracted", //This is @twotalltotems/react-native-otp-input error
    ]);
  }, []);
  return (
    <UserProvider>
      <Navigator />
    </UserProvider>
  );
}

export default App;
