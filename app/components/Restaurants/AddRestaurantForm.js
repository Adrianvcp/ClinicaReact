import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { Icon, Image } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { withNavigation } from "react-navigation";
import SelectInfo from "../ReservaCita/SelectInfo";
import RNPickerSelect from "react-native-picker-select";
import ModalDatePicker from "react-native-datepicker-modal";
import {
  Input,
  Label,
  Switch,
  FormGroup,
  Fieldset,
  FieldsContainer,
  ActionsContainer,
  Select,
  Button,
} from "react-native-clean-form";
import styled from "styled-components";
import DatePicker from "react-native-datepicker";
import { set } from "react-native-reanimated";

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
  const Container = styled.TouchableOpacity`
    background-color: ${Platform.OS === "ios" ? "#00000066" : "transparent"};
    position: absolute;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
  `;
  const Header = styled.View`
    width: 100%;
    padding: 16px;
    justify-content: flex-end;
    align-items: flex-end;
    background-color: white;
    border-bottom-width: 1;
    border-color: grey;
  `;

  const countryOptions = [
    { label: "Denmark", value: "Denmark" },
    { label: "Germany", value: "Germany" },
    { label: "United State", value: "United State" },
  ];
  const Datito = require("../../utils/dat");

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
        <Fieldset label="Especialidad" last>
          <FormGroup>
            <Label>Especialidad</Label>
            <Select
              name="esp"
              label="esp"
              options={countryOptions}
              placeholder="Sin seleccion"
              value={esp}
              onValueChange={(a) => setesp(a)}
            />
          </FormGroup>
        </Fieldset>

        {/* SELECCIONAR FECHA */}
        <Fieldset label="Seleccionar Fecha" last>
          <FormGroup>
            <Label>Fecha</Label>

            <View style={{ marginLeft: 80 }}>
              <DatePicker
                style={{ width: 100 }}
                date={date}
                mode={mode}
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2006-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 0,
                    marginRight: 10,
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
        <Fieldset label="Lugar" last>
          <FormGroup>
            <Label>Password</Label>
            <Input
              placeholder="Seleccionar ubicacion"
              onTouchEnd={() => navigation.navigate("map")}
            />
          </FormGroup>
        </Fieldset>

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
        </View>

        {/* SEGURO */}
        <Fieldset label="Seleccione su Seguro" last>
          <FormGroup>
            <Label>Seguro</Label>
            <Select
              name="seguro"
              label="seguro"
              options={seguroData}
              placeholder="Sin seleccion"
              value={seguro}
              onValueChange={(a) => setseguro(a)}
            />
          </FormGroup>
        </Fieldset>
        <ActionsContainer style={{ marginBottom: 30 }}>
          <Button
            icon="md-search"
            onPress={() =>
              navigation.navigate("listaClinicaCitasDisponibles", {
                navigation,
                Datito,
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

/* 
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
              /> */
export default withNavigation(AddRestaurantForm);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    marginTop: -11,
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
