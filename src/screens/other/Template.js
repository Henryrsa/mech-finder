import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import LoadingIndicator from "../../components/LoadingIndicator";

import Dimensions from "../../utilities/Dimensions";
import genericStyles from "../../utilities/Styles";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

export default function Template({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      <Header navigation={navigation} title="Template" />
      {isLoading ? (
        <LoadingIndicator title="Generating Worksheet..." />
      ) : (
        <>
          <TouchableOpacity
            style={[
              genericStyles.buttonStyle,
              {
                width: SCREEN_WIDTH * 0.7,
              },
            ]}
          >
            <Text style={styles.buttonText}>Generate Worksheet</Text>
          </TouchableOpacity>
        </>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
