import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
const SignUp = () => {
  const navigation = useNavigation();
  const goBack = () => {
    // setTimeout(() => {
    //   navigation.navigate("Explore Opps");
    // }, 3000);
  };
  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("./../assets/fonts/Rubik-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View>
      <View style={styles.text}>
        <Ionicons name="checkcircleo" size={45} color="green" />
        <Text
          style={{
            fontFamily: "Rubik-Regular",
            fontSize: 30,
            color: "#3D5C43",
            textAlign: "center",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          You're all signed up {"\n"}and set to go!
          {goBack()}
        </Text>
        <Image
          source={require("./../assets/clapping2.png")}
          style={{ width: 180, height: 180 }}
        />
        <Text style={styles.text1}>
          Thank you for signing up to volunteer. Your help means a lot to the
          community and we really appreciate it. Please remember to bring your
          student ID with you.
        </Text>
      </View>

      <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
        <Text style={styles.contact}>
          <Fontisto name="email" size={18} /> Contact Organiser
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  text1: {
    fontSize: 16,
    color: "#4D4B4B",
    marginTop: 20,
    textAlign: "center",
    marginBottom: 10,
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
    backgroundColor: "#3D5C43",
    marginTop: 10,
    borderColor: "#3D5C43",
    alignItems: "center",
    marginBottom: 1,
  },
  editEvent: {
    color: "white",
    fontSize: 16,
    alignItems: "center",
  },
  contact: {
    color: "white",
    fontSize: 16,
    alignItems: "center",
  },
});
