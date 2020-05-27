//le aumento mi headers
import { createStackNavigator, HeaderTitle } from "react-navigation-stack";

import React from "react";
import MisCitas from "../screens/UsuarioCitas/MisCitas";
import MiCitaSeleccionada from "../screens/UsuarioCitas/MiCitaSeleccionada";
import PerfilClinica from "../screens/Clinica/Perfil";
import ReprogramarForm from "../components/Restaurants/ReprogramarForm";

import ListRestaurants from "../components/Restaurants/ListRestaurants";
import CitaSeleccionada from "../screens/Restaurants/CitaSeleccionada";

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
        /* headerRight: (
          <Icon
            containerStyle={{ marginRight: 20 }}
            name="refresh"
            type="material-community"
            color="#1F90FC"
            onPress={() => {
              navigation.navigate("restaurants", { actualizar: true });
            }}
          />
        ) */
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
        headerLeft: (
          <Icon
            containerStyle={{ margin: 5 }}
            name={"chevron-left"}
            type="material-community"
            underlayColor="transparent"
            color="black"
            size={30}
            onPress={() => navigation.navigate("Repro")}
          />
        ),
        /*  headerRight: (
          <View>
      <MenuListFiltro navigation={navigation} />
           <MenuAdministrador navigation={navigation} /> 
          </View> ),*/

        headerTitleAlign: "left",
        headerTitle: "Citas disponibles",
      };
    },
  },
  cita: {
    screen: CitaSeleccionada,
    navigationOptions: ({ navigation, alert }) => {
      return {
        headerLeft: (
          <Icon
            containerStyle={{ margin: 5 }}
            name={"chevron-left"}
            type="material-community"
            underlayColor="transparent"
            color="black"
            size={30}
            onPress={() => navigation.navigate("listaClinicaCitasDisponibles")}
          />
        ),
        headerRight: (
          <Icon
            containerStyle={{
              marginRight: 20,
              backgroundColor: "red",
              height: "100%",
              justifyContent: "center",
            }}
            name={"check"}
            type="material-community"
            underlayColor="transparent"
            color="black"
            size={30}
            onPress={() => {
              /*                 cambiarDato();
            console.log("Dato a ");
            console.log(confirmar); */
              navigation.navigate("cita", {
                confirmar: true,
              });
            }}
          />
        ),
        headerTitleAlign: "left",
        headerTitle: "Reservar cita",
      };
    },
  },
  Repro: {
    screen: ReprogramarForm,
    navigationOptions: ({ navigation }) => {
      //title: "Restaurantes"
      return {
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
        headerTitle: "Reprogramar Cita",
        headerTitleAlign: "left",
      };
    },
  },
});

export default AppointmentScreenStacks;
