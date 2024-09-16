import { db } from "../firebase";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import Toast, { ErrorToast } from "react-native-toast-message";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const volunteerSchema = yup.object({
  firstName: yup
    .string()
    .required("first name is a required field")
    .min(2)
    .max(20),
  surname: yup.string().required().min(2).max(20),
  studentId: yup
    .string()
    .required("student Id is a required field")
    .min(5, "Must be exactly 5 values")
    .max(5, "Must be exactly 5 values"),
  location: yup.string().required().min(2),
  phone: yup
    .string()
    .required()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(11, "too short")
    .max(11, "too long"),
  email: yup.string().required().email("Please enter a valid email"),
  password: yup.string().required().min(8),
});

const StudentReg = () => {
  const navigation = useNavigation();
  const successToast = () => {
    Toast.show({
      type: "success",
      text1: "You have successfully registered!",

      text2: "Please login",
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
      text1: `Something goes wrong: ${err}`,
      text2: "Try Again",
      visibilityTime: 5000,
      autoHide: false,
      onShow: () => {},
      onHide: () => {},
    });
  };
  return (
    <ScrollView style={{ marginHorizontal: 20 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.select({ android: undefined, ios: "padding" })}
        >
          <View style={styles.buttonContainer}>
            <Formik
              initialValues={{
                userType: "vol",
                firstName: "",
                surname: "",
                studentId: "",
                location: "",
                phone: "",
                email: "",
                password: "",
              }}
              validationSchema={volunteerSchema}
              onSubmit={async (values, actions) => {
                values.events = [];
                try {
                  await db.collection("Volunteers").add(values);
                  await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                  );
                  successToast();
                  actions.resetForm();
                } catch (err) {
                  errorToast(err);
                }
              }}
            >
              {(props) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={props.handleChange("firstName")}
                    onBlur={props.handleBlur("firstName")}
                    value={props.values.firstName}
                  />
                  {/* only if the left value is a valid string, will the right value be displayed */}
                  <Text style={styles.errorText}>
                    {props.touched.firstName && props.errors.firstName}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Surname"
                    onChangeText={props.handleChange("surname")}
                    onBlur={props.handleBlur("surname")}
                    value={props.values.surname}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.surname && props.errors.surname}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Student ID number"
                    onChangeText={props.handleChange("studentId")}
                    onBlur={props.handleBlur("studentId")}
                    value={props.values.studentId}
                    keyboardType="numeric"
                  />
                  <Text style={styles.errorText}>
                    {props.touched.studentId && props.errors.studentId}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Location"
                    onChangeText={props.handleChange("location")}
                    onBlur={props.handleBlur("location")}
                    value={props.values.location}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.location && props.errors.location}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    onChangeText={props.handleChange("phone")}
                    onBlur={props.handleBlur("phone")}
                    value={props.values.phone}
                    keyboardType="numeric"
                  />
                  <Text style={styles.errorText}>
                    {props.touched.phone && props.errors.phone}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={props.handleChange("email")}
                    onBlur={props.handleBlur("email")}
                    value={props.values.email.toLowerCase()}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.email && props.errors.email}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={props.handleChange("password")}
                    onBlur={props.handleBlur("password")}
                    value={props.values.password}
                    secureTextEntry
                  />
                  <Text style={styles.errorText}>
                    {props.touched.password && props.errors.password}
                  </Text>
                  <TouchableOpacity>
                    <View style={styles.button}>
                      <Text
                        style={styles.buttonText}
                        title="Submit"
                        onPress={props.handleSubmit}
                      >
                        Submit
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Text>
                    By signing up I agree to Voluntreat's
                    <Text style={styles.text1}> terms of service </Text>
                    <Text>and </Text>
                    <Text style={styles.text1}> privacy policy</Text>
                  </Text>
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default StudentReg;

const styles = StyleSheet.create({
  input: {
    margin: 0,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    fontSize: 15,
    borderRadius: 6,
  },
  container: {
    padding: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#3D5C43",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "#C33C54",
    fontWeight: "light",
    marginBottom: 2,
    marginTop: 2,
    margin: 0,
    textAlign: "center",
  },
  text1: {
    color: "#E48510",
    justifyContent: "space-between",
  },
});
