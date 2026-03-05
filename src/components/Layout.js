import * as React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import genericStyles from "../utilities/Styles";
import colors from "../theme/colors";
import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;
const GRID_SPACING = 40;
const verticalLines = Math.ceil(SCREEN_WIDTH / GRID_SPACING);
const horizontalLines = Math.ceil(DEVICE_HEIGHT / GRID_SPACING);

export default function Layout(props) {
  return (
    <View style={genericStyles.iosStatusBarPainter}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[colors.charcoal, colors.gunmetal]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[genericStyles.customSafeAreaView, { alignItems: "center" }]}
      >
        <View pointerEvents="none" style={styles.gridOverlay}>
          {Array.from({ length: verticalLines }).map((_, index) => (
            <View
              key={`v-${index}`}
              style={[
                styles.gridLine,
                {
                  left: index * GRID_SPACING,
                  height: "100%",
                  width: 1,
                },
              ]}
            />
          ))}
          {Array.from({ length: horizontalLines }).map((_, index) => (
            <View
              key={`h-${index}`}
              style={[
                styles.gridLine,
                {
                  top: index * GRID_SPACING,
                  width: "100%",
                  height: 1,
                },
              ]}
            />
          ))}
        </View>
        {props.children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.06,
  },
  gridLine: {
    position: "absolute",
    backgroundColor: colors.snow,
  },
});
