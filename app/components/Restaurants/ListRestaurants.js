import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Image } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

export default function ListRestaurants(props) {
  const { restaurants, navigation } = props;

  return (
    <View>
      {restaurants ? (
        <View>
          <Text>Hola</Text>
          <FlatList
            data={restaurants}
            renderItem={restaurant => (
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

  const { path, nombreDoctor, hora, url, name_clinic } = restaurant.item;
  const [imageRestaurant, setImageRestaurant] = useState(null);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("cita", { restaurant })}
    >
      <View style={styles.viewRestaurant}>
        <View style={styles.viewRestaurantImage}>
          <Image
            resizeMode="cover"
            source={{ uri: url }}
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
  loadingRestaurants: {
    marginTop: 20,
    alignItems: "center"
  },
  viewRestaurant: {
    flexDirection: "row",
    margin: 10
  },
  viewRestaurantImage: {
    marginRight: 15
  },
  imageRestaurant: {
    width: 80,
    height: 80
  },
  restaurantName: {
    fontWeight: "bold"
  },
  restaurantAddress: {
    paddingTop: 2,
    color: "grey"
  },
  restaurantDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300
  }
});
