import React, { useState, useRef } from "react";
import {
  Text,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Vibration,
} from "react-native";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { initializeApp, getApp } from "firebase/app";
import { getAuth, PhoneAuthProvider } from "firebase/auth";

import PhoneInput from "react-native-phone-number-input";

import Layout from "../../components/Layout";
import Dimensions from "../../utilities/Dimensions";
import genericStyles from "../../utilities/Styles";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

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
}

// Firebase references
const app = getApp();
const auth = getAuth();
export default function SignInWithPhoneNumber({ navigation }) {
  // Ref or state management hooks
  const [phoneNumber, setPhoneNumber] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const phoneInput = useRef(null);
  const recaptchaVerifier = useRef(null);

  const alertError = (title, message) => {
    Vibration.vibrate(500);
    Alert.alert(`⚠ ${title}`, message, [
      {
        text: "Okay",
        // onPress: () => console.log('Cancel Pressed'),
        style: "cancel",
      },
    ]);
  };

  const checkPhoneNumber = () => {
    if (phoneNumber == "") {
      alertError("Phone number field is blank", "Fill in your phone number");
      return;
    }

    //Variable phoneNumber starts with a country code such as +27

    const firstNumber = phoneNumber.charAt(3);
    const alertInvalidPhoneNumberLength = () =>
      alertError(
        "Invalid phone number!",
        "The length of your phone number is not correct "
      );

    if (firstNumber == 0) {
      if (phoneNumber.length !== 13) {
        alertInvalidPhoneNumberLength();
        return;
      }
    } else {
      if (phoneNumber.length !== 12) {
        alertInvalidPhoneNumberLength();
        return;
      }
    }

    sendCode();
  };

  const sendCode = async () => {
    setIsLoading(true);
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setIsLoading(false);

      const firstNumber = phoneNumber.toString().charAt(3);
      let cleanedPhoneNumber = phoneNumber.toString();
      if (firstNumber == 0) {
        cleanedPhoneNumber = 0 + cleanedPhoneNumber.slice(4);
      }
      navigation.navigate("Otp", {
        cleanedPhoneNumber,
        verificationId,
      });
    } catch (err) {
      setIsLoading(false);

      console.log(err);

      if (
        err.message ==
          "Firebase: Invalid format. (auth/invalid-phone-number)." ||
        err.message == "Firebase: Error (auth/invalid-phone-number)."
      ) {
        alertError(
          "Invalid phone number",
          "Please verify that your phone number is correct"
        );
      } else if (
        err.message == "Firebase: TOO_SHORT (auth/invalid-phone-number)."
      ) {
        alertError(
          "Incomplete number",
          "Please verify that your phone number is correct, it appears to be too short"
        );
      } else if (err.message == "Firebase: Error (auth/too-many-requests).") {
        alertError(
          "Well, that's a lot of requests 🤔",
          "For security reasons, we can not send any more verification codes to this number, try again later"
        );
      } else {
        let errorMessage = err.message;

        if (errorMessage.slice(0, 22) == "Firebase: Error (auth/") {
          let errorMessageLength = errorMessage.length;
          let lastChar = errorMessageLength - 2;
          const readableErrMessage = errorMessage
            .slice(22, lastChar)
            .replace(/-/g, " ");

          alertError("Oops, Something went wrong!", readableErrMessage);
        } else {
          alertError("Oops, Something went wrong!", err.message);
        }
      }
    }
  };

  return (
    <Layout>
      <Image
        source={require("../../assets/images/LogoOriginal.jpeg")}
        style={{
          height: SCREEN_WIDTH * 0.4,
          width: SCREEN_WIDTH * 0.4,
          marginVertical: 10,
        }}
      />
      <Text style={styles.headerText}>Verify Your Phone Number</Text>
      <Text style={styles.subHeaderText}>
        Please enter your country code and phone number
      </Text>
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="ZA"
        layout="first"
        onChangeText={(text) => {
          setValue(text);
        }}
        onChangeFormattedText={(text) => {
          setPhoneNumber(text);
        }}
        countryPickerProps={{ withAlphaFilter: true }}
        withShadow
        // autoFocus
      />

      {isLoading ? (
        <View
          style={[
            genericStyles.buttonStyle,
            {
              marginVertical: 15,
              width: SCREEN_WIDTH * 0.7,
            },
          ]}
        >
          <ActivityIndicator size={"large"} color="white" />
        </View>
      ) : (
        <TouchableOpacity
          style={[
            genericStyles.buttonStyle,
            {
              marginVertical: 15,
              width: SCREEN_WIDTH * 0.7,
            },
          ]}
          onPress={checkPhoneNumber}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      )}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification
        androidHardwareAccelerationDisabled
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 5,
  },
  subHeaderText: {
    marginHorizontal: 60,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
