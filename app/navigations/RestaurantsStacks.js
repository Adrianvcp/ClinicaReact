import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import AppointmentScreen from "../screens/Restaurants/Appointments";
import AddAppointmentScreen from "../screens/Restaurants/AddAppointment";
import AppointmentListScreen from "../screens/Restaurants/AppointmentList";
import Ubicacion from "../screens/Restaurants/Ubicacion";
import CitaSeleccionada from "../screens/Restaurants/CitaSeleccionada";
import CitaConfirmadaDatos from "../screens/Restaurants/CitaConfirmadaDatos";
import ListRestaurants from "../components/Restaurants/ListRestaurants";
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
          <Header navigation={navigation} title="Reserva tu citaga" />
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
  listaClinicaCitasDisponibles: {
    screen: ListRestaurants,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header
            navigation={navigation}
            title="Buscar Ubicacion"
            iconsearch="check"
          />
        )
      };
    }
  },
  cita: {
    screen: CitaSeleccionada,
    navigationOptions: ({ navigation, alert }) => {
      return {
        headerTitle: () => (
          <Header
            navigation={navigation}
            title="Reservar cita"
            iconcheck="check"
          />
        )
      };
    }
  },
  informacioncitaconfirmada: {
    screen: CitaConfirmadaDatos,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Reservar cita" />
        )
      };
    }
  }
});

export default AppointmentScreenStacks;
