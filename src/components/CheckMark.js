import React from "react";
import { StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";

import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

export default function CheckMark() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/lottie-files/rolling-check-mark.json")}
        autoPlay
        style={{
          height: SCREEN_WIDTH * 0.6,
          width: SCREEN_WIDTH * 0.6,
        }}
        loop={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
