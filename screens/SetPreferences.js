import * as React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast, { ErrorToast } from "react-native-toast-message";

const EditProfile = () => {
  const [space, setSpace] = React.useState("first");
  const [workpace, setWorkpace] = React.useState("both");
  const [interaction, setInteraction] = React.useState("both");
  const [isRemote, setRemote] = React.useState(false);
  const navigation = useNavigation();

  const successToast = () => {
    Toast.show({
      type: "success",
      text1: "Preferences updated! 👍 ",

      visibilityTime: 5000,
      autoHide: true,
      onShow: () => {
        navigation.replace("Settings");
      },
      onHide: () => {},
    });
  };

  const savePref = () => {
    successToast();
  };

  return (
    <View>
      <Text style={styles.oppsText1}>
        Select the type of {"\n"} activities you would {"\n"} like to see:
      </Text>
      <View style={styles.buttons}>
        <Text style={styles.oppsText}>Indoor</Text>
        <Checkbox
          value="indoor"
          status={space === "indoor" ? "checked" : "unchecked"}
          onPress={() => setSpace("indoor")}
          label="indoor"
          color="#E48510"
        />
        <Text style={styles.oppsText}>Outdoor</Text>
        <Checkbox
          value="outdoor"
          status={space === "outdoor" ? "checked" : "unchecked"}
          onPress={() => setSpace("outdoor")}
          label="outdoor"
          color="#E48510"
        />
        <Text style={styles.oppsText}>Both</Text>
        <Checkbox
          value="bothSpaces"
          status={space === "bothSpaces" ? "checked" : "unchecked"}
          onPress={() => setSpace("bothSpaces")}
          label="bothSpaces"
          color="#E48510"
        />
      </View>
      <View style={styles.buttons}>
        <Text style={styles.oppsText}>Active</Text>
        <Checkbox
          value="active"
          status={workpace === "active" ? "checked" : "unchecked"}
          onPress={() => setWorkpace("active")}
          label="active"
          color="#E48510"
        />
        <Text style={styles.oppsText}>Relaxed</Text>
        <Checkbox
          value="relaxed"
          status={workpace === "relaxed" ? "checked" : "unchecked"}
          onPress={() => setWorkpace("relaxed")}
          label="relaxed"
          color="#E48510"
        />
        <Text style={styles.oppsText}>Both</Text>
        <Checkbox
          value="bothWorkpace"
          status={workpace === "bothWorkpace" ? "checked" : "unchecked"}
          onPress={() => setWorkpace("bothWorkpace")}
          label="bothWorkpace"
          color="#E48510"
        />
      </View>
      <View style={styles.buttons}>
        <Text style={styles.oppsText}>Social</Text>
        <Checkbox
          value="social"
          status={interaction === "social" ? "checked" : "unchecked"}
          onPress={() => setInteraction("social")}
          label="social"
          color="#E48510"
        />
        <Text style={styles.oppsText}>Independent</Text>
        <Checkbox
          value="independent"
          status={interaction === "independent" ? "checked" : "unchecked"}
          onPress={() => setInteraction("independent")}
          label="independent"
          color="#E48510"
        />
        <Text style={styles.oppsText}>Both</Text>
        <Checkbox
          value="bothInteractions"
          status={interaction === "bothInteractions" ? "checked" : "unchecked"}
          onPress={() => setInteraction("bothInteractions")}
          label="bothInteractions"
          color="#E48510"
        />
        <Text style={styles.oppsText2}>Show Remote Events</Text>
        <Text style={styles.oppsText2}>Yes</Text>

        <Checkbox
          value="remoteYes"
          status={isRemote === true ? "checked" : "unchecked"}
          onPress={() => setRemote(true)}
          label="remote"
          color="#E48510"
        />
        <Text style={styles.oppsText2}>No</Text>

        <Checkbox
          value="remoteNo"
          status={isRemote === false ? "checked" : "unchecked"}
          onPress={() => setRemote(false)}
          label="remote"
          color="#E48510"
        />
        <TouchableOpacity
          onPress={savePref}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.savePreferences}>Save Preferences</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 60,
    marginLeft: 25,
    marginRight: 25,
    alignItems: "center",
  },
  oppsText: {
    color: "##4D4B4B",
    fontWeight: "light",
    fontSize: 16,
    textAlign: "left",
    marginLeft: 20,
    alignItems: "center",
  },
  oppsText1: {
    color: "#3D5C43",
    fontWeight: "400",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
    marginLeft: 25,
    marginRight: 25,
  },
  oppsText2: {
    marginBottom: 60,
    marginLeft: 20,
    fontWeight: "400",
    fontSize: 16,
  },

  rows: {
    justifyContent: "space-between",
    marginTop: 100,
  },
  button: {
    backgroundColor: "#3D5C43",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
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
    alignItems: "center",
    marginBottom: 40,
  },
  savePreferences: {
    color: "white",
  },
});
