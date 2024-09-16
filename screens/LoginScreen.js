import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { useState, useContext } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../src/contexts/UserContext";
import Toast, { ErrorToast } from "react-native-toast-message";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { isRunningInExpoGo } from "expo";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  // const [volunteers, setVolunteers] = useState([]);
  // const [isVolunteer, setIsVolunteer] = useState(false);

  const successToast = () => {
    Toast.show({
      type: "success",
      text1: "You have successfully logged in!",
      text2: "Welcome to the Voluntreats community!",
      visibilityTime: 1000,
      autoHide: true,
      /*  onShow: () => {
        isVolunteer == true
          ? navigation.replace("Explore Opps")
          : navigation.replace("Explore Opps");
      },
      onHide: () => {}, */
    });
  };

  const errorToast = (err) => {
    // console.log("err 44444", err);
    Toast.show({
      type: "error",
      text1: `Something has gone wrong`,
      text2: "Please try Again",
      visibilityTime: 2000,
      autoHide: true,
      // onShow: () => {},
      // onHide: () => {},
    });
  };

  const isOrg = async (email) => {
    const colRef = collection(db, "Organizations");
    const q = query(colRef, where("email", "==", email));
    let userData;
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty == false) {
        userData = querySnapshot.docs[0].data();
      } else {
        userData = false;
      }
    } catch {
      console.log("error"); //todo
    }
    if (userData) {
      setLoggedInUser(userData.email);
      navigation.replace("Voluntreats");
    }
  };

  const isVol = async (email) => {
    const colRef = collection(db, "Volunteers");
    const q = query(colRef, where("email", "==", email));
    let userData;
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty == false) {
        userData = querySnapshot.docs[0].data();
      } else {
        userData = false;
      }
    } catch {
      console.log("error"); //todo
    }
    if (userData) {
      setLoggedInUser(userData.email);
      navigation.replace("Your Local Opportunities");
    } else {
      isOrg(email);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const handleRegister = () => {
    navigation.navigate("Which User");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        //console.log("Logged in with", user);
        isVol(user.email);
        successToast();
      })
      .catch((error) => errorToast(error));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.image}>
        <Image
          source={require("./../assets/Untitled-2.png")}
          style={{ width: 296, height: 119 }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.textBelow}>
            Are you a student that is looking for volunteer opportunities? Or
            are you an organisation looking to host an event for charity? Here,
            you can build your experience while making changes for the greater
            good!
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    // marginTop: 50,
    width: "80%",
  },
  input: {
    backgroundColor: "#FFFFFB",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 18,
    color: "5D62CB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  image: {
    paddingBottom: 10,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 10,
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
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#3D5C43",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#3D5C43",
    fontWeight: "700",
    fontSize: 16,
  },
  emailInput: {
    color: "#5D62CB",
    fontWeight: "600",
    fontSize: 16,
  },
  passwordInput: {
    color: "#5D62CB",
    fontWeight: "600",
    fontSize: 16,
  },
  textBelow: {
    marginTop: 40,
    color: "#3D5C43",
    fontSize: 16,
    textAlign: "center",
  },
});
