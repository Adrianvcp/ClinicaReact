import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import LoginBienvenida from "./LoginBienvenida";
import { View, Text } from "react-native";
/* VARIABLE PARA EL PRIMER LOGIN */
var jsonData;

export default function MyAccount(props) {
  console.log(props.navigation.state.params);

  const [viewWelcome, setviewWelcome] = useState(false);

  const idVar = props.navigation.state.params.user;
  const [login, setlogin] = useState(null);
  const [data, setdata] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setlogin(false) : setlogin(true);
    });
  }, []);

  console.log("DATA");

  /*   for (let i = 0; i < data.length; i++) {
    console.log(data[i].usuario);
    if (data[i].usuario.id == idVar) {
      console.log("encontrado");
      setviewWelcome(true);
    }
  } */

  if (login == null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  /*   ep_primeraVez(idVar);
  console.log("Dato valor:");
  console.log(viewWelcome); */
  return Logeo(true);
}

function Logeo(id) {
  console.log("asdasd");
  return id ? <UserLogged /> : <LoginBienvenida />;
}
