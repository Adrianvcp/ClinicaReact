import React, { Component, useRef } from "react";
import { Icon } from "react-native-elements";
import { View, Text, StyleSheet } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";

export default function MenuAdministrador(props) {
  const { navigation } = props;
  const SearchHora = true;
  const SearchClinica = true;

  const menu = useRef();

  const hideMenu = () => {
    navigation.navigate("AdministradorForm", { SearchHora: true });
    menu.current.hide();
  };

  const hideMenuClinica = () => {
    navigation.navigate("listaClinicaCitasDisponibles", {
      SearchHora: false,
      SearchClinica: true,
    });
    menu.current.hide();
  };

  const showMenu = () => menu.current.show();

  return (
    <Menu
      ref={menu}
      button={
        <Icon
          containerStyle={{ margin: 5 }}
          name={"dots-vertical"}
          type="material-community"
          underlayColor="transparent"
          color="black"
          size={20}
          onPress={showMenu}
        />
      }
    >
      <MenuItem onPress={hideMenu}>FILTROS DE BUSQUEDA</MenuItem>
    </Menu>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
