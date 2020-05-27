import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import AppointmentScreen from "../screens/Restaurants/Appointments";
import AddAppointmentScreen from "../screens/Restaurants/AddAppointment";

import ReprogramarForm from "../components/Restaurants/ReprogramarForm";
import AppointmentListScreen from "../screens/Restaurants/AppointmentList";
import Ubicacion from "../screens/Restaurants/Ubicacion";
import CitaSeleccionada from "../screens/Restaurants/CitaSeleccionada";
import CitaConfirmadaDatos from "../screens/Restaurants/CitaConfirmadaDatos";
import ListRestaurants from "../components/Restaurants/ListRestaurants";
//le aumento mi headers
import React, { useRef } from "react";
import { Text, Icon } from "react-native-elements";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import {
  ClassicHeader,
  GorgeousHeader,
} from "@freakycoder/react-native-header-view";
import { View, AsyncStorage } from "react-native";
import MenuListFiltro from "../utils/MenuListFiltro";
import MenuAdministrador from "../utils/MenuAdministrador";
import AddRestaurantFormADMIN from "../components/Restaurants/FormAdm";
import NotificationScreen from "../screens/Restaurants/Notificación";

export const AppointmentScreenStacks = createStackNavigator({
  restaurants: {
    screen: AddAppointmentScreen,
    navigationOptions: ({ navigation }) => {
      //title: "Restaurantes"
      return {
        headerTitle: "Buscar Cita",
        /*         headerRight: (
          <Icon
            containerStyle={{ margin: 5 }}
            name={"home"}
            type="material-community"
            underlayColor="transparent"
            color="black"
            size={20}
          />
        ), */
      };
    },
  },
  AdministradorForm: {
    screen: AddRestaurantFormADMIN,
  },
  AddRestaurant: {
    screen: AddAppointmentScreen,
    navigationOptions: ({ navigation }) => {
      //title: "Restaurantes"
      return {
        headerTitle: () => (
          <ClassicHeader />
          /*           <Header navigation={navigation} title="Busca tu cita" />
           */
        ),
      };
    },
  },
  AppointmentList: {
    screen: AppointmentListScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <ClassicHeader />
          /*           <Header navigation={navigation} title="Citas disponibles" />
           */
        ),
      };
    },
  },
  map: {
    screen: Ubicacion,
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
            onPress={() => navigation.navigate("restaurants")}
          />
        ),

        headerTitle: "Buscar Ubicacion",
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
            onPress={() => navigation.navigate("restaurants")}
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

  Notificacion: {
    screen: NotificationScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <ClassicHeader />
          /*           <Header navigation={navigation} title="Citas disponibles" />
           */
        ),
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
  informacioncitaconfirmada: {
    screen: CitaConfirmadaDatos,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <ClassicHeader />
          /*           <Header navigation={navigation} title="Reservar cita" />
           */
        ),
      };
    },
  },
  repro: {
    screen: ReprogramarForm,
    navigationOptions: ({ navigation }) => {
      //title: "Restaurantes"
      return {
        headerTitle: "Reprogramar Cita",
        /*         headerRight: (
          <Icon
            containerStyle={{ margin: 5 }}
            name={"home"}
            type="material-community"
            underlayColor="transparent"
            color="black"
            size={20}
          />
        ), */
      };
    },
  },
});

const idUse = async () => {
  console.log("nuevo");
  try {
    const jsonValue = await AsyncStorage.getItem("id");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

async function ga() {
  console.log("nuevo2");
  /* try {
    await AsyncStorage.getAllKeys().then(console.log); // nothing happens

    const jsonValue = await AsyncStorage.getAllKeys();
    const parsed = JSON.parse(jsonValue);
    console.log(jsonValue);
    alert(jsonValue);
    return jsonValue;
  } catch (e) {
    // error reading value
  } */
  try {
    const keys = await AsyncStorage.getAllKeys();

    const itemsArray = await AsyncStorage.multiGet(keys);

    const id = await AsyncStorage.getItem("id");

    let object = {};
    itemsArray.map((item) => {
      object[`${item[0]}`] = item[1];
    });
    return object;
  } catch (error) {
    console.log(error, "error");
  }
}

async function data() {
  let userId = "";
  try {
    userId = (await AsyncStorage.getItem("idUser")) || "none";
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return userId;
}

export default AppointmentScreenStacks;
