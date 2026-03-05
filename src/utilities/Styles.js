import { Platform, StyleSheet } from "react-native";

import Dimensions from "./Dimensions";
import colors from "../theme/colors";
import radii from "../theme/radii";
import shadows from "../theme/shadows";
import typography from "../theme/typography";

const { STATUSBAR_HEIGHT, SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

const genericStyles = StyleSheet.create({
  iosStatusBarPainter: {
    flex: 1,
    backgroundColor: colors.charcoal,
    paddingTop: Platform.OS == "ios" ? STATUSBAR_HEIGHT : null,
    alignItems: "center",
  },
  customSafeAreaView: {
    backgroundColor: colors.charcoal,
    height:
      Platform.OS === "ios" ? DEVICE_HEIGHT - STATUSBAR_HEIGHT : DEVICE_HEIGHT,
    width: "100%",
    marginTop: Platform.OS === "ios" ? null : STATUSBAR_HEIGHT,
  },
  buttonStyle: {
    backgroundColor: colors.amber,
    height: DEVICE_HEIGHT * 0.06,
    width: SCREEN_WIDTH * 0.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radii.md,
    ...shadows.subtle,
  },
  buttonText: {
    color: colors.charcoal,
    fontFamily: typography.families.bodyBold,
    fontSize: typography.sizes.lg,
  },
});

export default genericStyles;
