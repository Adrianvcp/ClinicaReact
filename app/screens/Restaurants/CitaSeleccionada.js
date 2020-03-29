import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import SelectInfo from "../../components/ReservaCita/SelectInfo";
export default function CitaSeleccionada(props) {
  const { navigation } = props;
  const { restaurant } = navigation.state.params;
  const data = [
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" }
  ];
  console.log(restaurant.item);

  return (
    <View style={styles.viewBody}>
      {/* HEADDER : LOGO Y DESCRIPCION */}
      <View>
        <Image
          source={require("../../../assets/img/carpeta.png")}
          style={styles.logo}
          reziseMode="contain"
        />
        <Text style={styles.description}>
          Reserva tu cita de acuerdo a la especialidad medica
        </Text>
      </View>
      <View style={styles.lineStyle} />

      {/* ESPECIALIDAD */}

      {/* DETALLE CITA */}
      <View style={styles.margenDetalle}>
        <Text style={styles.restaurantName}>DETALLE DE LA CITA</Text>
        <Text style={styles.restaurantDescription}>Dia: FECHA</Text>
        <Text style={styles.restaurantAddress}>
          Horario: {restaurant.item.hora}
        </Text>
        <Text style={styles.restaurantAddress}>
          {restaurant.item.nombreDoctor}
        </Text>
        <Text style={styles.restaurantAddress}>{restaurant.item.path}</Text>
      </View>

      {/* AGREGAR PACIENTE */}
    </View>
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
    marginTop: 20,
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
    color: "grey",
    marginBottom: 20,
    textAlign: "center",
    marginLeft: 80,
    marginRight: 80,
    textAlign: "center",
    marginTop: -30
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "#E1E6ED",
    marginLeft: 20,
    marginRight: 20
  },
  restaurantName: {
    fontWeight: "bold"
  },
  restaurantAddress: {
    paddingTop: 2,
    color: "grey"
  },
  restaurantDescription: {
    paddingTop: 10,
    color: "grey",
    width: 300
  },
  margenDetalle: {
    marginTop: 20,
    marginRight: 30,
    marginLeft: 30
  }
});
