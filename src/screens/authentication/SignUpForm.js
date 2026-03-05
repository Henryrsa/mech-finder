import React, { useState, useContext } from "react";
import {
  Text,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  ScrollView,
  Vibration,
  Platform,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { Checkbox } from "react-native-paper";
import { ref, set } from "firebase/database";

import { UserContext } from "../../context/UserContext";
import { auth, database } from "../../utilities/Firebase";
 

import Layout from "../../components/Layout";
import Dimensions from "../../utilities/Dimensions";
import Button from "../../components/Button";
import Input from "../../components/Input";
import SectionHeader from "../../components/SectionHeader";
import Card from "../../components/Card";
import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";

const { SCREEN_WIDTH } = Dimensions;

export default function SignUpForm({ navigation }) {
  const [, setIsSignedIn] = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNames, onChangeFullName] = useState("");
  const [surname, onChangeSurname] = useState("");
  const [idOrPassportNumber, onChangeIdOrPassportNumber] = useState("");
  const [companyName, onChangeCompanyName] = useState("");
  const [checked, setChecked] = useState(false);

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

  const validateForm = () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      alertError("Invalid email", "Please enter a valid email address");
    } else if (password.length < 6) {
      alertError(
        "Invalid password",
        "Password must be at least 6 characters"
      );
    } else if (fullNames.length < 3) {
      alertError(
        "Invalid Name",
        "Please make sure you have filled your Names correctly"
      );
    } else if (surname.length < 3) {
      alertError(
        "Invalid Surname",
        "Please make sure you have filled your surname correctly"
      );
    } else if (idOrPassportNumber.length < 3) {
      alertError(
        "Invalid ID or Passport",
        "Please make sure you have filled your ID or Passport correctly"
      );
    } else if (companyName.length < 3) {
      alertError(
        "Invalid Company Name",
        "Please make sure you have filled the Company Name correctly"
      );
    } else if (!checked) {
      alertError(
        "Terms and Conditions",
        "You have to agree to terms and conditions in order for you to proceed"
      );
    } else {
      registerUser(trimmedEmail, password);
    }
  };

  const registerUser = async (trimmedEmail, typedPassword) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        typedPassword
      );
      const userId = userCredential.user.uid;
      await set(ref(database, `Users/${userId}/UserInfo`), {
        fullNames,
        surname,
        idOrPassportNumber,
        companyName,
        email: trimmedEmail,
      });
      setIsSignedIn(true);
    } catch (error) {
      alertError("Registration failed", error?.message || "Try again later");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Layout>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="always"
      >
        <Image
          source={require("../../assets/images/logo-primary.png")}
          style={styles.logo}
        />
        <SectionHeader
          title="Create Account"
          subtitle="Join the fastest way to get roadside help."
          style={styles.headerBlock}
        />

        <Card style={styles.card}>
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
            placeholder="At least 6 characters"
            secureTextEntry
            style={styles.fieldSpacing}
          />
          <Input
            label="Names"
            onChangeText={onChangeFullName}
            value={fullNames}
            placeholder="Full names"
            style={styles.fieldSpacing}
          />
          <Input
            label="Surname"
            onChangeText={onChangeSurname}
            value={surname}
            placeholder="Surname"
            style={styles.fieldSpacing}
          />
          <Input
            label="ID or Passport"
            onChangeText={onChangeIdOrPassportNumber}
            value={idOrPassportNumber}
            placeholder="ID or passport number"
            style={styles.fieldSpacing}
          />
          <Input
            label="Company Name"
            onChangeText={onChangeCompanyName}
            value={companyName}
            placeholder="Company name"
            style={styles.fieldSpacing}
          />

          <TouchableOpacity
            onPress={() => {
              setChecked(!checked);
            }}
            style={styles.termsRow}
          >
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              uncheckedColor={colors.mist}
              color={colors.amber}
            />
            <Text style={styles.termsText}>
              I agree to the terms and conditions
            </Text>
          </TouchableOpacity>
        </Card>

        {isLoading ? (
          <View style={styles.loadingButton}>
            <ActivityIndicator size="large" color={colors.charcoal} />
          </View>
        ) : (
          <Button
            title="Register"
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
          onPress={() => navigation.navigate("SignIn")}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
  },
  content: {
    alignItems: "center",
    paddingBottom: spacing.xl,
  },
  logo: {
    height: SCREEN_WIDTH * 0.24,
    width: SCREEN_WIDTH * 0.24,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: 22,
  },
  headerBlock: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  card: {
    width: "90%",
    padding: spacing.lg,
  },
  fieldSpacing: {
    marginTop: spacing.md,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
  },
  termsText: {
    color: colors.mist,
    fontFamily: typography.families.body,
    fontSize: typography.sizes.sm,
    flex: 1,
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
