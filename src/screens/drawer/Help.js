import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { getDatabase, ref, child, get } from "firebase/database";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import Layout from "../../components/Layout";
import Header from "../../components/Header";
import LoadingIndicator from "../../components/LoadingIndicator";

import Dimensions from "../../utilities/Dimensions";

const { SCREEN_WIDTH, DEVICE_HEIGHT } = Dimensions;

export default function Help({ navigation }) {
  const [callGeneralEnquiries, setCallGeneralEnquiries] =
    useState("0720651530");
  const [callTechnicalTeam, setCallTechnicalTeam] = useState("0799016924");

  const [emailGeneralEnquiries, setEmailGeneralEnquiries] = useState(
    "info@inspectit.co.za"
  );
  const [emailTechnicalTeam, setEmailTechnicalTeam] = useState(
    "mulwelimushiana@yahoo.com"
  );

  const [whatsAppGeneralEnquiries, setWhatsAppGeneralEnquiries] =
    useState("27720651530");
  const [whatsAppTechnicalTeam, setWhatsAppTechnicalTeam] =
    useState("27799016924");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Contacts`))
      .then((snapshot) => {
        const contacts = snapshot.val();
        setCallGeneralEnquiries(contacts.callGeneralEnquiries);
        setCallTechnicalTeam(contacts.callTechnicalTeam);
        setEmailGeneralEnquiries(contacts.emailGeneralEnquiries);
        setEmailTechnicalTeam(contacts.emailTechnicalTeam);
        setWhatsAppGeneralEnquiries(contacts.whatsAppGeneralEnquiries);
        setWhatsAppTechnicalTeam(contacts.whatsAppTechnicalTeam);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <Header navigation={navigation} title="Help" />
      {isLoading ? (
        <LoadingIndicator title="Hang on a second..." />
      ) : (
        <View style={styles.body}>
          <View style={styles.helpType}>
            <Text style={styles.helpText}>FOR HELP WITH THE APP</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                `http://api.whatsapp.com/send?phone=${whatsAppTechnicalTeam}`
              );
            }}
            style={styles.action}
          >
            <FontAwesome5 name="whatsapp" size={24} color="black" />
            <Text style={styles.actionText}>WhatsApp Our Technicians</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${callTechnicalTeam}`);
            }}
            style={styles.action}
          >
            <Ionicons name="ios-call" size={24} color="#301605" />
            <Text style={styles.actionText}>Call Our Technicians</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`mailto:${emailTechnicalTeam}`);
            }}
            style={styles.action}
          >
            <MaterialIcons name="email" size={24} color="#301605" />
            <Text style={styles.actionText}>Email Our Technicians</Text>
          </TouchableOpacity>
          <View style={styles.helpType}>
            <Text style={styles.helpText}>GENERAL ENQUIRIES</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                `http://api.whatsapp.com/send?phone=${whatsAppGeneralEnquiries}`
              );
            }}
            style={styles.action}
          >
            <FontAwesome5 name="whatsapp" size={24} color="black" />
            <Text style={styles.actionText}>WhatsApp Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${callGeneralEnquiries}`);
            }}
            style={styles.action}
          >
            <Ionicons name="ios-call" size={24} color="#301605" />
            <Text style={styles.actionText}>Call Inspect-it</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`mailto:${emailGeneralEnquiries}`);
            }}
            style={styles.action}
          >
            <MaterialIcons name="email" size={24} color="#301605" />
            <Text style={styles.actionText}>Email Inspect-it</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`sms:${callGeneralEnquiries}`);
            }}
            style={styles.action}
          >
            <MaterialIcons name="sms" size={24} color="#301605" />

            <Text style={styles.actionText}>SMS Inspect-it</Text>
          </TouchableOpacity>
        </View>
      )}
    </Layout>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    // backgroundColor: "grey",
    height: DEVICE_HEIGHT * 0.9,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    //backgroundColor: "white",
    height: DEVICE_HEIGHT * 0.9,
    width: SCREEN_WIDTH * 0.98,
    marginTop: 1,
    //elevation: 1,
    alignItems: "center",
  },
  helpType: {
    backgroundColor: "blue",
    height: "6%",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    // borderBottomWidth: 1,
    elevation: 4,
    marginTop: 5,
    borderRadius: 5,
  },
  helpText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  action: {
    backgroundColor: "white",
    height: "7%",
    width: "95%",
    alignItems: "center",
    //justifyContent: "center",
    padding: 10,
    //borderBottomWidth: 0.3,
    flexDirection: "row",
    marginVertical: 2,
    elevation: 2,
    //borderBottomColor: "#eb7a34",
  },
  actionText: {
    //fontWeight: "bold",
    fontSize: 13,
    marginLeft: 5,
  },
});
