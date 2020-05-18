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
import { Icon } from "react-native-elements";

import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AsyncStorage } from "react-native";
import { withNavigation } from "react-navigation";
import { render } from "react-dom";
import { Alert } from "react-native";

const { width, height } = Dimensions.get("window");

export default class ListRestaurants extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: props.navigation,
      isLoading: false,
      refreshing: false,
      login: false,
      listaCitas: [],
      id: "",
      error: null,
    };
  }

  keydata = async () => {
    /* ID en el Asyncstorage */
    const id_s = await AsyncStorage.getItem("id").then((a) => {
      if (a != "") this.setState({ id: a });
    });

    /* Traigo la info  */

    if (this.state.id != null) {
      this.setState({ isLoading: true });
      const resp = await fetch(
        "https://backendapplication-1.azurewebsites.net/api/usuarios/{id}/citas?id=" +
          this.state.id
      );
      const json = await resp.json();

      this.setState({ listaCitas: json });
      this.setState({ isLoading: false, refreshing: false });
    } else {
      Alert.alert("Sesion", "No inicio sesion");
    }
  };

  actualizando = () => {
    this.setState({ refreshing: true }, () => {
      this.keydata();
    });
  };

  render() {
    return (
      <View style={{ backgroundColor: "white", padding: 20, height: "100%" }}>
        {this.state.id == null ? (
          <View style={{ backgroundColor: "white" }}>
            <TouchableOpacity>
              <Icon
                name="refresh"
                type="material-community"
                color="#1F90FC"
                onPress={() => {
                  this.keydata();
                }}
              />
            </TouchableOpacity>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>Actualizar</Text>
            </View>
          </View>
        ) : (
          <View style={{ backgroundColor: "white" }}>
            {this.state.listaCitas.length > 0 ? (
              <FlatList
                data={this.state.listaCitas}
                showsVerticalScrollIndicator={false}
                renderItem={(restaurant) => (
                  <Restaurant
                    restaurant={restaurant}
                    navigation={this.state.navigation}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0}
                refreshing={this.state.refreshing}
                onRefresh={this.actualizando}
              />
            ) : (
              <View>
                <TouchableOpacity>
                  <Icon
                    name="refresh"
                    type="material-community"
                    color="#1F90FC"
                    onPress={() => {
                      this.keydata();
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>Actualizar</Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { path, fecha, hora, url, name_clinic, id, phurl } = restaurant.item;
  let days = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];

  const { nombre, apellidoPaterno } = restaurant.item.medico;
  let date = new Date(fecha);

  const { clinica } = restaurant.item.ubicacion;
  var meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [imageRestaurant, setImageRestaurant] = useState(null);
  const fechasepara = fecha.split("-");
  /*   console.log(fecha);
   */ return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ marginBottom: 10, marginTop: 10 }}
      onPress={() => navigation.navigate("MiCitaSeleccionada", { restaurant })}
    >
      <View
        style={[styles.viewRestaurant, styles.shadow, styles.destinationInfo2]}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <View>
              <Text style={{ color: "gray" }}>
                {meses[parseInt(fechasepara[1] - 1, 10)]}
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 34, color: "#1C90FF" }}>
                {fechasepara[2]}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "gray" }}>
                {days[date.getUTCDay() - 1]}
              </Text>
            </View>
          </View>
          <View style={styles.lineVert}></View>
          <View style={{ width: "75%" }}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={{ fontWeight: "100" }}>Hora </Text>
                <Text style={styles.restaurantName}>{hora} </Text>
              </View>
              <View
                style={{
                  alignSelf: "flex-end",
                  /*                   backgroundColor: "green",
                   */ marginLeft: 40,
                }}
              >
                <Text style={{ fontWeight: "100" }}>Doctor </Text>
                <Text style={styles.restaurantName}>
                  {nombre + " " + apellidoPaterno}
                </Text>
              </View>
            </View>

            <View style={styles.lineHor}></View>
            <Text style={styles.restaurantAddress}>{clinica.telefono}</Text>
            <Text style={styles.restaurantAddress}>{clinica.nombre} </Text>
          </View>
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
  lineVert: {
    marginLeft: 5,
    marginRight: 7,

    borderWidth: 1,
    borderColor: "#E8E6E9",
    borderRadius: 1,
  },
  lineHor: {
    margin: 3,
    borderWidth: 1,
    borderColor: "#E8E6E9",
    width: "100%",
    borderRadius: 1,
  },
});
