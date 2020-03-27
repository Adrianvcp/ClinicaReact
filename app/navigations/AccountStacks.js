import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";
import GestFamiliarScreen from "../screens/Account/GestionFamiliar";
import ConfigScreen from "../components/Account/ConfigForm";
import AddPatientScreen from "../screens/Patients/AddPatient";

export const AccountScreenStack = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: () => ({
      title: "Mi cuenta"
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Login"
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: "Registro"
    })
  },
  GestFamiliar: {
    screen: GestFamiliarScreen,
    navigationOptions: () => ({
      title: "Gestión Familiar"
    })
  },
  Config: {
    screen: ConfigScreen,
    navigationOptions: () => ({
      title: "Configuración"
    })
  },
  AddPatient: {
    screen: AddPatientScreen,
    navigationOptions: () => ({
      title: "Agregar Familiar"
    })
  }
});

export default AccountScreenStack;
