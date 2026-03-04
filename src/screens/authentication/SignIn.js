import React, { useContext, useState } from "react";
import {
  Text,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  TextInput,
  Vibration,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";

import Layout from "../../components/Layout";
import Dimensions from "../../utilities/Dimensions";
import genericStyles from "../../utilities/Styles";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../utilities/Firebase";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

export default function SignIn({ navigation }) {
  const [, setIsSignedIn] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const alertError = (title, message) => {
    Vibration.vibrate(500);
    Alert.alert(`⚠ ${title}`, message, [
      {
        text: "Okay",
        style: "cancel",
      },
    ]);
  };

  const validateForm = () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      alertError("Invalid email", "Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      alertError(
        "Invalid password",
        "Password must be at least 6 characters"
      );
      return;
    }

    signIn(trimmedEmail, password);
  };

  const signIn = async (trimmedEmail, typedPassword) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, trimmedEmail, typedPassword);
      setIsSignedIn(true);
    } catch (err) {
      const errorMessage = err?.message || "Unable to sign in";
      alertError("Sign in failed", errorMessage);
    } finally {
      setIsLoading(false);
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
      <Text style={styles.headerText}>Sign In</Text>
      <Text style={styles.subHeaderText}>
        Use your email and password to continue
      </Text>

      <View style={styles.inputFieldHolder}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputFieldHolder}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
      </View>

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
          onPress={validateForm}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("SignUpForm")}
        style={styles.linkButton}
      >
        <Text style={styles.linkText}>Create a new account</Text>
      </TouchableOpacity>
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
  inputFieldHolder: {
    height: DEVICE_HEIGHT * 0.05,
    width: "90%",
    borderBottomColor: "#0000fe",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  inputStyle: {
    flex: 1,
    color: "black",
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: "#0000fe",
    fontWeight: "bold",
  },
});
