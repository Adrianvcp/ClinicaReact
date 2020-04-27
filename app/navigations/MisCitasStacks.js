//le aumento mi headers
import Header from "../navigations/Header";
import { createStackNavigator, HeaderTitle } from "react-navigation-stack";

import React from "react";
import MisCitas from "../screens/UsuarioCitas/MisCitas";
import MiCitaSeleccionada from "../screens/UsuarioCitas/MiCitaSeleccionada";
import PerfilClinica from "../screens/Clinica/Perfil";
import ListRestaurants from "../components/Restaurants/ListRestaurants";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import ReprogramacionCita from "../screens/UsuarioCitas/ReprogramacionCita";
import { Icon } from "react-native-elements";
import { Text, View, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const AppointmentScreenStacks = createStackNavigator({
  restaurants: {
    screen: MisCitas,
    navigationOptions: ({ navigation }) => {
      //title: "Restaurantes"
      return {
        headerTitle: "Mis Citas",
      };
    },
  },
  MiCitaSeleccionada: {
    screen: MiCitaSeleccionada,
    navigationOptions: ({ navigation }) => {
      //title: "Restaurantes"
      return {
        headerLeft: (
          <Icon
            containerStyle={{ margin: 5 }}
            name={"chevron-left"}
            type="material-community"
            underlayColor="transparent"
            color="black"
            size={30}
            onPress={() => navigation.navigate("restaurants")}
          />
        ),
        headerTitle: "Mis Citas",
        headerTitleAlign: "left",
      };
    },
  },
  PerfilClinica: {
    screen: PerfilClinica,
    navigationOptions: ({ navigation }) => {
      //title: "Restaurantes"
      return {
        headerTitle: "Clinica",
        headerTitleAlign: "left",
        headerLeft: (
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <Icon
              containerStyle={{ margin: 5 }}
              name={"chevron-left"}
              type="material-community"
              underlayColor="transparent"
              color="black"
              size={30}
              onPress={() => navigation.navigate("MiCitaSeleccionada")}
            />
          </View>
        ),
        /*         headerTitle: "Clinica",
         */
      };
    },
  },
  listaClinicaCitasDisponibles: {
    screen: ListRestaurants,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header
            navigation={navigation}
            title="Buscar Ubicacion"
            iconsearch="dots-vertical"
          />
        ),
      };
    },
  },
  Repro: {
    screen: ReprogramacionCita,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Buscar Ubicacion" />
        ),
      };
    },
  },
});

export default AppointmentScreenStacks;
