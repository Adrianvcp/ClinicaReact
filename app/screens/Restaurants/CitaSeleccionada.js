import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import SelectInfo from "../../components/ReservaCita/SelectInfo";
import RNPickerSelect from "react-native-picker-select";
import { Icon } from "react-native-elements";
import Dialog, {
  DialogContent,
  SlideAnimation
} from "react-native-popup-dialog";

export default function CitaSeleccionada(props) {
  const { navigation, alerta } = props;
  const { restaurant } = navigation.state.params;
  const data = [
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" }
  ];
  const [paciente, setpaciente] = useState("");

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

      <View style={styles.margenDetalle}>
        {/* ESPECIALIDAD */}
        {/* DETALLE CITA */}
        <View>
          <Text style={styles.restaurantName}> DETALLE DE LA CITA </Text>
          <Text style={styles.restaurantDescription}> Dia: FECHA </Text>
          <Text style={styles.restaurantAddress}>
            Horario: {restaurant.item.hora}
          </Text>
          <Text style={styles.restaurantAddress}>
            {restaurant.item.nombreDoctor}
          </Text>
          <Text style={styles.restaurantAddress}> {restaurant.item.path} </Text>
          {/* AGREGAR PACIENTE */}
          <Text style={styles.Titulo}> Paciente </Text>
          <RNPickerSelect
            placeholder={{
              label: "Seleccionar",
              value: null
            }}
            items={data}
            onValueChange={value => setpaciente(value)}
          />
          <View style={styles.linerstyle} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff"
  },
  collegeIconColumn: {
    flex: 2,
    justifyContent: "center"
  },
  linerstyle: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10,
    marginTop: -14,
    color: "#9CA6AF"
  },
  container: {
    marginBottom: 10,
    marginTop: -11
  },
  collegeContainer: {
    flex: 1
  },
  Titulo: {
    fontSize: 16,
    color: "#86939E",
    marginTop: 10,
    fontWeight: "bold"
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
  },
  collegeColumn: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left"
  },
  estructura: {
    flex: 1,
    marginTop: 15,
    backgroundColor: "#fff",
    marginRight: 40,
    marginLeft: 40,
    textAlign: "left"
  },
  veamos: { marginTop: -14 }
});
