//le aumento mi headers
import Header from "../navigations/Header";
import { createStackNavigator, HeaderTitle } from "react-navigation-stack";

import React from "react";
import MisCitas from "../screens/UsuarioCitas/MisCitas";
import MiCitaSeleccionada from "../screens/UsuarioCitas/MiCitaSeleccionada";
import PerfilClinica from "../screens/Clinica/Perfil";
import ListRestaurants from "../components/Restaurants/ListRestaurants";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";

export const AppointmentScreenStacks = createStackNavigator({
  restaurants: {
    screen: MisCitas,
    navigationOptions: ({ navigation }) => {
      //title: "Restaurantes"
      return {
        headerTitle: () => <Header title="Mis Citas" />,
      };
    },
  },
  MiCitaSeleccionada: {
    screen: MiCitaSeleccionada,
    navigationOptions: ({ navigation }) => {
      //title: "Restaurantes"
      return {
        headerTitle: () => <Header title="Mi Cita Seleccionada" />,
      };
    },
  },
  PerfilClinica: {
    screen: PerfilClinica,
    navigationOptions: ({ navigation }) => {
      //title: "Restaurantes"
      return {
        headerTitle: () => <Header title="Clinica" />,
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
});

export default AppointmentScreenStacks;