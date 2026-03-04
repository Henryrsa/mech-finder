import React, { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, View, Image } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import LottieView from "lottie-react-native";

import { UserContext } from "../../context/UserContext";

import Dimensions from "../../utilities/Dimensions";
import { auth } from "../../utilities/Firebase";
const { STATUSBAR_HEIGHT, SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

export default function Loading({ navigation }) {
  const [isSignedIn, setIsSignedIn] = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
        setTimeout(() => {
          navigation.replace("SignIn");
        }, 2000);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoHolder}>
        <Image
          source={require("../../assets/images/LogoOriginal.jpeg")}
          style={styles.logoImage}
        />
        <LottieView
          source={require("../../assets/lottie-files/loading.json")}
          autoPlay
          style={{
            height: SCREEN_WIDTH * 0.4,
            width: SCREEN_WIDTH * 0.4,
          }}
          loop
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: STATUSBAR_HEIGHT,
    alignItems: "center",
  },
  logoHolder: {
    height: DEVICE_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    height: SCREEN_WIDTH * 0.7,
    width: SCREEN_WIDTH * 0.7,
    marginBottom: 100,
  },
});
