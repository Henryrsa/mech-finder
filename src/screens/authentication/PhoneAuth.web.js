import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../../components/Layout";
import SectionHeader from "../../components/SectionHeader";
import Card from "../../components/Card";
import colors from "../../theme/colors";
import spacing from "../../theme/spacing";
import typography from "../../theme/typography";

export default function PhoneAuth() {
  return (
    <Layout>
      <View style={styles.container}>
        <SectionHeader
          title="Phone Sign-In"
          subtitle="Phone sign-in is available on mobile devices only."
          style={styles.header}
        />
        <Card style={styles.card}>
          <Text style={styles.note}>
            This feature requires native device capabilities that are not
            available on web. Please use email/password for now.
          </Text>
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
  note: {
    color: colors.mist,
    fontFamily: typography.families.body,
    fontSize: typography.sizes.sm,
  },
});
