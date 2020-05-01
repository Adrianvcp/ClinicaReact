import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";
import GestFamiliarScreen from "../screens/Account/GestionFamiliar";
import ConfigScreen from "../components/Account/ConfigForm";
import AddPatientScreen from "../screens/Patients/AddPatient";
import ForgotPassword from "../screens/Account/ForgotPassword";
import DatosPersonales from "../screens/Account/DatosPersonales";
import InformacionUsuario from "../screens/Account/InformacionUsuario";
import ModificarDatos from "../screens/Account/ModificarDatos";
import AgregarPaciente from "../screens/Patients/AgregarPaciente";

import UserLogged from "../screens/Account/UserLogged";
import { Icon } from "react-native-elements";
import React from "react";

export const AccountScreenStack = createStackNavigator({
  /* REVISAR EL "MYACCOUNT " */
  MyAccount: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Login",
      };
    },
  },
  Welcome: {
    screen: MyAccountScreen,
    navigationOptions: () => {
      return {
        headerShown: false,
      };
    },
  },
  /* ACA MENOS  */
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "LoginXS",
        headerTitleAlign: "left",
      };
    },
  },
  Forgot: {
    screen: ForgotPassword,
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
            onPress={() => navigation.navigate("MyAccount")}
          />
        ),
        headerTitle: "Reestablecer contraseña",
        headerTitleAlign: "left",
      };
    },
  },
  Register: {
    screen: RegisterScreen,
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
            onPress={() => navigation.navigate("MyAccount")}
          />
        ),
        headerTitle: "Registrate",
        headerTitleAlign: "left",
      };
    },
  },
  Datos: {
    screen: DatosPersonales,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: false,
        /*         headerLeft: (
          <Icon
            containerStyle={{ margin: 5 }}
            name={"chevron-left"}
            type="material-community"
            underlayColor="transparent"
            color="black"
            size={30}
            onPress={() => navigation.navigate("MyAccount")}
          />
        ), */
        headerTitle: "Añadir datos personales",
        headerTitleAlign: "left",
      };
    },
  },
  UserLoggued: {
    screen: UserLogged,
    navigationOptions: ({ navigation }) => {
      return {
        /*         headerLeft: (
          <Icon
            containerStyle={{ margin: 5 }}
            name={"chevron-left"}
            type="material-community"
            underlayColor="transparent"
            color="black"
            size={30}
            onPress={() => navigation.navigate("")}
          />
        ), */
        headerLeft: false,
        headerTitle: "Mi cuenta",
        headerTitleAlign: "left",
      };
    },
  },
  InfoUser: {
    screen: InformacionUsuario,
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
            onPress={() => navigation.navigate("UserLoggued")}
          />
        ),
        headerTitle: "Datos personales",
        headerTitleAlign: "left",
      };
    },
  },
  GestFamiliar: {
    screen: GestFamiliarScreen,
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
            onPress={() => navigation.navigate("UserLoggued")}
          />
        ),
        headerTitle: "Gestion Familiar",
        headerTitleAlign: "left",
      };
    },
  },
  Mofificar: {
    screen: ModificarDatos,
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
            onPress={() => navigation.navigate("GestFamiliar")}
          />
        ),
        headerTitle: "Modificar datos personales",
      };
    },
  },
  Config: {
    screen: ConfigScreen,
    navigationOptions: () => ({
      title: "Configuración",
    }),
  },
  AddPatient: {
    screen: AddPatientScreen,
    navigationOptions: () => ({
      title: "Agregar Familiar",
    }),
  },
  PacienteAgregar: {
    screen: AgregarPaciente,
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
            onPress={() => navigation.navigate("UserLoggued")}
          />
        ),
        headerTitle: "Agregar paciente",
        headerTitleAlign: "left",
      };
    },
  },
});

export default AccountScreenStack;
