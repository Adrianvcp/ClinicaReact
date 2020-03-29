import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Platform } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { withNavigation } from "react-navigation";
import SelectInfo from "../ReservaCita/SelectInfo";
import map from "../../screens/map";

function AddRestaurantForm(props) {
  const { navigation } = props;
  const data = [
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" }
  ];
  const seguroData = [
    { label: "Pacifico Seguro", value: "Pacifico Seguro" },
    { label: "Pacifico Seguro 2", value: "Pacifico Seguro 2" },
    { label: "Pacifico Seguro 3", value: "Pacifico Seguro 3" }
  ];
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/foto.jpg")}
        style={styles.logo}
        reziseMode="contain"
      />

      <Text style={styles.title}>Encuentra tu cita!</Text>

      <Text style={styles.description}>
        Nuestro buscador detallado te facilitará la forma de buscar una cita
        médica
      </Text>

      <View style={styles.estructura}>
        {/* LISTA ESPECIALIDAD */}
        <SelectInfo
          titulo="Seleccione la especialidad"
          nameIcon="heart-pulse"
          itemsList={data}
        />
        {/* SELECCIONAR FECHA */}
        <View style={styles.searchSection}>
          <Input
            placeholder="Ejemplo: 11/11/1996"
            onTouchStart={showDatepicker}
            containerStyle={styles.inputForm}
            leftIcon={{
              type: "material-community",
              name: "calendar-search",
              color: "gray"
            }}
            label="Fecha de Cita"
          />
        </View>

        {/* UBICACION */}
        <View style={styles.searchSection}>
          <Input
            placeholder="Ejemplo: San Miguel"
            containerStyle={styles.inputForm}
            leftIcon={{
              type: "material-community",
              name: "google-maps",
              color: "gray",
              size: 20
            }}
            label="Lugar de Cita"
            onTouchStart={() => navigation.navigate("map")}
          />
        </View>

        <View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        <SelectInfo
          titulo="Seleccione el seguro"
          nameIcon="ballot"
          itemsList={seguroData}
        />

        <Button
          containerStyle={styles.btnContainerLogin}
          buttonStyle={styles.btnCitas}
          title="Buscar cita "
          onPress={() => navigation.navigate("AppointmentList")}
        />
      </View>
    </ScrollView>
  );
}

export default withNavigation(AddRestaurantForm);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    marginTop: -11
  },
  collegeContainer: {
    flex: 1
  },
  Titulo: {
    fontSize: 16,
    color: "#86939E",
    margin: 8,
    fontWeight: "bold"
  },
  collegeIconColumn: {
    flex: 2,
    justifyContent: "center"
  },
  viewBody: {
    backgroundColor: "#fff"
  },
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
    //margin: 10,
    marginLeft: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 21,
    //marginBottom: 5,
    textAlign: "center"
  },
  description: {
    textAlign: "center",
    marginLeft: 27,
    marginRight: 27,
    fontSize: 16
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#fff",
    marginRight: 40,
    marginLeft: 40,
    textAlign: "left"
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  btnContainerLogin: {
    padding: 10,
    width: "100%"
  },
  btnCitas: {
    backgroundColor: "#47525E"
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  searchIcon: {
    padding: 10
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242"
  },
  veamos: { marginTop: -14 },
  estructura: {
    flex: 1,
    marginTop: 15,
    backgroundColor: "#fff",
    marginRight: 40,
    marginLeft: 40,
    textAlign: "left"
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10,
    marginTop: -14
  },
  collegeColumn: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left"
  }
});
