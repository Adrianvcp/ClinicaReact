import React, { useRef } from "react";
import { StyleSheet, View, Image, Text, Dimensions, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import { ConfirmDialog } from "react-native-simple-dialogs";
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Header({ navigation, title, iconcheck, iconsearch }) {
  const ancho = Dimensions.get("window").width;
  const { as } = "";
  const alerta = true;
  const SearchHora = true;
  const SearchClinica = true;
  const confirmar = true;
  console.log(ancho);

  const menu = useRef();

  const hideMenu = () => {
    navigation.navigate("listaClinicaCitasDisponibles", {
      SearchHora,
    });
    menu.current.hide();
  };

  const hideMenuClinica = () => {
    navigation.navigate("listaClinicaCitasDisponibles", {
      SearchClinica,
    });
    menu.current.hide();
  };

  const showMenu = () => menu.current.show();

  return (
    <View style={styles.header}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {iconcheck ? (
        <View
          style={{
            flex: 1,
            padding: 180,
          }}
        >
          <TouchableOpacity>
            <Icon
              name={iconcheck}
              type="material-community"
              underlayColor="transparent"
              color="black"
              size={20}
              onPress={() =>
                navigation.navigate("cita", { navigation, confirmar })
              }
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}

      {iconsearch ? (
        <View
          style={{
            flex: 1,
            padding: 150,
          }}
        >
          <Menu
            ref={menu}
            button={
              <Icon
                name={iconsearch}
                type="material-community"
                underlayColor="transparent"
                color="black"
                size={20}
                onPress={showMenu}
              />
            }
          >
            <MenuItem disabled>Filtrar por...</MenuItem>
            <MenuItem onPress={hideMenu}>Hora</MenuItem>
            <MenuItem onPress={hideMenuClinica}>Clinica</MenuItem>
          </Menu>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
  },
});
