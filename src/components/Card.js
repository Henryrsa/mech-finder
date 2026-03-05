import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../theme/colors";
import radii from "../theme/radii";
import shadows from "../theme/shadows";

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.gunmetal,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.slate,
    padding: 16,
    ...shadows.soft,
  },
});
