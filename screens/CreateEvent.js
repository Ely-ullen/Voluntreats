import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { db } from "../firebase";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../src/contexts/UserContext";

const eventSchema = yup.object({
  event_title: yup
    .string()
    .required("event title is a required field")
    .min(2)
    .max(60),
  description: yup.string().required().min(2).max(1000),
  location: yup.string().required().min(2).max(60),
  date_time: yup.string().typeError("Enter a date").required("Enter a date"),
  number_of_vols: yup
    .number()
    .typeError("n° of volunteer is a required field")
    .required("n° of volunteer is a required field")
    .min(1, "minimum one volunteer is required"),
  treats: yup.string().required().min(2).max(100),
  image: yup.string(),
  // .matches(
  //   "/((https?)://)?(www.)?[a-z0-9]+(.[a-z]{2,}){1,3}(#?/?[a-zA-Z0-9#]+)*/?(?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/",
  //   "Enter correct url!"
  // )
  // .required("Please enter website"),
});

const CreateEvent = () => {
  const [newEvent, setNewEvent] = useState({});
  const { loggedInUser } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.select({ android: undefined, ios: "padding" })}
        >
          <Text style={styles.title1}>Create a new event</Text>
          <View style={styles.buttonContainer}>
            <Formik
              initialValues={{
                event_title: "",
                description: "",
                location: "",
                date_time: "",
                number_of_vols: 0,
                treats: "",
                image: "",
              }}
              validationSchema={eventSchema}
              onSubmit={(values, actions) => {
                values.company = loggedInUser.company_name;
                values.email = loggedInUser.email;
                values.users = [];
                setNewEvent(values);
                db.collection("events").add(values);
                actions.resetForm();
                navigation.navigate("Event Confirmation");
              }}
            >
              {(props) => (
                <View>
                  <TextInput
                    placeholder="Event Title"
                    style={styles.input}
                    onChangeText={props.handleChange("event_title")}
                    onBlur={props.handleBlur("event_title")}
                    value={props.values.event_title}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.event_title && props.errors.event_title}
                  </Text>

                  <TextInput
                    placeholder="Description"
                    style={styles.input}
                    onChangeText={props.handleChange("description")}
                    onBlur={props.handleBlur("description")}
                    value={props.values.description}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.description && props.errors.description}
                  </Text>
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
                    placeholder="Date and Time"
                    style={styles.input}
                    onChangeText={props.handleChange("date_time")}
                    onBlur={props.handleBlur("date_time")}
                    value={props.values.date_time}
                    dataDetectorTypes="calendarEvent"
                  />
                  <Text style={styles.errorText}>
                    {props.touched.date_time && props.errors.date_time}
                  </Text>
                  <TextInput
                    placeholder="Number of Volunteers"
                    style={styles.input}
                    onChangeText={props.handleChange("number_of_vols")}
                    onBlur={props.handleBlur("number_of_vols")}
                    value={props.values.number_of_vols}
                    keyboardType="numeric"
                  />
                  <Text style={styles.errorText}>
                    {props.touched.number_of_vols &&
                      props.errors.number_of_vols}
                  </Text>
                  <TextInput
                    placeholder="Treats"
                    style={styles.input}
                    onChangeText={props.handleChange("treats")}
                    onBlur={props.handleBlur("treats")}
                    value={props.values.treats}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.treats && props.errors.treats}
                  </Text>
                  <TextInput
                    placeholder="URL path image"
                    style={styles.input}
                    onChangeText={props.handleChange("image")}
                    onBlur={props.handleBlur("image")}
                    value={props.values.image}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.image && props.errors.image}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={props.handleSubmit}
                  >
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default CreateEvent;

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
    backgroundColor: "#6D326D",
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
