import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  View,
  Vibration,
} from "react-native";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { getAuth } from "firebase/auth";

import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";

import Layout from "../../components/Layout";
import Header from "../../components/Header";
import LoadingIndicator from "../../components/LoadingIndicator";
import DisplayError from "../../components/DisplayError";

import Dimensions from "../../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

const auth = getAuth();

export default function MyAccount({ navigation, route }) {
  const { refreshUserInformation } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [fullNames, setFullNames] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("079 Inspect-it");
  const [nameIsEditted, setNameIsEditted] = useState("");
  const [surnameIsEditted, setSurnameIsEditted] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [idOrPassportNumber, setIdOrPassportNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const fullNamesTextInputRef = React.useRef();
  const surnameInputRef = React.useRef();

  useEffect(() => {
    getUserInfomation();
  }, []);

  const getUserInfomation = () => {
    const userId = auth.currentUser.uid;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `Users/${userId}/UserInfo`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //This is a returning user
          const user = snapshot.val();
          console.log(user);

          setFullNames(user.fullNames);
          setSurname(user.surname);
          setPhoneNumber(user.phoneNumber);
          setIdOrPassportNumber(user.idOrPassportNumber);
          setCompanyName(user.companyName);
        } else {
          ////Ignore, this will never happen
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.message == "Error: Client is offline.") {
          setErrorMessage(
            "It appears you are offline, please check your internet connection and try again"
          );
        } else {
          setErrorMessage(`${error.message}`);
        }
      });
  };

  const alertError = (title, message) => {
    Vibration.vibrate(500);
    Alert.alert(`⚠ ${title}`, message, [
      {
        text: "Okay",
        style: "cancel",
      },
    ]);
  };

  const validateForm = () => {
    if (fullNames.length < 3) {
      alertError(
        "Invalid Name",
        "Please make sure you have filled your Names correctly"
      );
    } else if (surname.length < 3) {
      alertError(
        "Invalid Surname",
        "Please make sure you have filled your surname correctly"
      );
    } else {
      saveChanges();
    }
  };

  const saveChanges = () => {
    const userId = auth.currentUser.uid;

    const database = getDatabase();

    update(ref(database, `Users/${userId}/UserInfo`), {
      surname,
      fullNames,
    });
    setNameIsEditted(false);
    setSurnameIsEditted(false);
    refreshUserInformation();
  };

  if (errorMessage) {
    return (
      <DisplayError
        navigation={navigation}
        title="My Account"
        message={errorMessage}
        tryAgain={() => {
          setIsLoading(true);
          setErrorMessage(null);
          getUserInfomation();
        }}
      />
    );
  }

  return (
    <Layout>
      <Header navigation={navigation} title="My Account" />
      {isLoading ? (
        <LoadingIndicator title="Fetching Account Details..." />
      ) : (
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          style={styles.scrollViewStyle}
        >
          <View style={styles.bodyCont}>
            <View style={styles.row}>
              <Ionicons name="person" size={24} color="blue" />
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => {
                  setNameIsEditted(true);
                  setFullNames(text);
                }}
                value={fullNames}
                placeholder={"Full Names"}
                ref={fullNamesTextInputRef}
              />
              {nameIsEditted ? (
                <TouchableOpacity onPress={validateForm} style={styles.save}>
                  <Text style={styles.saveButtonText}>SAVE</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => fullNamesTextInputRef.current.focus()}
                  style={styles.editTextIconWrapper}
                >
                  <AntDesign name="edit" size={24} color="blue" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.row}>
              <MaterialIcons name="family-restroom" size={24} color="#0000fe" />
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => {
                  setSurnameIsEditted(true);
                  setSurname(text);
                }}
                value={surname}
                placeholder={"Surname"}
                ref={surnameInputRef}
              />
              {surnameIsEditted ? (
                <TouchableOpacity onPress={validateForm} style={styles.save}>
                  <Text style={styles.saveButtonText}>SAVE</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => surnameInputRef.current.focus()}
                  style={styles.editTextIconWrapper}
                >
                  <AntDesign name="edit" size={24} color="blue" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.row}>
              <AntDesign name="idcard" size={24} color="grey" />

              <Text style={styles.emailText}>{idOrPassportNumber}</Text>
            </View>
            <View style={styles.row}>
              <Feather name="phone" size={24} color="grey" />

              <Text style={styles.emailText}>{phoneNumber}</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome name="building" size={24} color="grey" />

              <Text style={styles.emailText}>{companyName}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  saveButtonText: {
    color: "white",
  },
  inputStyle: {
    backgroundColor: "white",
    minHeight: SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 0.9,
    borderColor: "grey",
    borderWidth: 1,
    marginVertical: 30,
    borderRadius: 1,
    padding: 10,
    borderRadius: 5,
  },
  scrollViewStyle: {
    //backgroundColor: "red",
    flex: 1,
    paddingHorizontal: 2,
    height: "93.5%",
    width: "100%",
  },
  bodyCont: {
    backgroundColor: "white",
    minHeight: DEVICE_HEIGHT * 0.1,
    width: "98%",
    elevation: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  header: {
    //backgroundColor: "green",
    height: DEVICE_HEIGHT * 0.05,
    width: "100%",
    justifyContent: "center",
    padding: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    //fontStyle: "italic",
  },

  row: {
    //backgroundColor: "lightgrey",
    height: DEVICE_HEIGHT * 0.06,
    width: "100%",
    //justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    flexDirection: "row",
    marginTop: 5,
    borderBottomWidth: 0.5,
  },
  textInputStyle: {
    width: "75%",
    alignSelf: "center",
    fontSize: 15,
    alignContent: "flex-start",
    padding: 5,
    marginLeft: 5,
    color: "blue",
  },
  emailText: {
    width: "80%",
    alignSelf: "center",
    fontSize: 15,
    alignContent: "flex-start",
    padding: 5,
    marginLeft: 5,
    color: "grey",
  },
  editTextIconWrapper: {
    //backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    //width: "12%",
  },
  save: {
    backgroundColor: "blue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    margin: 2,
    height: "90%",
    elevation: 10,
  },
});
