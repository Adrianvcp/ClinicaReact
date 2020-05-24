import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Platform,
  Keyboard,
  TextInput,
} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import { Icon, Image } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
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
import { funcionA } from "../../utils/endpoints";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import { maxCaracter } from "../../utils/other";

function AddRestaurantForm(props) {
  const fechaActual = new Date();
  const { navigation } = props;
  const parametros = props.navigation.state.params;

  /* VAR - DATA(JSONFAKE) */
  const [opt_esp, setOptEsp] = useState([]);

  const [opt_seguro, setOptSeguro] = useState([]);

  const seguroData = [
    { label: "Pacifico Seguro", value: "Pacifico Seguro" },
    { label: "Pacifico Seguro 2", value: "Pacifico Seguro 2" },
    { label: "Pacifico Seguro 3", value: "Pacifico Seguro 3" },
  ];

  useEffect(() => {
    fetch("https://backendapplication-1.azurewebsites.net/api/especialidades")
      .then((response) => response.json())
      .then((json) => setOptEsp(json))
      .catch((error) => console.error(error));

    fetch("https://backendapplication-1.azurewebsites.net/api/seguros")
      .then((response) => response.json())
      .then((json) => setOptSeguro(json))
      .catch((error) => console.error(error));
  }, []);

  /* VAR - FECHA */
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  /* VAR - LISTAS SELECTORAS : ESPECIADLIDAD Y SEGURO */
  const [esp, setesp] = useState("");
  const [seguro, setseguro] = useState("");
  const [Data, setData] = useState("");

  var mes = fechaActual.getMonth() + 1;
  var dia = fechaActual.getDate();
  var anio = fechaActual.getFullYear();
  const minfecha = String(anio + "-" + mes + "-" + dia);
  console.log(minfecha);
  const [distritoVar, setdistritoVar] = useState("");

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

  const posicion = () => {};

  const busquedaData = (dis, esp, fec, seg) => {
    /* http://localhost:8080/api/citas/citaIdeal?distrito=San%20Miguel&especialidad=Odontologia&fecha=2020-01-01&seguro=RIMAC */
    /* https://backendapplication-1.azurewebsites.net/api/citas/citaIdeal?distrito=San%20Miguel&especialidad=Odontologia&fecha=2020-03-04&seguro=Pacifico%20Seguros */
    console.log("----------------------------------");
    const urlBase = `http://backendapplication-1.azurewebsites.net/api/citas/citaIdeal?`;
    const distrito = `distrito=${dis}`;
    const especialidad = `&especialidad=${esp}`;
    const fecha = `&fecha=${fec}`;
    const seguro = `&seguro=${seg}`;
    const url = urlBase + distrito + especialidad + fecha + seguro;

    const searchData = {};
    searchData.especialidad = esp;
    searchData.distrito = dis;
    searchData.fecha = fec;
    searchData.seguro = seg;
    console.log("----------------------------------");

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        navigation.navigate("listaClinicaCitasDisponibles", {
          navigation,
          res,
          searchData,
        });
      });
  };

  const countryOptions = [{ value: 0, label: "Seleccionar" }];
  const segurosOptions = [{ value: 0, label: "Seleccionar" }];

  for (let i = 0; i < opt_esp.length; i++) {
    const element = opt_esp[i];
    const obj = {
      value: element.id,
      label: element.nombre,
    };

    countryOptions.push(obj);
  }

  for (let i = 0; i < opt_seguro.length; i++) {
    const element = opt_seguro[i];
    const obj = {
      value: element.id,
      label: element.nombre,
    };

    segurosOptions.push(obj);
  } /*   console.log("VEAMOS");
   console.log(props);
   */

  /*   const Data = require("../../utils/dat");*/

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}
    extraScrollHeight={100} enableOnAndroid={true} keyboardShouldPersistTaps='handled'>
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
                onPress={() => funcionA()}
                onCancelEditing={() => console.log("onCancel")}
                onSubmitEditing={(a) => setesp(a)}
                onValueChange={(a) => setesp(a)} /* setesp(a) */
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
                minDate={minfecha}
                maxDate="2021-06-01"
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

        {/* UBICACION */}
        <Fieldset label="Ubicación" last>
          <FormGroup>
            <View style={styles.dividir}>
              <Label>Ubicación</Label>

              <View
                style={{
                  width: "40%",
                  height: "200%",
                  color: "black",
                }}
              >
                {/*                 <Input
                  style={{ color: "black" }}
                  placeholder="asdasd"
                  onValueChange={(e) => {
                    setdistritoVar(e);
                    console.log(e);
                  }}
                /> */}

                <TextInput
                  style={{ height: 40, fontSize: 14 }}
                  maxLength={30}
                  onChangeText={(text) => setdistritoVar(text)}
                  placeholder="Ingresa distrito"
                  onKeyPress={maxCaracter(distritoVar, 30)}
                />
              </View>

              <View style={{ paddingTop: 5 }}>
       {/*         <Icon
                  name="map-marker"
                  type="material-community"
                  color="#1F90FC"
                  onPress={async () => {
                    await funcionA();
                    await navigation.navigate("map");
                  }} 
                />*/}
              </View>
            </View>
          </FormGroup>
        </Fieldset>

        {/* CALENDARIO */}
        {/*         <View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={(e, d) => {
                if (Platform.OS === "ios") {
                  this.setState({ date: d });
                  onChange(d);
                } else {
                  onClose(d);
                }
              }}
            />
          )}
        </View> */}

        {/* SEGURO */}
        <Fieldset label="Seleccione su Seguro" last>
          <FormGroup>
            <View style={styles.dividir}>
              <Label>Seguro</Label>
              {/*               <Select
                name="seguro"
                label="seguro"
                options={seguroData}
                placeholder="Sin seleccion"
                value={seguro}
                onValueChange={(a) => setseguro(a)}
              /> */}

              <SelectInput
                value={seguro ? seguro : 0}
                options={segurosOptions}
                onCancelEditing={() => console.log("onCancel")}
                onSubmitEditing={(a) => setseguro(a)}
                onValueChange={(a) => setseguro(a)}
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
        <ActionsContainer style={{ marginBottom: 30 }}>
          <Button
            icon="md-search"
            onPress={() => {
              if (distritoVar == "" || esp == "" || seguro == "") {
                Alert.alert("Error", "Dato faltante");
              } else {
                /* COMO MEJORA SE DEBE COMPARAR CON UN DIA ANTEIOR AL PRESENTE  */
                if (date == "Sun Apr 11 1976 01:22:10 GMT-0500 (-05)") {
                  Alert.alert("Error", "Ingrese una fecha válida");
                } else {
                  busquedaData(
                    distritoVar,
                    countryOptions[esp].label,
                    date,
                    segurosOptions[seguro].label
                  );
                }
              }
              /*               navigation.navigate("listaClinicaCitasDisponibles", {
                navigation,
                Data,
              }); */
            }}
          >
            Buscar Cita
          </Button>
        </ActionsContainer>
      </View>
    </KeyboardAwareScrollView>
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
