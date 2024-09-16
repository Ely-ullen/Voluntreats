import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useContext, useState, useEffect } from "react";
import ShareTabOrg from "../navigation/ShareTabOrg";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/AntDesign";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const OrgSingleEvent = ({ route }) => {
  const [eventdoc, setEventId] = useState(route.params.eventId);
  const navigation = useNavigation();
  const [event, setEvent] = useState({});
  const [usersExist, setUserExist] = useState(false);

  const eventsCol = async () => {
    const docRef = doc(db, "events", eventdoc);
    const docSnap = await getDoc(docRef);
    return docSnap;
  };

  useEffect(() => {
    eventsCol()
      .then((docSnap) => {
        let eventU = docSnap.data();
        setEvent(docSnap.data());
        return eventU;
      })
      .then((eventU) => {
        if (eventU.users.length >= 1) {
          setUserExist(true);
        }
      });
  }, [eventdoc]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "events", eventdoc));
    navigation.navigate("Org Events");
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.oppsContainer} key={event.event_title}>
          <Text style={styles.oppsTextTitle}>{event.event_title}</Text>

          <Text style={styles.oppsText}>{event.location}</Text>
          <View
            style={{
              borderBottomColor: "#6D326D",
              paddingBottom: 15,
              marginRight: 15,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          ></View>
        </View>
        <Text style={styles.text}>
          <Ionicons name="calendar" size={20} /> {event.date_time}
        </Text>
        <Text style={styles.text}>
          <Ionicons name="team" size={20} />- Up to 10 volunteers needed
        </Text>
        <View
          style={{
            borderBottomColor: "#6D326D",
            paddingBottom: 15,

            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        ></View>
        <Text style={styles.oppsTextDescription}>
          Number of attendees still needed: {event.number_of_vols}
        </Text>

        <Text style={styles.attendInfo}>Attendees info:</Text>
        {usersExist === false && <Text>No event attendees yet</Text>}
        {usersExist &&
          event.users.map((element) => {
            return (
              <View style={styles.oppsContainer} key={element.docId}>
                <Text style={styles.userInfo1}>
                  <Text>Name:</Text> {element.firstName} {element.lastName}
                </Text>
                <Text style={styles.userInfo2}>email: {element.email} </Text>
                <Text style={styles.userInfo2}>
                  phone number: {element.phone}{" "}
                </Text>
              </View>
            );
          })}

        <TouchableOpacity
          onPress={handleDelete}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.delete}> Delete Event</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.delete}> Delete Event</Text>
        </TouchableOpacity> */}
        <ShareTabOrg />
      </View>
    </ScrollView>
  );
};

export default OrgSingleEvent;

const styles = StyleSheet.create({
  oppsContainer: {
    paddingTop: 20,
    width: "100%",
    flexDirection: "column",
    textAlign: "left",
    marginLeft: 3,
  },
  oppsText: {
    color: "#4D4B4B",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "left",
    marginLeft: 9,
    lineHeight: 20,
  },
  oppsTextTitle: {
    color: "#4D4B4B",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 9,
  },
  oppsTextDescription: {
    color: "#4D4B4B",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "left",
    marginTop: 18,
    marginLeft: 12,
    lineHeight: 24,
  },
  attendInfo: {
    color: "#6D326D",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 12,
    paddingTop: 10,
    marginBottom: -10,
  },
  userInfo1: {
    color: "#6D326D",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 9,
    paddingTop: 10,
  },
  userInfo2: {
    color: "#3D5C43",
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 9,
    paddingTop: 10,
  },
  buttonContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  button: {
    backgroundColor: "#3D5C43",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
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
  delete: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  text: {
    marginTop: 20,
    color: "#4D4B4B",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "left",
    marginTop: 20,
    marginLeft: 15,
  },
  hairlineWidth: {
    padding: 30,
  },
  descriptionText: {
    color: "#4D4B4B",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "left",
    paddingTop: 10,
    marginLeft: 8,
  },
  organiserName: {
    marginTop: 20,
    marginLeft: 10,
    color: "#4D4B4B",
    fontWeight: "700",
    fontSize: 14,
    textAlign: "left",
    marginTop: 15,
    marginLeft: 9,
  },
});
