import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/AntDesign";

const Activity = () => {
  return (
    <>
      <View>
        <Text style={styles.title1}>Your Activity</Text>
      </View>
      <View
        style={{
          borderBottomColor: "#646464",
          paddingBottom: 15,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      ></View>
      <Text style={styles.title}>Upcoming Events</Text>
      <Text style={styles.title2}>
        Soup Kitchen Assistance, Sacred Trinity Church
      </Text>
      <Text style={styles.text3}>
        <Ionicons name="calendar" size={22} /> From 10AM - 4PM Sat 8 Aug and Sun
        9 Aug
      </Text>
      <View
        style={{
          borderBottomColor: "#646464",
          paddingBottom: 15,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      ></View>
      <View
        style={{
          borderBottomColor: "#646464",
          paddingBottom: 15,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      ></View>
      <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
        <Text style={styles.signUp}> I can no longer attend the event</Text>
      </TouchableOpacity>
      <Text style={styles.title2}>
        Planting Vegetables at Chorlton High School, Unicorn Grocery
      </Text>
      <Text style={styles.text3}>
        <Ionicons name="calendar" size={22} /> From 12AM - 3PM Sat 15 Aug and
        Sun 16 Aug
      </Text>
      <View
        style={{
          borderBottomColor: "#646464",
          paddingBottom: 15,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      ></View>
      <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
        <Text style={styles.signUp}> I can no longer attend the event</Text>
      </TouchableOpacity>
      <View style={styles.image}>
        <Image
          source={require("./../assets/Untitled-1.png")}
          style={{ width: 128, height: 40 }}
        />
      </View>
    </>
  );
};

export default Activity;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: "#4D4B4B",
    fontWeight: "500",
    marginLeft: 9,
    marginTop: 20,
  },
  title1: {
    fontSize: 20,
    color: "#3D5C43",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
  title2: {
    fontSize: 16,
    color: "#4D4B4B",
    fontWeight: "500",
    marginLeft: 9,
    marginTop: 20,
  },
  text3: {
    fontSize: 16,
    color: "#4D4B4B",
    fontWeight: "500",
    marginLeft: 9,
    marginTop: 20,
  },
  hairlineWidth: {
    padding: 30,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#3D5C43",
    width: "90%",
    padding: 8,
    borderRadius: 10,
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
    backgroundColor: "#3D5C43",
    marginTop: 20,
    borderColor: "#3D5C43",
    borderWidth: 2,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    alignItems: "center",
  },
  signUp: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  image: {
    marginTop: 40,
    alignSelf: "center",
  },
});
