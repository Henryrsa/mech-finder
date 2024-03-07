import React, { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, View, StatusBar, Image } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApp } from "firebase/app";
import LottieView from "lottie-react-native";

import { UserContext } from "../../context/UserContext";

import Dimensions from "../../utilities/Dimensions";
const { STATUSBAR_HEIGHT, SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

// Initialize Firebase JS SDK >=9.x.x
// https://firebase.google.com/docs/web/setup
const firebaseConfig = {
  apiKey: "AIzaSyDIGIBAubTFVPojBG-ilU3EfOa9GysEo-A",
  authDomain: "mech-finder-22.firebaseapp.com",
  projectId: "mech-finder-22",
  storageBucket: "mech-finder-22.appspot.com",
  messagingSenderId: "869378297964",
  appId: "1:869378297964:web:5d77050977ab06d63f8849",
  measurementId: "G-Y6FX70HNEH",
};

try {
  initializeApp(firebaseConfig);
} catch (err) {
  // ignore app already initialized error in snack
  alert(err);
  console.log(err);
}

export default function Loading({ navigation }) {
  const [isSignedIn, setIsSignedIn] = useContext(UserContext);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const uid = user.uid;
        setIsSignedIn(true);
      } else {
        // User is signed out
        setIsSignedIn(false);
        setTimeout(() => {
          navigation.replace("SignInWithPhoneNumber");
        }, 2000);
      }
    });

    return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting.
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar translucent backgroundColor="#7b0715" /> */}

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
          loop={true}
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
  loadingGif: {
    height: SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 0.3,
  },
});
