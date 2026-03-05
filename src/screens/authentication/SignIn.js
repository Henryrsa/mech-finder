import React, { useContext, useState } from "react";
import {
  Text,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Vibration,
  Platform,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";

import Layout from "../../components/Layout";
import Dimensions from "../../utilities/Dimensions";
import Button from "../../components/Button";
import Input from "../../components/Input";
import SectionHeader from "../../components/SectionHeader";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../utilities/Firebase";
import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";
 

const { SCREEN_WIDTH } = Dimensions;

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
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logo-primary.png")}
          style={styles.logo}
        />
        <SectionHeader
          title="Welcome Back"
          subtitle="Sign in to get roadside help in minutes."
          style={styles.headerBlock}
        />

        <View style={styles.form}>
          <Input
            label="Email"
            onChangeText={setEmail}
            value={email}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            onChangeText={setPassword}
            value={password}
            placeholder="Enter your password"
            secureTextEntry
            style={styles.inputSpacing}
          />
        </View>

        {isLoading ? (
          <View style={styles.loadingButton}>
            <ActivityIndicator size="large" color={colors.charcoal} />
          </View>
        ) : (
          <Button
            title="Sign In"
            onPress={validateForm}
            style={styles.primaryButton}
          />
        )}

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <Button
          title="Continue with Google"
          variant="secondary"
          onPress={undefined}
          style={styles.secondaryButton}
          disabled
        />
        <Button
          title={
            Platform.OS === "web"
              ? "Phone sign-in (mobile only)"
              : "Continue with Phone"
          }
          variant="secondary"
          onPress={undefined}
          style={styles.secondaryButton}
          disabled
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("SignUpForm")}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Create a new account</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: spacing.lg,
  },
  logo: {
    height: SCREEN_WIDTH * 0.28,
    width: SCREEN_WIDTH * 0.28,
    marginBottom: spacing.md,
    borderRadius: 24,
  },
  headerBlock: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  form: {
    width: "88%",
  },
  inputSpacing: {
    marginTop: spacing.sm,
  },
  primaryButton: {
    marginTop: spacing.lg,
    width: SCREEN_WIDTH * 0.8,
  },
  secondaryButton: {
    marginTop: spacing.sm,
    width: SCREEN_WIDTH * 0.8,
  },
  loadingButton: {
    marginTop: spacing.lg,
    width: SCREEN_WIDTH * 0.8,
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.amber,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingButtonSecondary: {
    marginTop: spacing.sm,
    width: SCREEN_WIDTH * 0.8,
    height: 52,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.slate,
    alignItems: "center",
    justifyContent: "center",
  },
  dividerRow: {
    marginTop: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.slate,
  },
  dividerText: {
    color: colors.fog,
    fontFamily: typography.families.body,
    marginHorizontal: spacing.sm,
    fontSize: typography.sizes.sm,
  },
  linkButton: {
    marginTop: spacing.md,
  },
  linkText: {
    color: colors.amberGlow,
    fontFamily: typography.families.bodySemiBold,
  },
});
