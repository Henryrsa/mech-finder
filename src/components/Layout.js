import * as React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";

import genericStyles from "../utilities/Styles";

export default function Layout(props) {
  return (
    <View style={genericStyles.iosStatusBarPainter}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("../assets/images/BackGroundPhoto.png")}
        style={[genericStyles.customSafeAreaView, { alignItems: "center" }]}
      >
        {props.children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  pageName: {
    color: "grey",
    fontStyle: "italic",
    marginLeft: 5,
  },
});
