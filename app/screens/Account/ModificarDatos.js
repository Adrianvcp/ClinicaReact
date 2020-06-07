import React, { useState, useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import Loading from "../../components/Loading";
import Text from "../../components/loginstyle/Text";
import Block from "../../components/loginstyle/Block";
import { theme } from "../../constants";
import Toast, { DURATION } from "react-native-easy-toast";

import Input from "../../components/loginstyle/Input";
import DatePicker from "react-native-datepicker";
import { Label } from "react-native-clean-form";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/loginstyle/Button";
import { modificardatos } from "../../utils/endpoints";
import { Alert } from "react-native";

function RegisterForm(props) {
  console.log("PROPS");
  console.log(props.navigation.state.params);
  var { userInfo } = props.navigation.state.params;
  const { navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRepPassword, setHideRepPassword] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setapellidoPaterno] = useState("");
  const [apellidoMaterno, setapellidoMaterno] = useState("");
  const [dni, setDni] = useState("");
  const [fnacimiento, setFnacimiento] = useState("");
  const [edad, setEdad] = useState("");
  const [Telefono, setTelefono] = useState("");
  const toastRef = useRef();

  function changeDataUser() {
    var obj = Object.assign({}, userInfo);
    console.log(obj);
    console.log("------------------");
    if (apellidoMaterno != "") {
      obj.apellidoMaterno = apellidoMaterno;
    }
    if (apellidoPaterno != "") {
      obj.apellidoPaterno = apellidoPaterno;
    }
    if (nombre != "") {
      obj.nombre = nombre;
    }
    if (dni != "") {
      obj.dni = dni;
    }

    if (fnacimiento != "") {
      obj.fechaNac = fnacimiento;
    }
    if (Telefono != "") {
      obj.telefono = Telefono;
    }

    try {
      var url = "https://easyappointment.azurewebsites.net/api/pacientes";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then(() => {
          toastRef.current.show(
            "Se modificaron los datos correctamente",
            DURATION.LENGTH_LONG
          );
        })
        .finally(() => navigation.navigate("InfoUser"));
    } catch (error) {
      Alert.alert("Error", "Ocurrio un error, no se pudo actualizar los datos");
      navigation.navigate("UserLoggued");
    }
  }

  var filt = /^[A-Za-zÑñáéíóúÁÉÍÓÚüÜäëïö ]+$/;
  //check letter
  var inputNombre = (d) => {
    const isValid = filt.test(d);
    if (isValid || d == "") {
      console.log("entro");
      setNombre(d);
    } else {
      setNombre("");
      Alert.alert("Alerta", "Ingrese digitos validos.");
    }
  };
  var inputApellidoPaterno = (d) => {
    const isValid = filt.test(d);
    if (isValid || d == "") {
      setapellidoPaterno(d);
    } else {
      setapellidoPaterno("");
      Alert.alert("Alerta", "Ingrese digitos validos.");
    }
  };
  var inputApellidoMaterno = (d) => {
    const isValid = filt.test(d);
    if (isValid || d == "") {
      setapellidoMaterno(d);
    } else {
      setapellidoMaterno("");
      Alert.alert("Alerta", "Ingrese digitos validos.");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }}
      extraScrollHeight={100}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formContainer}>
        <Block
          padding={[0, theme.sizes.base * 0.1]}
          paddingLeft={30}
          paddingRight={30}
        >
          <Block>
            <View>
              <Text style={{ paddingTop: 15, fontWeight: "100", fontSize: 20 }}>
                Informacion Basica:
              </Text>
              <Input
                label="Nombres"
                value={nombre}
                placeholder={userInfo.nombre}
                style={styles.input}
                onChange={(e) => inputNombre(e.nativeEvent.text)}
                rightIcon={
                  <Icon
                    type="material-community"
                    name="at"
                    iconStyle={styles.iconRight}
                  />
                }
              />

              <Input
                label="Apellido Paterno"
                placeholder={userInfo.apellidoPaterno}
                style={styles.input}
                value={apellidoPaterno}
                onChange={(e) => inputApellidoPaterno(e.nativeEvent.text)}
              />
              <Input
                label="Apellido Materno"
                placeholder={userInfo.apellidoMaterno}
                style={styles.input}
                value={apellidoMaterno}
                onChange={(e) => inputApellidoMaterno(e.nativeEvent.text)}
              />
              <Input
                label="DNI"
                placeholder={userInfo.dni}
                style={styles.input}
                keyboardType={"numeric"}
                onChange={(e) => setDni(e.nativeEvent.text)}
              />

              <Label style={styles.input}>Fecha Nacimiento</Label>
              <DatePicker
                style={{
                  width: "100%",
                  /*                   backgroundColor: "red",
                   */
                }}
                date={fnacimiento}
                mode={mode}
                containerStyle={""}
                placeholder={userInfo.fechaNac}
                format="YYYY-MM-DD"
                minDate="1900-05-01"
                maxDate={new Date()}
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
                    borderBottomWidth: 1,
                    borderBottomColor: "#C5CCD6",
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(fnacimiento) => {
                  setFnacimiento(fnacimiento);
                }}
              />

              <Input
                label="Telefono"
                placeholder={userInfo.telefono}
                style={styles.input}
                keyboardType={"numeric"}
                onChange={(e) => setTelefono(e.nativeEvent.text)}
              />

              <Button
                gradient
                containerStyle={styles.btnContainerNext}
                onPress={() => {
                  changeDataUser();
                  // {modificardatos(nombre, apellidoMaterno, apellidoPaterno, dni, Telefono, edad, fnacimiento,toastRef,navigation),
                  navigation.navigate("InfoUser", { navigation });
                }}
              >
                <Text bold white center>
                  Modificar datos
                </Text>
              </Button>

              <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
            </View>
          </Block>
        </Block>
      </View>
      <Toast ref={toastRef} position="center" opacity={(0, 5)} />
    </KeyboardAwareScrollView>
  );
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,

    marginTop: 10,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
    marginBottom: 20,
  },
  btnContainerNext: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  input: {
    marginTop: -10,
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: 1,
  },
});
