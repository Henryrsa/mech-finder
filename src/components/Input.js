import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import colors from "../theme/colors";
import radii from "../theme/radii";
import spacing from "../theme/spacing";
import typography from "../theme/typography";

export default function Input({
  label,
  error,
  style,
  inputStyle,
  ...props
}) {
  return (
    <View style={style}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <TextInput
          placeholderTextColor={colors.fog}
          style={[styles.input, inputStyle]}
          {...props}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.mist,
    fontFamily: typography.families.bodyMedium,
    fontSize: typography.sizes.sm,
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    backgroundColor: colors.gunmetal,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.slate,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    color: colors.snow,
    fontFamily: typography.families.body,
    fontSize: typography.sizes.md,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontFamily: typography.families.body,
    fontSize: typography.sizes.xs,
    marginTop: spacing.xs,
  },
});
