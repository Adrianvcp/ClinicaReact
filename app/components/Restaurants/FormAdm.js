import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Platform,
  Keyboard,
} from "react-native";

import { Icon, Image } from "react-native-elements";
import { withNavigation } from "react-navigation";

import {
  Input,
  Label,
  FormGroup,
  Fieldset,
  ActionsContainer,
  Button,
} from "react-native-clean-form";
import SelectInput from "react-native-select-input-ios";

import styled from "styled-components";
import DatePicker from "react-native-datepicker";

function AddRestaurantForm(props) {
  const { navigation } = props;

  /* VAR - DATA(JSONFAKE) */
  const data = [
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" },
  ];
  const seguroData = [
    { label: "Pacifico Seguro", value: "Pacifico Seguro" },
    { label: "Pacifico Seguro 2", value: "Pacifico Seguro 2" },
    { label: "Pacifico Seguro 3", value: "Pacifico Seguro 3" },
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

  const showMode = (currentMode) => {
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

  const countryOptions = [
    { value: 0, label: "Apple" },
    { value: 1, label: "Banana" },
    { value: 2, label: "Orange" },
    { value: 3, label: "Strawberry" },
  ];
  const Data = require("../../utils/dat");

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
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
        <Fieldset label="Especialidad" last>
          <FormGroup>
            <View style={styles.dividir}>
              <Label>Especialidad</Label>
              <SelectInput
                value={esp ? esp : 0}
                options={countryOptions}
                onCancelEditing={() => console.log("onCancel")}
                onSubmitEditing={(a) => setesp(a)}
                onValueChange={(a) => setesp(a)}
                style={[styles.selectInput, styles.selectInputLarge]}
                labelStyle={styles.selectInputInner}
              />
              {Platform.OS === "ios" ? (
                <View style={{ marginLeft: -25 }}>
                  <Icon name="menu-down" type="material-community" />
                </View>
              ) : (
                <View></View>
              )}
            </View>
          </FormGroup>
        </Fieldset>

        {/* SELECCIONAR FECHA */}
        <Fieldset label="Seleccionar Fecha" last>
          <FormGroup>
            <View style={styles.dividir}>
              <Label>Fecha</Label>
              <DatePicker
                style={{
                  width: "50%",
                  /*                   backgroundColor: "red",
                   */
                }}
                date={date}
                mode={mode}
                containerStyle={""}
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2006-05-01"
                maxDate="2026-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    borderWidth: 0,
                  },
                  dateInput: {
                    borderWidth: 0,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  setDate(date);
                }}
              />
            </View>
          </FormGroup>
        </Fieldset>

        <ActionsContainer style={{ marginBottom: 30 }}>
          <Button
            icon="md-search"
            onPress={() =>
              navigation.navigate("citaReservadas", {
                navigation,
                Data,
              })
            }
          >
            Buscar Cita
          </Button>
        </ActionsContainer>
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
    marginTop: -11,
  },
  selectInput: {
    /*     backgroundColor: "red", */
    marginTop: 5,
    overflow: "hidden",
    height: "50%",
  },
  dividir: { width: "100%", flexDirection: "row" },
  selectInputLarge: {
    width: "50%",
  },
  selectInputInner: {
    borderRadius: 4,
  },
  collegeContainer: {
    flex: 1,
  },
  Titulo: {
    fontSize: 16,
    color: "#86939E",
    margin: 8,
    fontWeight: "bold",
  },
  collegeIconColumn: {
    flex: 2,
    justifyContent: "center",
  },
  viewBody: {
    backgroundColor: "#fff",
  },
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
    //margin: 10,
    marginLeft: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 21,
    //marginBottom: 5,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginLeft: 27,
    marginRight: 27,
    fontSize: 16,
    color: "grey",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#fff",
    marginRight: 40,
    marginLeft: 40,
    textAlign: "left",
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    padding: 30,
    width: "100%",
  },
  btnCitas: {
    backgroundColor: "#47525E",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
  veamos: { marginTop: -14 },
  estructura: {
    flex: 1,
    marginTop: 15,
    backgroundColor: "#fff",
    marginRight: 40,
    marginLeft: 40,
    textAlign: "left",
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10,
    marginTop: -14,
  },
  collegeColumn: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
  },
  headerr: {
    width: "100%",
    padding: 16,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "white",
    borderColor: "grey",
  },
  container2: {
    backgroundColor: "white",
    position: "absolute",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
});
