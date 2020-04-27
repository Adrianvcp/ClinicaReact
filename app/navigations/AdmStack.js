import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import AppointmentScreen from "../screens/Restaurants/Appointments";
import AddAppointmentScreen from "../screens/Restaurants/AddAppointment";
import AppointmentListScreen from "../screens/Restaurants/AppointmentList";
import Ubicacion from "../screens/Restaurants/Ubicacion";
import CitaSeleccionada from "../screens/Restaurants/CitaSeleccionada";
import CitaConfirmadaDatos from "../screens/Restaurants/CitaConfirmadaDatos";
import ListRestaurants from "../components/Restaurants/ListRestaurants";
//le aumento mi headers
import React, { useRef } from "react";
import { Icon } from "react-native-elements";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";

import { View } from "react-native";
import MenuListFiltro from "../utils/MenuListFiltro";
import MenuAdministrador from "../utils/MenuAdministrador";
import AddRestaurantFormADMIN from "../components/Restaurants/FormAdm";
/* configurarlo luego para administrar todas las listas reservadas */
import CitasReservadasTotales from "../screens/Administrador/CitasReservadas";
import MiCitaSeleccionada from "../screens/Administrador/CitaSeleccionada";
import DatosPerfil from "../screens/Patients/DatosPerfil";

export const AppointmentScreenStacks = createStackNavigator({
  citaReservadas: {
    screen: CitasReservadasTotales,
    navigationOptions: ({ navigation }) => {
      return {
        headerRight: (
          <View>
            <MenuAdministrador navigation={navigation} />
          </View>
        ),
        headerTitleAlign: "left",
        headerTitle: "Citas reservadas",
      };
    },
  },
  AdministradorForm: {
    screen: AddRestaurantFormADMIN,
  },
  PerfilPaciente: {
    screen: DatosPerfil,
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
            onPress={() => navigation.navigate("MiCitaSeleccionada")}
          />
        ),
        headerTitle: "Paciente",
        headerTitleAlign: "left",
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
            onPress={() => navigation.navigate("citaReservadas")}
          />
        ),
        headerTitle: "Mis Citas",
        headerTitleAlign: "left",
      };
    },
  },
  MiCuenta: {
    screen: AddRestaurantFormADMIN,
  },
});

export default AppointmentScreenStacks;
