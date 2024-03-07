import { StyleSheet } from "react-native";

import Dimensions from "./Dimensions";

const { STATUSBAR_HEIGHT, SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

const genericStyles = StyleSheet.create({
  iosStatusBarPainter: {
    flex: 1,
    backgroundColor: "#0000fe",
    paddingTop: Platform.OS == "ios" ? STATUSBAR_HEIGHT : null,
    alignItems: "center",
  },
  customSafeAreaView: {
    backgroundColor: "white",
    height:
      Platform.OS === "ios" ? DEVICE_HEIGHT - STATUSBAR_HEIGHT : DEVICE_HEIGHT,
    width: "100%",
    marginTop: Platform.OS === "ios" ? null : STATUSBAR_HEIGHT,
  },
  buttonStyle: {
    backgroundColor: "#0000fe",
    height: DEVICE_HEIGHT * 0.06,
    width: SCREEN_WIDTH * 0.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 5,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "grey",
    shadowOpacity: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default genericStyles;
