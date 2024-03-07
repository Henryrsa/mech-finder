import React, { useState, useContext } from "react";
import {
  Text,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  TextInput,
  ScrollView,
  Vibration,
} from "react-native";

import { getAuth } from "firebase/auth";
import {
  Ionicons,
  MaterialIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";
import { getDatabase, ref, set } from "firebase/database";

import { UserContext } from "../../context/UserContext";

import Layout from "../../components/Layout";
import Dimensions from "../../utilities/Dimensions";
import genericStyles from "../../utilities/Styles";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

const auth = getAuth();

export default function SignUpForm({ navigation, route }) {
  const { phoneNumber } = route.params;

  const [isSignedIn, setIsSignedIn] = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [fullNames, onChangeFullName] = useState("");
  const [surname, onChangeSurname] = useState("");
  const [idOrPassportNumber, onChangeIdOrPassportNumber] = useState("");
  const [companyName, onChangeCompanyName] = useState("");
  const [checked, setChecked] = useState(false);

  const alertError = (title, message) => {
    Vibration.vibrate(500);
    Alert.alert(`⚠ ${title}`, message, [
      {
        text: "Okay",
        // onPress: () => console.log('Cancel Pressed'),
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
    } else if (idOrPassportNumber.length < 3) {
      alertError(
        "Invalid ID or Passport",
        "Please make sure you have filled your ID or Passport correctly"
      );
    } else if (companyName.length < 3) {
      alertError(
        "Invalid Company Name",
        "Please make sure you have filled the Company Name correctly"
      );
    } else if (!checked) {
      alertError(
        "Terms and Conditions",
        "You have to agree to terms and conditions in order for you to proceed"
      );
    } else {
      registerUser();
    }
  };

  const registerUser = () => {
    setIsLoading(true);
    const userId = auth.currentUser.uid;

    const database = getDatabase();
    set(ref(database, `Users/${userId}/UserInfo`), {
      fullNames,
      surname,
      idOrPassportNumber,
      companyName,
      phoneNumber,
    })
      .then(() => {
        // Data saved successfully!
        setIsLoading(false);
        setIsSignedIn(true); //This will make the navigator to switch to home screen
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error);
      });
  };

  return (
    <Layout>
      <ScrollView
        style={{ flex: 1, height: "100%", width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          source={require("../../assets/images/LogoOriginal.jpeg")}
          style={{
            height: SCREEN_WIDTH * 0.3,
            width: SCREEN_WIDTH * 0.3,
            marginVertical: 10,
          }}
        />
        <Text style={styles.headerText}>Registration</Text>
        <View style={styles.inputFieldHolder}>
          <View style={styles.iconHolder}>
            <Ionicons name="person" size={24} color="#0000fe" />
          </View>
          <TextInput
            style={styles.inputStyle}
            onChangeText={onChangeFullName}
            value={fullNames}
            placeholder="Names"
          />
        </View>
        <View style={styles.inputFieldHolder}>
          <View style={styles.iconHolder}>
            <MaterialIcons name="family-restroom" size={24} color="#0000fe" />
          </View>
          <TextInput
            style={styles.inputStyle}
            onChangeText={onChangeSurname}
            value={surname}
            placeholder="Surname"
          />
        </View>
        <View style={styles.inputFieldHolder}>
          <View style={styles.iconHolder}>
            <AntDesign name="idcard" size={24} color="#0000fe" />
          </View>
          <TextInput
            style={styles.inputStyle}
            onChangeText={onChangeIdOrPassportNumber}
            value={idOrPassportNumber}
            placeholder="ID or Passport Number"
          />
        </View>
        <View style={styles.inputFieldHolder}>
          <View style={styles.iconHolder}>
            <FontAwesome name="building" size={24} color="#0000fe" />
          </View>
          <TextInput
            style={styles.inputStyle}
            onChangeText={onChangeCompanyName}
            value={companyName}
            placeholder="Company Name"
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            setChecked(!checked);
          }}
          style={styles.termsCheckBoxHolder}
        >
          <View style={styles.iconHolder}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              uncheckedColor="#0000fe"
              color="#0000fe"
            />
          </View>
          <Text>I agree to the terms and conditions</Text>
        </TouchableOpacity>
        {isLoading ? (
          <View
            style={[
              genericStyles.buttonStyle,
              {
                marginVertical: 15,
                width: SCREEN_WIDTH * 0.7,
              },
            ]}
          >
            <ActivityIndicator size={"large"} color="white" />
          </View>
        ) : (
          <TouchableOpacity
            style={[
              genericStyles.buttonStyle,
              {
                marginVertical: 15,
                width: SCREEN_WIDTH * 0.7,
              },
            ]}
            onPress={validateForm}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: "#0000fe",
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },

  inputFieldHolder: {
    // backgroundColor: "red",
    height: DEVICE_HEIGHT * 0.05,
    width: "90%",
    borderBottomColor: "#0000fe",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  iconHolder: {
    // backgroundColor: "green",
    height: "100%",
    width: "12%",
    justifyContent: "center",
    // alignItems: "center",
  },

  inputStyle: {
    flex: 1,
    // backgroundColor: "pink",
    // paddingHorizontal: 5,
    color: "black",
  },

  termsCheckBoxHolder: {
    // backgroundColor: "red",
    height: DEVICE_HEIGHT * 0.05,
    width: "90%",
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
});
