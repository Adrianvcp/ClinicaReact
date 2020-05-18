import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Image } from "react-native-elements";
import * as clinics from "../../../themes/clinics";
import {
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";

import { useState, useRef } from "react";

import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

export default function ListRestaurants(props) {
  const restaurants = require("../../utils/dat");

  console.log("Webada");
  const { navigation } = props;
  const [esp, setesp] = useState("");

  return (
    <View style={{ backgroundColor: "white" }}>
      {/* LISTA DE CLINICAS */}
      {restaurants ? (
        <View>
          <FlatList
            data={restaurants}
            renderItem={(restaurant) => (
              <Restaurant restaurant={restaurant} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0}
          />
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" />
          <Text>Cargando resturants</Text>
        </View>
      )}
    </View>
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;

  const {
    path,
    nombreDoctor,
    hora,
    url,
    name_clinic,
    id,
    phurl,
  } = restaurant.item;
  const [imageRestaurant, setImageRestaurant] = useState(null);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ marginBottom: 10, marginTop: 10 }}
      onPress={() => navigation.navigate("MiCitaSeleccionada", { restaurant })}
    >
      <View
        style={[
          styles.viewRestaurant,
          styles.shadow,
          styles.destinationInfo2,
          /* { backgroundColor: "yellow" } */
          ,
        ]}
      >
        <View style={styles.viewRestaurantImage}>
          <Image
            resizeMode="cover"
            source={{ uri: url }}
            borderRadius={50}
            style={styles.imageRestaurant}
            PlaceholderContent={<ActivityIndicator color="fff" />}
          />
        </View>
        <View>
          <Text style={styles.restaurantName}>{hora} hrs - 13 Abril</Text>
          <Text style={styles.restaurantAddress}>{nombreDoctor}</Text>
          <Text style={styles.restaurantAddress}>{path}</Text>
          <Text style={styles.restaurantAddress}>{name_clinic} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: "column",
  },
  viewRestaurant: {
    flexDirection: "row",
    borderRadius: 50,
    borderColor: "green",
    backgroundColor: "white",
  },
  viewRestaurantImage: {
    marginRight: 15,
  },
  imageRestaurant: {
    width: 80,
    height: 80,
  },
  restaurantName: {
    fontWeight: "bold",
  },
  restaurantAddress: {
    paddingTop: 2,
    color: "grey",
  },
  restaurantDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  row: {
    flexDirection: "row",
  },
  header: {
    backgroundColor: clinics.colors.white,
    paddingHorizontal: clinics.sizes.padding,
    paddingTop: clinics.sizes.padding * 1.33,
    paddingBottom: clinics.sizes.padding * 0.66,
    justifyContent: "space-between",
    alignItems: "center",
  },
  articles: {},
  destinations: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  destination: {
    width: width - clinics.sizes.padding,
    height: width * 0.5,
    marginHorizontal: 20,
    paddingHorizontal: clinics.sizes.padding,
    paddingVertical: clinics.sizes.padding * 0.66,
    borderRadius: clinics.sizes.radius,
  },
  destinationInfo2: {
    borderRadius: clinics.sizes.radius,
    paddingHorizontal: clinics.sizes.padding,
    paddingVertical: clinics.sizes.padding / 2,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: clinics.colors.white,
    /*     width: width - clinics.sizes.padding * 1,
     */
    /*     width: width - (width - clinics.sizes.padding * 4) / 25,
     */

    /*     bottom: 5,
    top: 20,
    width: width - (width - clinics.sizes.padding * 4) / 25,

    marginLeft: (width - clinics.sizes.padding * 4) / 25,
    marginRight: (width - clinics.sizes.padding * 4) / 25, */
  },
  destinationInfo: {
    position: "absolute",
    borderRadius: clinics.sizes.radius,
    paddingHorizontal: clinics.sizes.padding,
    paddingVertical: clinics.sizes.padding / 2,
    bottom: 20,
    left:
      (width - clinics.sizes.padding * 4) / (Platform.OS === "ios" ? 3.2 : 3),
    backgroundColor: clinics.colors.white,
    width: width - clinics.sizes.padding * 4,
  },
  recommended: {},
  recommendedHeader: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: clinics.sizes.padding,
  },
  recommendedList: {},
  recommendation: {
    width: (width - clinics.sizes.padding * 2) / 2,
    marginHorizontal: 8,
    backgroundColor: clinics.colors.white,
    overflow: "hidden",
    borderRadius: clinics.sizes.radius,
    marginVertical: clinics.sizes.margin * 0.5,
  },
  recommendationHeader: {
    overflow: "hidden",
    borderTopRightRadius: clinics.sizes.radius,
    borderTopLeftRadius: clinics.sizes.radius,
  },
  recommendationOptions: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: clinics.sizes.padding / 2,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    fontSize: clinics.sizes.font * 1.25,
    color: clinics.colors.white,
  },
  recommendationImage: {
    width: (width - clinics.sizes.padding * 2) / 2,
    height: (width - clinics.sizes.padding * 2) / 2,
  },
  avatar: {
    width: clinics.sizes.padding,
    height: clinics.sizes.padding,
    borderRadius: clinics.sizes.padding / 2,
  },
  rating: {
    fontSize: clinics.sizes.font * 2,
    color: clinics.colors.white,
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: clinics.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 5,
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: clinics.colors.gray,
    borderColor: "transparent",
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: clinics.colors.active,
  },
});
