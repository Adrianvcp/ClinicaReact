import React from "react";
import ListRestaurant from "../../components/Restaurants/ListRestaurants";

import { FlatList, StyleSheet, Text, View } from "react-native";

export default function AppointmentList(props) {
  const Data = require("../../utils/dat");
  const { navigation } = props;
  return (
    <ListRestaurant restaurants={Data} navigation={navigation}></ListRestaurant>
  );
}
