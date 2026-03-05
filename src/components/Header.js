import React from "react";
import {
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Dimensions from "../utilities/Dimensions";
import colors from "../theme/colors";
import typography from "../theme/typography";
import shadows from "../theme/shadows";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

export default function Header({ navigation, title }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIconHolder}
      >
        {Platform.OS === "android" ? (
          <Ionicons name="arrow-back-outline" size={30} color={colors.amber} />
        ) : (
          <Ionicons name="chevron-back" size={30} color={colors.amber} />
        )}
      </TouchableOpacity>
      <Text style={styles.headerText} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.gunmetal,
    height: DEVICE_HEIGHT * 0.07,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.slate,
    ...shadows.subtle,
  },

  backIconHolder: {
    // backgroundColor: "red",
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    position: "absolute",
  },
  headerText: {
    color: colors.snow,
    fontFamily: typography.families.bodySemiBold,
    fontSize: 18,
  },
});
