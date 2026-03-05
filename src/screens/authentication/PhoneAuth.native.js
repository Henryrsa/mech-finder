import React, { useRef, useState, useContext } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import Layout from "../../components/Layout";
import SectionHeader from "../../components/SectionHeader";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";
import { auth, firebaseConfig } from "../../utilities/Firebase";
import createUserProfileIfMissing from "../../utilities/UserProfile";
import { UserContext } from "../../context/UserContext";

export default function PhoneAuth({ navigation }) {
  const [, setIsSignedIn] = useContext(UserContext);
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const safeFirebaseConfig = firebaseConfig || {};
  const isConfigReady = Boolean(
    safeFirebaseConfig.apiKey &&
      safeFirebaseConfig.authDomain &&
      safeFirebaseConfig.projectId &&
      safeFirebaseConfig.appId
  );

  const alertError = (title, message) => {
    Alert.alert(`⚠ ${title}`, message, [{ text: "Okay", style: "cancel" }]);
  };

  const handleSendCode = async () => {
    if (!isConfigReady) {
      alertError(
        "Phone sign-in",
        "Firebase config is missing. Check EXPO_PUBLIC_FIREBASE_* env vars."
      );
      return;
    }
    if (!phoneNumber) {
      alertError("Phone number", "Enter a valid phone number");
      return;
    }
    if (Platform.OS === "web") {
      alertError("Phone sign-in", "Phone sign-in is only supported on mobile.");
      return;
    }

    try {
      setIsSending(true);
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(confirmation.verificationId);
    } catch (err) {
      alertError("Verification failed", err?.message || "Try again later");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationId || !verificationCode) {
      alertError("Verification code", "Enter the code you received");
      return;
    }

    try {
      setIsVerifying(true);
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const result = await signInWithCredential(auth, credential);
      await createUserProfileIfMissing(result.user, {
        phoneNumber,
      });
      setIsSignedIn(true);
      navigation.goBack();
    } catch (err) {
      alertError("Verification failed", err?.message || "Try again later");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Layout>
      {isConfigReady ? (
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={safeFirebaseConfig}
        />
      ) : null}
      <View style={styles.container}>
        <SectionHeader
          title="Phone Sign-In"
          subtitle="Use your mobile number to get started."
          style={styles.header}
        />

        <Card style={styles.card}>
          <Input
            label="Phone number"
            placeholder="+27 82 123 4567"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <View style={styles.buttonRow}>
            {isSending ? (
              <View style={styles.loadingButton}>
                <ActivityIndicator size="small" color={colors.charcoal} />
              </View>
            ) : (
              <Button
                title="Send Code"
                onPress={handleSendCode}
                style={styles.primaryButton}
                disabled={!isConfigReady}
              />
            )}
          </View>

          <Input
            label="Verification code"
            placeholder="123456"
            keyboardType="number-pad"
            value={verificationCode}
            onChangeText={setVerificationCode}
            style={styles.codeField}
          />
          <View style={styles.buttonRow}>
            {isVerifying ? (
              <View style={styles.loadingButton}>
                <ActivityIndicator size="small" color={colors.charcoal} />
              </View>
            ) : (
              <Button
                title="Verify & Continue"
                onPress={handleVerifyCode}
                style={styles.primaryButton}
                disabled={!isConfigReady}
              />
            )}
          </View>
          {!isConfigReady ? (
            <Text style={styles.webNote}>
              Missing Firebase env config. Add EXPO_PUBLIC_FIREBASE_* values and
              restart Expo.
            </Text>
          ) : null}
        </Card>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: spacing.lg,
  },
  header: {
    marginTop: spacing.lg,
  },
  card: {
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  buttonRow: {
    marginTop: spacing.md,
  },
  primaryButton: {
    width: "100%",
  },
  loadingButton: {
    width: "100%",
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.amber,
    alignItems: "center",
    justifyContent: "center",
  },
  codeField: {
    marginTop: spacing.lg,
  },
  webNote: {
    marginTop: spacing.md,
    color: colors.fog,
    fontFamily: typography.families.body,
    fontSize: typography.sizes.sm,
  },
});
