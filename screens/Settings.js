import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import React from "react";
import { CurrentRenderContext, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/AntDesign";
import Toast, { ErrorToast } from "react-native-toast-message";
import { useContext } from "react";
import { UserContext } from "../src/contexts/UserContext";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Settings = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const auth = getAuth();

  const successToast = () => {
    Toast.show({
      type: "success",
      text1: "You have successfully logged out!",

      text2: "Thank you for use our app...",
      visibilityTime: 5000,
      autoHide: true,
      onShow: () => {
        navigation.replace("Login");
      },
      onHide: () => {},
    });
  };

  const errorToast = (err) => {
    ErrorToast.show({
      type: "error",
      text1: `Something went wrong: ${err}`,
      text2: "Try Again",
      visibilityTime: 5000,
      autoHide: false,
      onShow: () => {},
      onHide: () => {},
    });
  };

  const navigation = useNavigation();
  const volunteerHistory = () => {
    navigation.navigate("Volunteer History");
  };

  const preferencesLink = () => {
    navigation.navigate("Set Preferences");
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setLoggedInUser([]);

        successToast();
      })
      .catch((err) => {
        errorToast(err);
      });
  };

  // subscribing to auth changes
  onAuthStateChanged(auth, (user) => {
    // console.log("user status changed:", user);
  });

  return (
    <View style={styles.flexCol}>
      <View style={styles.flexCol}>
        {loggedInUser.firstName ? (
          <Ionicons name="smileo" size={40} />
        ) : (
          <Ionicons name="idcard" size={40} color={"#4D4B4B"} />
        )}
        <Text style={styles.text}>
          {loggedInUser.company_name
            ? `${loggedInUser.company_name}`
            : `${loggedInUser.firstName}`}
        </Text>
      </View>

      <TouchableOpacity onPress={volunteerHistory} style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={preferencesLink} style={styles.button}>
        <Text style={styles.buttonText}>Set Preferences</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View My History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Notification Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>FAQ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={logOut}
        style={[styles.logoutButton, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    marginTop: 8,
    padding: 18,
    borderColor: "#3D5C43",
    borderWidth: 1,

    width: "80%",

    borderRadius: 10,
    alignItems: "center",
  },
  flexCol: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },

  buttonText: {
    color: "#3D5C43",
  },
  text: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#3D5C43",
    fontSize: 16,
    marginBottom: 20,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#3D5C43",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonOutline: {
    backgroundColor: "#FFFFFB",
    marginTop: 5,
    borderColor: "#4D4B4B",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#4D4B4B",
    fontSize: 16,
  },
});
