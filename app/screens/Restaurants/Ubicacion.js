import React from "react";
import MapaScreen from "../map";

import { FlatList, StyleSheet, Text, View } from "react-native";

export default class Requests extends React.Component {
  state = {
    nameList: [],
    posts: {},
    loading: true
  };

  render() {
    return <MapaScreen></MapaScreen>;
  }
}
