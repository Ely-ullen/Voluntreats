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

const organiserSchema = yup.object({
  company_name: yup
    .string()
    .required("company name is a required field")
    .min(2)
    .max(20),
  company_type: yup
    .string()
    .required("company type is a required field")
    .min(2)
    .max(20),
  contact_name: yup
    .string()
    .required("contact name is a required field")
    .min(2)
    .max(20),
  // company_reg_number: yup
  //   .string()
  //   .required("company registration N° is a required field")
  //   .min(5, "Must be exactly 5 values")
  //   .max(5, "Must be exactly 5 values"),

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

const OrganiserReg = () => {
  console.log("lopol");
  const navigation = useNavigation();
  const successToast = () => {
    Toast.show({
      type: "success",
      text1: "You have successfully registered your organization! 🎉",
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
    <>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.select({ android: undefined, ios: "padding" })}
          >
            <View style={styles.buttonContainer}>
              <Formik
                initialValues={{
                  company_name: "",
                  company_type: "",
                  contact_name: "",
                  // company_reg_number: "",
                  location: "",
                  email: "",
                  phone: "",
                  password: "",
                  userType: "org",
                }}
                validationSchema={organiserSchema}
                onSubmit={async (values, actions) => {
                  try {
                    await db.collection("Organizations").add(values);
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
                      placeholder="Company Name"
                      style={styles.input}
                      onChangeText={props.handleChange("company_name")}
                      onBlur={props.handleBlur("company_name")}
                      value={props.values.company_name}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.company_name && props.errors.company_name}
                    </Text>
                    <TextInput
                      placeholder="Company Type"
                      style={styles.input}
                      onChangeText={props.handleChange("company_type")}
                      onBlur={props.handleBlur("company_type")}
                      value={props.values.company_type}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.company_type && props.errors.company_type}
                    </Text>
                    <TextInput
                      placeholder="Contact Name"
                      style={styles.input}
                      onChangeText={props.handleChange("contact_name")}
                      onBlur={props.handleBlur("contact_name")}
                      value={props.values.contact_name}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.contact_name && props.errors.contact_name}
                    </Text>
                    {/* <TextInput
                      placeholder="Company Registration Number"
                      style={styles.input}
                      onChangeText={props.handleChange("company_reg_number")}
                      onBlur={props.handleBlur("company_reg_number")}
                      value={props.values.company_reg_number}
                      keyboardType="numeric"
                    />
                    <Text style={styles.errorText}>
                      {props.touched.company_reg_number &&
                        props.errors.company_reg_number}
                    </Text> */}
                    <TextInput
                      placeholder="Location"
                      style={styles.input}
                      onChangeText={props.handleChange("location")}
                      onBlur={props.handleBlur("location")}
                      value={props.values.location}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.location && props.errors.location}
                    </Text>
                    <TextInput
                      placeholder="Email Address"
                      style={styles.input}
                      onChangeText={props.handleChange("email")}
                      onBlur={props.handleBlur("email")}
                      value={props.values.email.toLowerCase()}
                    />
                    <Text style={styles.errorText}>
                      {props.touched.email && props.errors.email}
                    </Text>
                    <TextInput
                      placeholder="Telephone"
                      style={styles.input}
                      onChangeText={props.handleChange("phone")}
                      onBlur={props.handleBlur("phone")}
                      value={props.values.phone}
                      keyboardType="numeric"
                    />
                    <Text style={styles.errorText}>
                      {props.touched.phone && props.errors.phone}
                    </Text>
                    <TextInput
                      placeholder="Password"
                      style={styles.input}
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
                  </View>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
};

export default OrganiserReg;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    fontSize: 16,
    borderRadius: 6,
  },
  container: {
    padding: 20,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#3D5C43",
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
});
