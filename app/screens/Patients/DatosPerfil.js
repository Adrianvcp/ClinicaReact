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

export default function CitaSeleccionada(props) {
  console.log(props);
  const [dialogVisible, setdialogVisible] = useState(false);
  const [dialogVisibleRepro, setdialogVisibleRepro] = useState(false);

  const { navigation } = props;
  const { restaurant } = navigation.state.params;
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
    navigation.navigate("Repro", { navigation });
    setdialogVisibleRepro(false);
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        {/* INFO  -- DETALLE DE LAS CITAS*/}

        <View style={[styles.contentHeader]}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              style={[styles.avatar, styles.shadow, { marginLeft: "25%" }]}
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View>
              <View>
                {/* DETALLE PACIENTE */}
                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: 15,
                    marginBottom: 5,
                    color: "grey",
                  }}
                >
                  DETALLE DE PACIENTE
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 5 }}>
                  Nombres: Cesar
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 5 }}>
                  Apellidos: Castro Benavides
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 5 }}>
                  DNI:12345678
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 5 }}>
                  Fecha de nacimento: 13/04/20
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 5 }}>
                  Edad: 22
                </Text>

                <Text style={{ fontWeight: "100", marginTop: 5 }}>
                  Telefono: 986141854
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 5 }}>
                  correo: c.castro18@gmail.com
                </Text>
              </View>
            </View>
          </View>
        </View>
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
    backgroundColor: theme.colors.active,
    borderTopLeftRadius: theme.sizes.border,
    borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    backgroundColor: "transparent",
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
  },
  avatar: {
    right: theme.sizes.margin,
    width: theme.sizes.padding * 4,
    height: theme.sizes.padding * 4,
    borderRadius: theme.sizes.padding * 3,
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
