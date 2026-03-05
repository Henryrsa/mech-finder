import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../theme/colors";
import spacing from "../theme/spacing";
import typography from "../theme/typography";

export default function SectionHeader({ title, subtitle, style }) {
  return (
    <View style={style}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.snow,
    fontFamily: typography.families.heading,
    fontSize: typography.sizes.xl,
    letterSpacing: 1.2,
  },
  subtitle: {
    color: colors.mist,
    fontFamily: typography.families.body,
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
  },
});
