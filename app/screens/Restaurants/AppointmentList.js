import React from "react";
import ListRestaurant from "../../components/Restaurants/ListRestaurants";

import { FlatList, StyleSheet, Text, View } from "react-native";

export default class Requests extends React.Component {
  state = {
    nameList: [],
    posts: {},
    loading: true
  };

  render() {
    return <ListRestaurant></ListRestaurant>;
  }
}
