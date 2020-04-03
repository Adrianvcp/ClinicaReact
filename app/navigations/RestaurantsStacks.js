import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import AppointmentScreen from "../screens/Restaurants/Appointments";
import AddAppointmentScreen from "../screens/Restaurants/AddAppointment";
import AppointmentListScreen from "../screens/Restaurants/AppointmentList";
import Ubicacion from "../screens/Restaurants/Ubicacion";
import CitaSeleccionada from "../screens/Restaurants/CitaSeleccionada";
import CitaConfirmadaDatos from "../screens/Restaurants/CitaConfirmadaDatos";

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
          <Header
            navigation={navigation}
            title="Citas disponibles"
            icon="check"
          />
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
    screen: CitaSeleccionada,
    navigationOptions: ({ navigation, alert }) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Reservar cita" icon="check" />
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
