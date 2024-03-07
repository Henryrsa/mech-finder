import React from "react";
import { Text, StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";

import Dimensions from "../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

export default function LoadingIndicator({ title }) {
  return (
    <View style={styles.loadingContainer}>
      <LottieView
        source={require("../assets/lottie-files/loading.json")}
        autoPlay
        style={{
          height: SCREEN_WIDTH * 0.6,
          width: SCREEN_WIDTH * 0.6,
          marginTop: 30,
        }}
      />
      <Text style={{ marginTop: 40 }}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, alignItems: "center" },
});
