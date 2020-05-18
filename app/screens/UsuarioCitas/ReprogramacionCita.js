import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { Label, Select } from "react-native-clean-form";
import { Ionicons } from "@expo/vector-icons";

import * as theme from "../../../themes/clinics";
const { width } = Dimensions.get("window");

/*----------- CUADRO DE DIALOGO - ACEPTAR O DECLINAR SOLICITUD -----------*/
import Dialog from "react-native-dialog";

import call from "react-native-phone-call";
import DatePicker from "react-native-datepicker";
import ListaReproClinicas from "../../components/Restaurants/ListaReproClinicas";
export default function CitaSeleccionada(props) {
  console.log("Repro");

  const [dialogVisible, setdialogVisible] = useState(false);
  const [dialogVisibleRepro, setdialogVisibleRepro] = useState(false);

  const { navigation } = props;
  console.log(navigation.state.params.navigation.state.params.restaurant);
  const { restaurant } = navigation.state.params.navigation.state.params;
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const data = [
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" },
  ];
  const scrollX = new Animated.Value(0);
  const seguroData = [
    { label: "Pacifico Seguro", value: "Pacifico Seguro" },
    { label: "Pacifico Seguro 2", value: "Pacifico Seguro 2" },
    { label: "Pacifico Seguro 3", value: "Pacifico Seguro 3" },
  ];
  const [esp, setesp] = useState("");
  const args = {
    number: "986141854", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
  };

  /* FUNCIONES ANULAR */
  const showDialog = () => {
    setdialogVisible(true);
  };
  const handleCancel = () => {
    setdialogVisible(false);
  };
  const handleOK = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
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

  return (
    <View style={styles.flex}>
      <View style={[styles.flex, styles.content]}>
        {/* INFO  -- DETALLE DE LAS CITAS*/}
        <View style={[styles.flex, styles.contentHeader]}>
          {/*           <Image
            style={[styles.avatar, styles.shadow]}
            source={{ uri: restaurant.item.phurl }}
          /> */}
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <View>
              <Text style={styles.title}>Oftalmologia</Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              borderWidth: 0.5,
              borderColor: "black",
              marginBottom: 10,
              marginTop: 10,
            }}
          ></View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <View>
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
                    customStyles={{
                      dateIcon: {
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 0,
                        marginRight: 10,
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      setDate(date);
                    }}
                  />
                </View>
              </View>
              {/* LISTA */}
              <View style={{ paddingLeft: -100 }}></View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginTop: -40 }}>
        <ListaReproClinicas
          info={Datito}
          navigation={navigation}
        ></ListaReproClinicas>
      </View>
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
    alignItems: "flex-start", // if you want to fill rows left to right
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
