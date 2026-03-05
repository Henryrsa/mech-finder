import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../theme/colors";
import radii from "../theme/radii";
import shadows from "../theme/shadows";
import spacing from "../theme/spacing";
import typography from "../theme/typography";

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) {
  const isPrimary = variant === "primary";
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.content}>
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
        <Text style={[styles.text, !isPrimary && styles.textSecondary, textStyle]}>
          {title}
        </Text>
        {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    ...shadows.subtle,
  },
  primary: {
    backgroundColor: colors.amber,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.slate,
  },
  disabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginHorizontal: spacing.xs,
  },
  text: {
    color: colors.charcoal,
    fontFamily: typography.families.bodyBold,
    fontSize: typography.sizes.md,
    letterSpacing: 0.4,
  },
  textSecondary: {
    color: colors.snow,
  },
});
