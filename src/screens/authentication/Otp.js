import React, { useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Vibration,
} from "react-native";

import OTPInputView from "@twotalltotems/react-native-otp-input";
import LottieView from "lottie-react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import { getApp } from "firebase/app";

import { UserContext } from "../../context/UserContext";

import Layout from "../../components/Layout";
import Dimensions from "../../utilities/Dimensions";
import genericStyles from "../../utilities/Styles";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

// Firebase references
const app = getApp();
const auth = getAuth();

const Otp = ({ route, navigation }) => {
  const { cleanedPhoneNumber, verificationId } = route.params;

  const [isSignedIn, setIsSignedIn] = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [providedVerificationId, setProvidedVerificationId] =
    useState(verificationId);

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

  const checkVerificationCode = (code) => {
    if (code.length < 6) {
      alertError(
        "Incomplete OTP",
        "Enter all 6 digits verification code sent to you"
      );
      return;
    }

    verifyCode(code);
  };

  const checkUserStatus = () => {
    const userId = auth.currentUser.uid;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `Users/${userId}/UserInfo`))
      .then((snapshot) => {
        setIsLoading(false);

        if (snapshot.exists()) {
          //This is a returning user
          setIsSignedIn(true); //This will make the navigator to switch to home screen
        } else {
          //This is a new user
          navigation.navigate("SignUpForm", {
            phoneNumber: cleanedPhoneNumber,
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const verifyCode = async (code) => {
    setIsLoading(true);
    try {
      const credential = PhoneAuthProvider.credential(
        providedVerificationId,
        code
      );
      await signInWithCredential(auth, credential);
      checkUserStatus();
    } catch (err) {
      setIsLoading(false);
      if (err.message == "Firebase: Error (auth/invalid-verification-code).") {
        console.log(err.message);
        alertError(
          "Incorrect Code",
          "Please make sure you have entred the correct verification code sent to the phone number that you have provided"
        );
      } else if (err.message == "Firebase: Error (auth/code-expired).") {
        console.log(err.message);
        alertError(
          "Code Expired",
          "You have taken too long to verify your phone number, request the code to be sent to you again"
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

  const resendCode = async () => {
    setIsLoading(true);
    setVerificationCode("");

    const firstNumber = cleanedPhoneNumber.toString().charAt(0);
    let phoneNumber = cleanedPhoneNumber.toString();
    if (firstNumber == 0) {
      phoneNumber = "+27" + phoneNumber.slice(1);
    }

    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setProvidedVerificationId(verificationId);
      setIsLoading(false);

      Alert.alert(
        `✔ Success`,
        `We have resent an SMS with the verification code to ${phoneNumber}`,
        [
          {
            text: "Okay",
            // onPress: () => console.log('Cancel Pressed'),
            style: "cancel",
          },
        ]
      );
    } catch (err) {
      setIsLoading(false);

      console.log(err);

      if (err.message == "Firebase: Error (auth/too-many-requests).") {
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

  //Used to add bold within a text
  const B = (props) => (
    <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
  );

  return (
    <Layout>
      <ScrollView
        style={{ flex: 1, height: "100%", width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <LottieView
          source={require("../../assets/lottie-files/otp-message-sent.json")}
          autoPlay
          style={{
            height: SCREEN_WIDTH * 0.4,
            width: SCREEN_WIDTH * 0.4,
          }}
          loop={false}
        />
        <Text style={styles.headerText}>Verification Code</Text>
        <Text style={styles.subHeaderText}>
          Please enter the OTP sent to <B>{cleanedPhoneNumber} </B>
        </Text>
        <OTPInputView
          style={{ width: "80%", height: DEVICE_HEIGHT * 0.1 }}
          pinCount={6}
          autoFocusOnLoad
          //codeInputFieldStyle={styles.underlineStyleBase}
         // codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => verifyCode(code)}
          onCodeChanged={(code) => setVerificationCode(code)}
          code={verificationCode}
          editable={true}
          codeInputHighlightStyle={{
            borderColor: "blue",
            borderWidth: 1,
            color: "blue",
          }}
          codeInputFieldStyle={{
            // borderColor: "grey",
            // borderWidth: 1,
            color: "black",
            backgroundColor: "#e0e0e0",
            borderRadius: 7,
          }}
        />
        {isLoading ? (
          <View
            style={[
              genericStyles.buttonStyle,
              {
                marginVertical: 2,
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
                marginVertical: 2,
                width: SCREEN_WIDTH * 0.7,
              },
            ]}
            onPress={() => checkVerificationCode(verificationCode)}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        )}
        <View style={styles.buttonHolder}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.textButton}
          >
            <FontAwesome name="edit" size={15} color="#0000fe" />
            <Text style={styles.textButtonText}>Edit Phone Number</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resendCode} style={styles.textButton}>
            <Feather name="send" size={15} color="#0000fe" />
            <Text style={styles.textButtonText}>Resend the code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        attemptInvisibleVerification
        androidHardwareAccelerationDisabled
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    // backgroundColor: "grey",
    height: DEVICE_HEIGHT * 0.07,
    width: "98%",
    flexDirection: "row",
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  otpBox: {
    // flex: 1,
    // borderColor: "blue",
    // borderWidth: 1,
    backgroundColor: "grey",

    height: DEVICE_HEIGHT * 0.06,
    width: DEVICE_HEIGHT * 0.06,
    marginHorizontal: 3,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "black",
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  headerText: {
    color: "#0000fe",
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 5,
  },
  subHeaderText: {
    marginHorizontal: 60,
    marginBottom: 2,
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },

  buttonHolder: {
    // backgroundColor: "red",
    height: DEVICE_HEIGHT * 0.05,
    width: "90%",
    marginTop: 10,
    // marginHorizontal: 60,
  },
  textButton: {
    // backgroundColor: "green",
    height: "100%",
    width: "80%",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
  },
  textButtonText: {
    color: "#0000fe",
    fontWeight: "400",
    fontSize: 15,
    marginLeft: 5,
  },
});

export default Otp;
