import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import LoginBienvenida from "./LoginBienvenida";

import { View, Text } from "react-native";
/* VARIABLE PARA EL PRIMER LOGIN */
const viewWelcome = true;

export default function MyAccount(props) {
  const id = props.navigation.state.params.user;
  const [login, setlogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setlogin(false) : setlogin(true);
    });
  }, []);

  if (login == null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }
  /*   return login ? Logeo() : <UserGuest />;
   */
  return Logeo();
}

/* CONDICIONAL PARA PRIMER LOGIN */

function Logeo(props) {
  return viewWelcome ? <LoginBienvenida /> : <UserLogged />;
}
