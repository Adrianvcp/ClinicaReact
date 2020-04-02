import React, { useState, useRef } from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddRestaurantForm from "../../components/Restaurants/AddRestaurantForm";

export default function AddRestaurant() {
  return (
    <View style={{ backgroundColor: "white" }}>
      <AddRestaurantForm />
    </View>
  );
}
