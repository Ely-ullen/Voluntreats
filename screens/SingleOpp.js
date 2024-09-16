import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { db } from "../firebase";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../src/contexts/UserContext";
import ShareTab from "../navigation/ShareTab";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/AntDesign";
import {
  collection,
  getDoc,
  onSnapshot,
  query,
  snapshotEqual,
  where,
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const SingleOpp = ({ route }) => {
  const [eventId, setEventId] = useState(route.params.id);
  const navigation = useNavigation();
  const { loggedInUser } = useContext(UserContext);
  const [userId, setUserId] = useState([]);

  const [event, setEvent] = useState({});

  const getEmailFromUser = async () => {
    let orgEmail = await loggedInUser;
    return orgEmail;
  };

  const eventsCol = async () => {
    const docRef = doc(db, "events", eventId);
    const docSnap = await getDoc(docRef);
    return docSnap;
  };

  useEffect(() => {
    eventsCol().then((docSnap) => {
      setEvent(docSnap.data());
    });
    getEmailFromUser().then((user) => {
      console.log("herererer", user);
      setUserId();
    });
  }, []);

  const handleSignUp = async () => {
    const VolNumRef = doc(db, "events", eventId);
    const Volunteer = doc(db, "Volunteers", loggedInUser.docId);

    updateDoc(VolNumRef, {
      number_of_vols: increment(-1),
    });
    updateDoc(Volunteer, {
      events: arrayUnion(VolNumRef),
    });
    updateDoc(VolNumRef, {
      users: arrayUnion(loggedInUser),
    });
  };

  const sendToSignUpPage = () => {
    navigation.navigate("Sign Up");
    // newVols = number_of_vols"
    handleSignUp();
  };

  return (
    <ScrollView key={eventId}>
      <View style={styles.oppsContainer}>
        <Image
          source={{ uri: event.image }}
          style={{ width: 450, height: 250 }}
        />
        <Text style={styles.oppsText1}>{event.event_title}</Text>
        <Text style={styles.oppsText2}>{event.company}</Text>
        <View
          style={{
            borderBottomColor: "#646464",
            paddingBottom: 15,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <Text style={styles.oppsText2}>{event.location}</Text>
        </View>
        <Text style={styles.descriptionText}>Description</Text>
        <Text style={styles.oppsTextDescription}>{event.description}</Text>

        <Text style={styles.organiserName}>Organiser: Angela Mathews</Text>

        <Text style={styles.text}>
          <Ionicons name="calendar" size={22} />
          {event.date_time}
        </Text>
        <Text style={styles.text}>
          <Ionicons name="team" size={22} />
          Number of volunteers needed: {event.number_of_vols}
        </Text>
        <Text style={styles.text}>
          <Ionicons name="gift" size={22} /> Treat: {event.treats}
        </Text>

        <TouchableOpacity
          onPress={sendToSignUpPage}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.signUp}> Sign Up</Text>
        </TouchableOpacity>
        <ShareTab />
      </View>
    </ScrollView>
  );
};

export default SingleOpp;

const styles = StyleSheet.create({
  oppsContainer: {
    paddingBottom: 30,
    paddingTop: 30,
    width: "100%",
    flexDirection: "column",
    textAlign: "left",
  },
  oppsText1: {
    color: "#4D4B4B",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "left",
    marginLeft: 8,
    marginTop: 20,
  },
  oppsText2: {
    color: "#4D4B4B",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "left",
    paddingBottom: 5,
    marginLeft: 8,
    lineHeight: 20,
  },

  oppsTextDescription: {
    color: "#3D5C43",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "left",
    marginTop: 18,
    marginLeft: 9,
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#3D5C43",
    width: "100%",
    padding: 15,
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
  text: {
    marginTop: 20,
    color: "#4D4B4B",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "left",
    marginTop: 20,
    marginLeft: 9,
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
    fontSize: 16,
    textAlign: "left",
    marginTop: 15,
    marginLeft: 9,
  },
});
