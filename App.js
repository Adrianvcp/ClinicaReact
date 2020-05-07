import React, { useEffect } from "react";
import { AsyncStorage } from "react-native";
import Navigation from "./app/navigations/Navigation";
import NavigationAdmin from "./app/navigations/NavigationAdmin";
import { firebaseApp } from "./app/utils/FireBase";

const Admin = false;
function AdministradorStack(params) {
  /* VARIABLE GLOBAL ASYNCSTORAGE */
  useEffect(() => {
    console.log("ME EJECUTO ANTES DE TODO");
    /* luego hacer variable global de keyuser */
    const keyUser = async () => {
      try {
        await AsyncStorage.setItem("keyuser", "false");
        console.log("sda");
      } catch (error) {
        console.log("error");
      }
    };

    keyUser();
  });

  if (Admin) {
    return <NavigationAdmin />;
  } else {
    return <Navigation />;
  }
}

export default function App() {
  return AdministradorStack();
}
