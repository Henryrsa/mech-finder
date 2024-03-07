import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";

import Layout from "../../components/Layout";
import Header from "../../components/Header";
import LoadingIndicator from "../../components/LoadingIndicator";
import DisplayError from "../../components/DisplayError";
import Empty from "../../components/Empty";

import Dimensions from "../../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

const auth = getAuth();

export default function History({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userHistoryArray, setUserHistoryArray] = useState([]);
  const [userId, setUserId] = useState("");

  const fetchUserHistory = () => {
    const userId = auth.currentUser.uid;
    setUserId(userId);

    const dbRef = ref(getDatabase());
    get(child(dbRef, `Users/${userId}/HistoryDates`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userHistories = Object.values(snapshot.val()); //Convert object of objects into array of objects
          setUserHistoryArray(
            userHistories.sort((a, b) => (a.key < b.key ? 1 : -1))
          );
        }

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log("error", error);

        if (error.message == "Error: Client is offline.") {
          setErrorMessage(
            "It appears you are offline, please check your internet connection and try again"
          );
        } else {
          setErrorMessage(`${error.message}`);
        }
      });
  };

  useEffect(() => {
    fetchUserHistory();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Regions", {
          depotName: "N/A",
          action: { key: item.key, userId },
        })
      }
      style={styles.itemContainer}
    >
      <Text style={styles.dateText}>{item.date}</Text>
    </TouchableOpacity>
  );

  if (errorMessage) {
    return (
      <DisplayError
        navigation={navigation}
        title={`My History`}
        message={errorMessage}
        tryAgain={() => {
          setIsLoading(true);
          setErrorMessage(null);
          fetchUserHistory();
        }}
      />
    );
  }

  if (!userHistoryArray.length && !isLoading) {
    return (
      <Empty
        navigation={navigation}
        title={`My History`}
        message={`There is no record of you cleaning any toilet before`}
      />
    );
  }

  return (
    <Layout>
      <Header navigation={navigation} title={`My History`} />
      {isLoading ? (
        <LoadingIndicator title={`Fetching My History...`} />
      ) : (
        <View style={styles.container}>
          <FlatList data={userHistoryArray} renderItem={renderItem} />
        </View>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH,
  },
  itemContainer: {
    backgroundColor: "white",
    height: DEVICE_HEIGHT * 0.07,
    width: SCREEN_WIDTH * 0.95,
    // alignSelf: "center",
    marginVertical: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    elevation: 5,
    shadowOffset: { width: 0.2, height: 0.2 },
    shadowColor: "grey",
    shadowOpacity: 0.2,
  },
  dateText: {
    color: "#0000fe",
    fontWeight: "bold",
    // fontSize: 20,
  },
});
