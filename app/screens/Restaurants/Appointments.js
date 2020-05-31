import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";

export default function nuevaCita(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  //esto es para que se muestre el boton de + solo cuando esta registrado
  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/carpeta.png")}
        style={styles.logo}
        reziseMode="contain"
      />
      <Text style={styles.title}> Reserva tu cita! </Text>
      <Text style={styles.description}>
        Encuentra tu cita médica de acuerdo a tus tiempos y tu ubicación
      </Text>
      <View style={styles.lineStyle} />
      {user && <AddAppointmentButton navigation={navigation} />}
    </View>
  );
}

function AddAppointmentButton(props) {
  const { navigation } = props;
  return (
    <ActionButton
      buttonColor="#1e90ff"
      onPress={() => navigation.navigate("AddRestaurant")}
    />
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logo: {
    width: "30%",
    height: 140,
    marginTop: 50,
    margin: 35,
    marginLeft: 140
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  },
  description: {
    marginBottom: 20,
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
    textAlign: "left"
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "#E1E6ED",
    margin: 10
  }
});
