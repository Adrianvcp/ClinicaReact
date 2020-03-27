import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

import { View, Text } from "react-native";

export default function MyAccount() {
  const [login, setlogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      !user ? setlogin(false) : setlogin(true);
    });
  }, []);

  if (login == null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  return login ? <UserLogged /> : <UserGuest />;
}
