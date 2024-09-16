import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

const OrgEventConfirmation = () => {
  return (
    <View>
      <Text style={styles.smile}>
        <Ionicons name="smileo" size={50} />
      </Text>

      <Text style={styles.text}>
        Your event has been confirmed!{" "}
        <Ionicons name="checkcircleo" size={20} color="green" />
      </Text>

      <Text style={styles.text1}>Maintaining Green Spaces</Text>
      <Text style={styles.text2}>
        <Feather name="map-pin" size={24} /> Whitworth Park, Rusholme
      </Text>

      <Text style={styles.text2}>
        <Ionicons name="calendar" size={24} /> From 9AM - 3.30PM Thur 14 Sep
      </Text>
      <Text style={styles.text2}>
        <Ionicons name="team" size={24} /> Up to 4 volunteers needed
      </Text>
      <Text style={styles.text2}>
        <Ionicons name="gift" size={24} /> 50% off all food at Deaf Institute
        for one month.
      </Text>
      <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
        <Text style={styles.editEvent}>
          <Ionicons name="edit" size={20} style={styles.iconStyle} /> Edit Event
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrgEventConfirmation;

const styles = StyleSheet.create({
  smile: {
    color: "#6D326D",
    textAlign: "center",
    marginTop: 35,
    marginBottom: 20,
  },
  text: {
    color: "#6D326D",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  text1: {
    color: "#6D326D",
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 60,
    marginLeft: 10,
  },
  text2: {
    color: "#4D4B4B",
    textAlign: "left",
    fontSize: 16,
    fontWeight: "light",
    paddingTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    paddingBottom: 5,
  },
  button: {
    backgroundColor: "#6D326D",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  buttonOutline: {
    backgroundColor: "#6D326D",
    marginTop: 10,
    borderColor: "#3D5C43",
    alignItems: "center",
    marginBottom: 1,
  },
  editEvent: {
    color: "white",
  },
});
