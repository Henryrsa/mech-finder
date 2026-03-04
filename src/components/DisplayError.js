import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import LottieView from "lottie-react-native";

import Layout from "./Layout";
import Header from "./Header";

import Dimensions from "../utilities/Dimensions";
import genericStyles from "../utilities/Styles";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

export default function DisplayError({ navigation, title, message, tryAgain }) {
  return (
    <Layout>
      <Header navigation={navigation} title={title} />
      <View style={styles.container}>
        <LottieView
          source={require("../assets/lottie-files/no-internet.json")}
          autoPlay
          style={{
            height: SCREEN_WIDTH * 0.6,
            width: SCREEN_WIDTH * 0.6,
          }}
        />
        <Text style={{ margin: 50 }}>{message}</Text>
        <TouchableOpacity style={genericStyles.buttonStyle} onPress={tryAgain}>
          <Text style={genericStyles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 40 },
});
