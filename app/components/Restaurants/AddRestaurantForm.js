import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Platform,
  Keyboard
} from "react-native";
import { Icon, Image, Input, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { withNavigation } from "react-navigation";
import SelectInfo from "../ReservaCita/SelectInfo";
import RNPickerSelect from "react-native-picker-select";

function AddRestaurantForm(props) {
  const { navigation } = props;

  /* VAR - DATA(JSONFAKE) */
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

  /* VAR - FECHA */
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  /* VAR - LISTAS SELECTORAS : ESPECIADLIDAD Y SEGURO */
  const [esp, setesp] = useState("");
  const [seguro, setseguro] = useState("");

  /* METODOS CALENDARIO - FECHA */
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
    Keyboard.dismiss();
    showMode("date");
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
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
        <Text style={styles.Titulo}>Seleccione la especialidad</Text>
        <View style={[styles.container, styles.collegeContainer]}>
          <View style={styles.collegeIconColumn}>
            <Icon
              name="heart-pulse"
              type="material-community"
              underlayColor="transparent"
              iconStyle={styles.collegeIcon}
              color="gray"
              size={20}
            />
          </View>
          <View style={styles.collegeColumn}>
            <RNPickerSelect
              placeholder={{
                label: "Seleccionar",
                value: null
              }}
              style={styles.veamos}
              items={data}
              onValueChange={value => setesp(value)}
            />
          </View>
        </View>
        <View style={styles.lineStyle} />

        {/* SELECCIONAR FECHA */}
        <View style={styles.searchSection}>
          <Input
            placeholder={"11/11/1996"}
            onTouchEnd={showDatepicker}
            style={{ color: "red" }}
            containerStyle={styles.inputForm}
            leftIcon={{
              type: "material-community",
              name: "calendar-search",
              color: "gray",
              size: 20
            }}
            timeZoneOffsetInMinutes={0}
            value={date.toLocaleDateString()}
            label="Fecha de Cita"
          />
        </View>

        {/* UBICACION */}
        <View style={styles.searchSection}>
          <Input
            placeholder="Seleciona direccion"
            containerStyle={styles.inputForm}
            leftIcon={{
              type: "material-community",
              name: "google-maps",
              color: "gray",
              size: 20
            }}
            label="Lugar de Cita"
            onTouchEnd={() => navigation.navigate("map")}
          />
        </View>

        {/* CALENDARIO */}
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

        {/* SEGURO */}
        <Text style={styles.Titulo}>Seleccione el seguro</Text>
        <View style={[styles.container, styles.collegeContainer]}>
          <View style={styles.collegeIconColumn}>
            <Icon
              name="ballot"
              type="material-community"
              underlayColor="transparent"
              iconStyle={styles.collegeIcon}
              color="gray"
              size={20}
            />
          </View>
          <View style={styles.collegeColumn}>
            <RNPickerSelect
              placeholder={{
                label: "Seleccionar",
                value: null
              }}
              style={styles.veamos}
              items={seguroData}
              onValueChange={value => setseguro(value)}
            />
          </View>
        </View>
        <View style={styles.lineStyle} />

        <Button
          containerStyle={styles.btnContainerLogin}
          buttonStyle={styles.btnCitas}
          title="Buscar cita "
          onPress={() =>
            navigation.navigate("AppointmentList", { seguro, esp })
          }
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
    padding: 30,
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
