import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
  ImageBackground,
  Alert,
} from "react-native";

import * as theme from "../../../themes/clinics";

const { width } = Dimensions.get("window");

/*----------- CUADRO DE DIALOGO - ACEPTAR O DECLINAR SOLICITUD -----------*/
import Dialog from "react-native-dialog";

import DatePicker from "react-native-datepicker";
import ListaReproClinicas from "../../components/Restaurants/ListaReproClinicas";
import base64 from "react-native-base64";
import Octicons from "react-native-vector-icons/Octicons";
import { Image, Icon } from "react-native-elements";

import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function CitaSeleccionada(props) {
  console.log("-----------------------Repro------------------");

  const [dialogVisible, setdialogVisible] = useState(false);
  const [dialogVisibleRepro, setdialogVisibleRepro] = useState(false);
  const { width, height } = Dimensions.get("window");
  const [data, setData] = useState([]);
  const { navigation } = props;
  console.log("PROPS: ");

  const { restaurant } = navigation.state.params.navigation.state.params;
  console.log(restaurant.item.fecha.split("-"));
  const fechaarreglo = restaurant.item.fecha.split("-");
  const [date, setDate] = useState(
    new Date(fechaarreglo[0], fechaarreglo[1] - 1, fechaarreglo[2])
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [distritoVar, setdistritoVar] = useState(
    restaurant.item.ubicacion.distrito
  );
  var distritoSinCambiar = restaurant.item.ubicacion.distrito;
  const [esp, setesp] = useState("");

  /* FUNCIONES ANULAR */
  const showDialog = () => {
    setdialogVisible(true);
  };
  const handleCancel = () => {
    setdialogVisible(false);
  };
  const handleOK = () => {
    setdialogVisible(false);
    navigation.navigate("restaurants");
  };
  /* FUNCIONES REPROGRAMAR */
  const showDialogRepro = () => {
    setdialogVisibleRepro(true);
  };
  const handleCancelRepro = () => {
    setdialogVisibleRepro(false);
  };
  const handleOKRepro = () => {
    navigation.navigate("listaClinicaCitasDisponibles");
    setdialogVisibleRepro(false);
  };
  const Datito = require("../../utils/dat");

  useEffect(() => {
    fetch("https://backendapplication-1.azurewebsites.net/api/citas/{reserva}")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.flex}>
      <View style={[styles.flex, styles.content]}>
        {/* INFO  -- DETALLE DE LAS CITAS*/}
        <View style={[styles.flex, styles.contentHeader]}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View>
                {/* MODIFICAR DATOS DE CITA */}

                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: 15,
                    marginBottom: 5,
                    color: "grey",
                  }}
                >
                  MODIFICAR CITA
                </Text>
                <View style={{ flex: 1 }}></View>
                <View>
                  <Text style={{ fontWeight: "100" }}>Fecha:</Text>

                  <DatePicker
                    style={{ width: 100 }}
                    date={date}
                    mode={mode}
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2020-02-02"
                    maxDate="2020-06-06"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    containerStyle={""}
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        borderWidth: 0,
                        marginLeft: 0,
                        marginRight: 10,
                      },
                    }}
                    onDateChange={(date) => {
                      setDate(date);
                    }}
                  />
                </View>
              </View>
              <View>
                <View style={{ flex: 1 }}></View>
                <View>
                  <Text style={{ fontWeight: "100" }}>Ubicacion:</Text>

                  <TextInput
                    style={{ height: 40, fontSize: 14 }}
                    onChangeText={(text) => setdistritoVar(text)}
                    placeholder={distritoSinCambiar}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginTop: -40 }}>
        <View>
          <FlatList
            style={{ overflow: "hidden", height: height + 50, marginTop: 15 }}
            showsVerticalScrollIndicator={true}
            decelerationRate={0}
            renderItem={(restaurant) => (
              <Restaurant
                restaurant={restaurant}
                navigation={navigation}
                horaFilt={date}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0}
          />
        </View>
      </View>
    </View>
  );
}

function Restaurant(props) {
  console.log("-----------------");
  console.log(props);
  const { restaurant, navigation, horaFilt, clinicFilt } = props;
  const { fecha, hora, id, medico, reserva } = restaurant.item;
  const { nombre, telefono, descripcion } = restaurant.item.ubicacion.clinica;
  console.log(fecha);
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
            imageStyle={{ borderRadius: theme.sizes.radius }}
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
                    { flex: 2, paddingHorizontal: theme.sizes.padding / 2 },
                  ]}
                >
                  <Text
                    style={{
                      color: theme.colors.white,
                      fontWeight: "bold",
                    }}
                  >
                    {medico.nombre}
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.white,
                      fontWeight: "bold",
                    }}
                  >
                    <Octicons
                      name="location"
                      size={theme.sizes.font * 0.8}
                      color={theme.colors.white}
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
                      fontSize: theme.sizes.font * 1.05,
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
                    size={theme.sizes.font * 0.75}
                    color={theme.colors.caption}
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
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  def: {
    backgroundColor: "red",
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  header: {
    // backgroundColor: 'transparent',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    // backgroundColor: theme.colors.active,
    // borderTopLeftRadius: theme.sizes.border,
    // borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    backgroundColor: "transparent",
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    marginTop: -theme.sizes.padding / 2,
  },
  avatar: {
    position: "absolute",
    top: theme.sizes.padding,
    right: theme.sizes.margin,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  dotsContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 36,
    right: 0,
    left: 0,
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
  },
  title: {
    fontSize: theme.sizes.font * 2,
    fontWeight: "bold",
    width: width / 2,
  },
  description: {
    fontSize: theme.sizes.font * 1.2,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.caption,
  },
});
