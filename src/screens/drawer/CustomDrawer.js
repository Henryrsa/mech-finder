import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
  Vibration,
  Alert,
} from "react-native";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, child, get, update } from "firebase/database";

import { UserContext } from "../../context/UserContext";

import Layout from "../../components/Layout";
import Dimensions from "../../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT, STATUSBAR_HEIGHT } = Dimensions;

const auth = getAuth();

export default function CustomDrawer({ navigation }) {
  const [isSignedIn, setIsSignedIn] = useContext(UserContext);

  const [phoneNumber, setPhoneNumber] = useState("079 Mech-Finder");
  const [fullNames, setFullNames] = useState("Full Names");
  const [isManager, setIsManager] = useState(false);
  const [logoTapsCounter, setLogoTapsCounter] = useState(0);

  useEffect(() => {
    getUserInfomation();
  }, []);

  const getUserInfomation = () => {
    const userId = auth.currentUser.uid;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `Users/${userId}/UserInfo`))
      .then((snapshot) => {
        // setIsLoading(false);

        if (snapshot.exists()) {
          //This is a returning user
          const user = snapshot.val();

          setFullNames(`${user.fullNames} ${user.surname}`);
          setPhoneNumber(`${user.phoneNumber}`);
          setIsManager(user.isManager ? true : false);
        } else {
          ////Ignore, this will never happen
        }
      })
      .catch((error) => {
        if (error.message == "Error: Client is offline.") {
          alert(
            "Failed to fetch your account information because you do not have access to internet"
          );
        } else {
          alert(`${error.message}`);
        }
      });
  };

  const _signOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsSignedIn(false);
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  };
  const incrementCounter = () => {
    if (logoTapsCounter < 9) {
      setLogoTapsCounter(logoTapsCounter + 1);
    } else {
      if (!isManager) {
        upgradeToManager();
      } else {
        alert("You are already a manager for Inspect-it");
        Vibration.vibrate(500);
      }
    }
  };
  const upgradeToManager = () => {
    const userId = auth.currentUser.uid;
    const database = getDatabase();

    update(ref(database, `Users/${userId}/UserInfo`), {
      isManager: true,
    });

    setIsManager(true);

    Vibration.vibrate(1500);
    Alert.alert(
      `Congratulations 🔥💯`,
      "You are now part of Inspect-it management ",
      [
        {
          text: "Thank you",
          style: "cancel",
        },
      ]
    );
  };
  return (
    <Layout>
      <ScrollView
        style={{
          height: DEVICE_HEIGHT * 0.8,
        }}
      >
        <View>
          <ImageBackground
            source={require("../../assets/images/bg-image.webp")}
            style={styles.bgImageStyle}
          >
            <Text style={styles.nameText}>{fullNames}</Text>
            <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
          </ImageBackground>

          {isManager && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Management")}
              style={styles.option}
            >
              <View style={styles.iconTextName}>
                <MaterialCommunityIcons
                  name="account"
                  size={29}
                  color="white"
                />
                <Text style={styles.optionName}>Management </Text>
              </View>
              <View style={styles.arrow}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={30}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MyAccount", {
                refreshUserInformation: getUserInfomation,
              })
            }
            style={styles.option}
          >
            <View style={styles.iconTextName}>
              <MaterialCommunityIcons name="account" size={29} color="white" />
              <Text style={styles.optionName}>My Account </Text>
            </View>
            <View style={styles.arrow}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="white"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("History")}
            style={styles.option}
          >
            <View style={styles.iconTextName}>
              <MaterialIcons name="bookmark-border" size={29} color="white" />
              <Text style={styles.optionName}>History</Text>
            </View>
            <View style={styles.arrow}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="white"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Help")}
            style={styles.option}
          >
            <View style={styles.iconTextName}>
              <MaterialIcons name="info-outline" size={29} color="white" />
              <Text style={styles.optionName}>Help</Text>
            </View>
            <View style={styles.arrow}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="white"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={_signOut} style={styles.option}>
            <View style={styles.iconTextName}>
              <MaterialCommunityIcons name="logout" size={29} color="white" />
              <Text style={styles.optionName}>Sign Out</Text>
            </View>
            <View style={styles.arrow}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={incrementCounter} activeOpacity={1}>
        <ImageBackground
          source={require("../../assets/images/LogoOriginal.jpeg")}
          style={[
            styles.bgImageStyle,
            {
              justifyContent: "flex-end",

              alignItems: "flex-start",
              bottom: 0,
              // backgroundColor: "red",
              height: DEVICE_HEIGHT * 0.15,
              width: DEVICE_HEIGHT * 0.15,
              alignSelf: "center",
            },
          ]}
        >
          <Text style={{ color: "#0000fe" }}>1.04</Text>
        </ImageBackground>
      </TouchableOpacity>
    </Layout>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingTop: STATUSBAR_HEIGHT,
    height: "100%",
    width: "100%",
  },
  bgImageStyle: {
    // backgroundColor: "#eb7a34",
    height: DEVICE_HEIGHT * 0.2,
    //height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    color: "grey",
    fontSize: 28,
    fontWeight: "bold",
  },
  phoneNumberText: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
  },

  option: {
    backgroundColor: "#0000fe",
    height: DEVICE_HEIGHT < 600 ? 35 : 40,
    width: "98%",
    marginTop: 5,
    flexDirection: "row",
    borderRadius: 5,
  },
  optionName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  iconTextName: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    width: "90%",
    height: "100%",
    //backgroundColor: "blue",
  },
  arrow: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
    height: "100%",
    //backgroundColor: "green",
  },
  driversCont: {
    backgroundColor: "#eb7a34",
    height: DEVICE_HEIGHT < 600 ? 100 : 130,
    width: SCREEN_WIDTH,
    width: "98%",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  bikeImg: {
    height: 100,
    width: 100,
  },
  stirBoyImg: {
    height: "99%",
    width: "99%",
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "center",
  },
  stirBoyCont: {
    marginTop: 5,
    backgroundColor: "#eb7a34",
    height: DEVICE_HEIGHT * 0.2,
    width: "98%",
  },
});
