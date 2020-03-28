import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { set, color } from "react-native-reanimated";
import DateTimePicker from "@react-native-community/datetimepicker";
import { withNavigation } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
function AddRestaurantForm(props) {
  const { navigation } = props;

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

      <View style={styles.formContainer}>
        <Input
          leftIcon={{
            type: "material-community",
            name: "heart-pulse",
            color: "gray",
            size: 20
          }}
          placeholder="Especialidad"
          containerStyle={styles.inputForm}
          label="Seleccione la especialidad"
          //onChange={e => setEmail(e.nativeEvent.text)}
        />

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
            onPress={showDatepicker}
            label="Fecha de Cita"
          />
        </View>

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
            label="Fecha de Cita"
          />
        </View>

        <View style={styles.searchSection}>
          <Input
            placeholder="Seguro"
            containerStyle={styles.inputForm}
            leftIcon={{
              type: "material-community",
              name: "ballot",
              color: "gray",
              size: 20
            }}
            label="Seleccione seguro"
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
    marginLeft: 40
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  btnContainerLogin: {
    marginTop: 30,
    marginBottom: 20,
    width: "95%"
  },
  btnCitas: {
    backgroundColor: "#1e90ff"
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
  }
});
