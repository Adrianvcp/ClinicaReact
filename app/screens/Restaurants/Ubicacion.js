import React from "react";
import MapaScreen from "../map";
import MapView from "../../screens/Maps/MapView";
import { FlatList, StyleSheet, Text, View } from "react-native";

function Requests(props) {
  const { navigation } = props;
  return <MapView navigation={navigation}></MapView>;
}

export default Requests;
