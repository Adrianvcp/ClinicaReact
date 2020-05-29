import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Image } from "react-native-elements";
import React, { useState } from "react";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as clinics from "../../themes/clinics";
import base64 from "react-native-base64";

const { width, height } = Dimensions.get("window");

function districtData(texto) {
  const dato = texto;

  const arregloDeSubCadenas = dato.split(",", 1);
  const primera = arregloDeSubCadenas[0].split(" ", 1);
  return arregloDeSubCadenas[0].replace(primera, "").trim();
}

/* MOSTRAR DATOS PARA REPROGRAMAR CITA  */
function Restaurant(props) {
  const { restaurant, navigation, horaFilt, clinicFilt } = props;
  const { fecha, hora, id, medico, reserva } = restaurant.item;
  const { nombre, telefono, descripcion } = restaurant.item.ubicacion.clinica;
  const { img } = restaurant.item.ubicacion;
  const [imageRestaurant, setImageRestaurant] = useState(null);

  return (
    <View>
      {fecha == "2020-05-26" ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginBottom: 20, backgroundColor: "red" }}
          onPress={() => navigation.navigate("cita", { restaurant })}
        >
          <ImageBackground
            style={[styles.flex, styles.destination, styles.shadow]}
            imageStyle={{ borderRadius: clinics.sizes.radius }}
            source={{
              uri: base64.decode(img),
            }}
          >
            <View style={{ marginBottom: 50 }}>
              <View
                style={[
                  styles.row,
                  {
                    justifyContent: "space-between",
                  },
                ]}
              >
                <View style={{ flex: 0 }}>
                  <Image
                    source={{
                      uri: base64.decode(restaurant.item.medico.img),
                    }}
                    borderRadius={1000}
                    style={styles.avatar}
                  />
                </View>

                <View
                  style={[
                    styles.column,
                    { flex: 2, paddingHorizontal: clinics.sizes.padding / 2 },
                  ]}
                >
                  <Text
                    style={{
                      color: clinics.colors.white,
                      fontWeight: "bold",
                    }}
                  >
                    {medico.nombre}
                  </Text>
                  <Text
                    style={{
                      color: clinics.colors.white,
                      fontWeight: "bold",
                    }}
                  >
                    <Octicons
                      name="location"
                      size={clinics.sizes.font * 0.8}
                      color={clinics.colors.white}
                    />
                    <Text> {nombre}</Text>
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={styles.rating}>{id}</Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.row,
                styles.destinationInfo,
                styles.shadow,

                { paddingTop: -30 },
              ]}
            >
              <View
                style={{
                  marginTop: 5,
                  marginLeft: -25,
                  marginRight: 5,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 20, color: "green" }}>{hora}</Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "column",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: clinics.sizes.font * 1.05,
                      fontWeight: "500",
                      marginTop: 5,
                    }}
                  >
                    {fecha}
                  </Text>
                </View>
                <View
                  style={[
                    styles.row,
                    {
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    },
                  ]}
                >
                  <Text
                    onPress={() =>
                      navigation.navigate("cita", {
                        restaurant,
                      })
                    }
                    style={{ textAlign: "right" }}
                  >
                    Ver info
                  </Text>
                  <FontAwesome
                    onPress={() =>
                      navigation.navigate("cita", {
                        restaurant,
                      })
                    }
                    name="chevron-right"
                    size={clinics.sizes.font * 0.75}
                    color={clinics.colors.caption}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ) : (
        console.log("nop")
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  row: {
    flexDirection: "row",
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
  destinationInfo: {
    position: "absolute",
    borderRadius: clinics.sizes.radius,
    paddingHorizontal: clinics.sizes.padding,
    paddingVertical: clinics.sizes.padding / 2,
    bottom: 20,
    left:
      (width - clinics.sizes.padding * 7) / (Platform.OS === "ios" ? 3.2 : 3),
    backgroundColor: "white",
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
  selectInput: {
    /*     backgroundColor: "red", */
    marginLeft: width / 5,
    marginTop: 5,
    overflow: "hidden",
    height: "50%",
  },
  selectInputLarge: {
    width: "30%",
  },
  selectInputInner: {
    borderRadius: 4,
  },
});

//Maxima cantidad de caracteres
function maxCaracter(dato, max) {
  console.log("entro-------------");
  dato.length == max
    ? Alert.alert("Aviso", "Limite de digitos alcanzado")
    : console.log("todo bien,todo correcto");
}

function maxCaracter1(dato1, max1) {
  dato1.length == max1
    ? Alert.alert("Aviso", "Limite de digitos alcanzado")
    : console.log("todo bien,todo correcto");
}

function holi() {
  console.log("holi");
}

function getEdad(fnacimiento) {
  var fnacimiento_arr = String(fnacimiento).split("-");
  var fnacimiento_date = new Date(
    fnacimiento_arr[0],
    fnacimiento_arr[1] - 1,
    fnacimiento_arr[2]
  );
  var ageDifMs = Date.now() - fnacimiento_date.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = {
  Restaurant,
  districtData,
  maxCaracter,
  maxCaracter1,
  holi,
  getEdad,
};
