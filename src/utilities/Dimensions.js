import {
  StatusBar,
  Platform,
  Dimensions as DeviceDimensions,
} from "react-native";

const deviceHeight = DeviceDimensions.get("window").height;
const DEVICE_HEIGHT = Platform.select({
  ios: deviceHeight,
  android:
    StatusBar.currentHeight > 24
      ? deviceHeight
      : deviceHeight - StatusBar.currentHeight,
});
const SCREEN_WIDTH = DeviceDimensions.get("window").width;

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const Dimensions = {
  SCREEN_WIDTH: SCREEN_WIDTH,
  DEVICE_HEIGHT: DEVICE_HEIGHT,
  STATUSBAR_HEIGHT: STATUSBAR_HEIGHT,
};

export default Dimensions;
