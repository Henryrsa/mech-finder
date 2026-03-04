import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Layout from "../../components/Layout";
import Dimensions from "../../utilities/Dimensions";
import genericStyles from "../../utilities/Styles";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

export default function Home({ navigation }) {
  return (
    <Layout>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuIconHolder}
        >
          <Ionicons name="menu" size={30} color="#0000fe" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/images/LogoOriginal.jpeg")}
          style={{
            height: DEVICE_HEIGHT * 0.06,
            width: DEVICE_HEIGHT * 0.06,
            marginVertical: 10,
          }}
        />
      </View>

      <Text style={styles.buttonText}>HOME SCREEN</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 250,
  },
  headerContainer: {
    // backgroundColor: "red",
    height: DEVICE_HEIGHT * 0.1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  menuIconHolder: {
    // backgroundColor: "red",
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    position: "absolute",
  },
});
