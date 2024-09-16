import React from "react";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Map = () => {
  const navigation = useNavigation();
  const initialRegion = {
    latitude: 53.483959,
    longitude: -2.244644,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markers = [
    {
      eventTitle: "Planting Vegetables",
      date: "Monday 3rd October",
      location: { latitude: 53.481938, longitude: -2.216858 },
    },
    {
      eventTitle: "Food bank donations",
      date: "Monday 3rd October",
      location: { latitude: 53.434104, longitude: -2.14476 },
    },
    {
      eventTitle: "Eco ",
      date: "Monday 3rd October",
      location: { latitude: 53.441467, longitude: -2.37616 },
    },
    {
      eventTitle: "Clean the park",
      date: "Monday 3rd October",
      location: { latitude: 53.533391, longitude: -2.229218 },
    },
    {
      eventTitle: "Clean the mains streets",
      date: "Monday 3rd October",
      location: { latitude: 53.478401, longitude: -2.229218 },
    },
    {
      eventTitle: "Help the charity shops",
      date: "Monday 3rd October",
      location: { latitude: 53.482595, longitude: -2.243992 },
    },
    {
      eventTitle: "Food donations",
      date: "Monday 3rd October",
      location: { latitude: 53.473198, longitude: -2.248359 },
    },
    {
      eventTitle: "Homeless assistance",
      date: "Monday 3rd October",
      location: { latitude: 53.487222, longitude: -2.243714 },
    },
    {
      eventTitle: "Elderly people assistance",
      date: "Monday 3rd October",
      location: { latitude: 53.482728, longitude: -2.251031 },
    },
    {
      eventTitle: "Soup Kitchen Assistance",
      date: "Monday 3rd October",
      location: { latitude: 53.472585, longitude: -2.239218 },
    },
    {
      eventTitle: "Food bank",
      date: "Monday 3rd October",
      location: { latitude: 53.47528, longitude: -2.251449 },
    },
    {
      eventTitle: "Help the soup kitchen",
      date: "Monday 3rd October",
      location: { latitude: 53.480662, longitude: -2.237115 },
    },
    {
      eventTitle: "Elderly people assistance",
      date: "Monday 3rd October",
      location: { latitude: 53.476474, longitude: -2.23145 },
    },
    {
      eventTitle: "Elderly people assistance",
      date: "Monday 3rd October",
      location: { latitude: 53.47581, longitude: -2.222181 },
    },
  ];

  return (
    <>
      <View style={styles.body}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 53.483959,
            longitude: -2.244644,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markers.map((marker, index) => {
            return (
              <Marker
                key={index}
                coordinate={marker.location}
                pinColor={"#BC6C0B"}
              >
                <Callout
                  tooltip
                  onPress={() =>
                    navigation.navigate("More Info", {
                      id: "9L9Ywu3hs1to7Y6TdYtp",
                    })
                  }
                >
                  <View style={styles.bubble}>
                    <View>
                      <Text style={styles.bubbleText}>
                        Event: {marker.eventTitle}
                      </Text>
                      <Text style={styles.secondText}>Date: {marker.date}</Text>
                    </View>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  bubble: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#D17C14",
    backgroundColor: `#f8f8ff`,
    padding: 5,
    marginBottom: 5,
    width: 150,
  },
  bubbleText: {
    fontWeight: "bold",
    color: "#000000",
  },
  secondText: { color: "#000000" },
});

export default Map;
