import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import AppointmentScreen from "../screens/Restaurants/Appointments";
import AddAppointmentScreen from "../screens/Restaurants/AddAppointment";
import AppointmentListScreen from "../screens/Restaurants/AppointmentList";
import Ubicacion from "../screens/Restaurants/Ubicacion";
import CitaSeleccionada from "../screens/Restaurants/CitaSeleccionada";
//le aumento mi headers
import Header from "../navigations/Header";
import React from "react";

export const AppointmentScreenStacks = createStackNavigator({
  restaurants: {
    screen: AddAppointmentScreen,
    navigationOptions: ({ navigation }) => {
      //title: "Restaurantes"
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Reserva tu cita" />
        )
      };
    }
  },
  AddRestaurant: {
    screen: AddAppointmentScreen,
    navigationOptions: ({ navigation }) => {
      //title: "Restaurantes"
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Busca tu cita" />
        )
      };
    }
  },
  AppointmentList: {
    screen: AppointmentListScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Citas disponibles" />
        )
      };
    }
  },
  map: {
    screen: Ubicacion,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Buscar Ubicacion" />
        )
      };
    }
  },
  cita: {
    screen: CitaSeleccionada
  }
});

export default AppointmentScreenStacks;
