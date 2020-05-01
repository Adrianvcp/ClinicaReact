import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import Loading from "../../components/Loading";
import Text from "../../components/loginstyle/Text";
import Block from "../../components/loginstyle/Block";
import { theme } from "../../constants";
import Toast from "react-native-easy-toast";
import Input from "../../components/loginstyle/Input";
import DatePicker from "react-native-datepicker";
import { Label } from "react-native-clean-form";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/loginstyle/Button";

function RegisterForm(props) {
  const { toastRef, navigation } = props;
  const idUser = props.navigation.state.params.id;
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRepPassword, setHideRepPassword] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");

  /* VARIABLES REGISTRO PACIENTE -> "PRIMER LOGIN" ? */
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setapellidoPaterno] = useState("");
  const [apellidoMaterno, setapellidoMaterno] = useState("");
  const [dni, setDni] = useState("");
  const [fnacimiento, setFnacimiento] = useState("");
  const [edad, setEdad] = useState("");
  const [Telefono, setTelefono] = useState("");

  const register = async () => {
    setIsVisibleLoading(true);
    if (!email || !password || !RePassword) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no es correcto");
      } else {
        if (password !== RePassword) {
          toastRef.current.show("Las contraseñas no son iguales");
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate("MyAccount");
            })
            .catch(() => {
              toastRef.current.show(
                "Error al crear la cuenta. Inténtelo nuevamente"
              );
            });
        }
      }
    }
    setIsVisibleLoading(false);
  };

  const registroDatos = () => {
    /* http://localhost:8080/api/usuarios/1/paciente */
    /*     fetch(
      "http://192.168.100.21:8080/api/usuarios/login?correo=abc%40abc.com&password=123"
    )
      .then((response) => response.json())
      .then((json) => setuserObj(json))
      .then(() => navigation.navigate("Welcome"))
      .catch((error) => console.error(error)); */
    const urlbase = `http://192.168.100.2:8080/api/usuarios/`;
    const id = idUser;
    const url = urlbase + id + "/paciente";

    const DataObj = {};
    (DataObj.apellidoMaterno = apellidoMaterno),
      (DataObj.apellidoPaterno = apellidoPaterno),
      (DataObj.correo = "a@a.com"),
      (DataObj.dni = dni),
      (DataObj.edad = parseInt(edad)),
      (DataObj.fechaNac = date),
      (DataObj.nombre = nombre),
      (DataObj.parentesco = "otro weon"),
      (DataObj.telefono = Telefono),
      console.log(JSON.stringify(DataObj));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(DataObj),
    })
      .then((res) => res.json())
      .then(() => {
        navigation.navigate("UserLoggued");
      });
  };

  /*   return fetch('/appointments/get_appos', data)
          .then(response => response.json())  // promise
          .then(json => dispatch(receiveAppos(json)))
  }  */

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
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
                placeholder="Pedro Adrian"
                style={styles.input}
                onChange={(e) => setNombre(e.nativeEvent.text)}
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
                placeholder="Vela"
                password={true}
                style={styles.input}
                onChange={(e) => setapellidoPaterno(e.nativeEvent.text)}
                rightIcon={
                  <Icon
                    type="material-community"
                    name={hidePassword ? "eye-outline" : "eye-off-outline"}
                    iconStyle={styles.iconRight}
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                }
              />
              <Input
                label="Apellido Materno"
                placeholder="Cruz"
                style={styles.input}
                onChange={(e) => setapellidoMaterno(e.nativeEvent.text)}
                rightIcon={
                  <Icon
                    type="material-community"
                    name={hideRepPassword ? "eye-outline" : "eye-off-outline"}
                    iconStyle={styles.iconRight}
                    onPress={() => setHideRepPassword(!hideRepPassword)}
                  />
                }
              />
              <Input
                label="DNI"
                placeholder="12345678"
                style={styles.input}
                onChange={(e) => setDni(e.nativeEvent.text)}
                rightIcon={
                  <Icon
                    type="material-community"
                    name={hideRepPassword ? "eye-outline" : "eye-off-outline"}
                    iconStyle={styles.iconRight}
                    onPress={() => setHideRepPassword(!hideRepPassword)}
                  />
                }
              />

              <Label style={styles.input}>Fecha Nacimiento</Label>
              <DatePicker
                style={{
                  width: "100%",
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
                    borderBottomWidth: 1,
                    borderBottomColor: "#C5CCD6",
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  setDate(date);
                }}
              />
              <Input
                label="Edad"
                placeholder="22"
                style={styles.input}
                onChange={(e) => setEdad(e.nativeEvent.text)}
                rightIcon={
                  <Icon
                    type="material-community"
                    name={hideRepPassword ? "eye-outline" : "eye-off-outline"}
                    iconStyle={styles.iconRight}
                    onPress={() => setHideRepPassword(!hideRepPassword)}
                  />
                }
              />
              <Input
                label="Telefono"
                placeholder="134235346"
                style={styles.input}
                onChange={(e) => setTelefono(e.nativeEvent.text)}
                rightIcon={
                  <Icon
                    type="material-community"
                    name={hideRepPassword ? "eye-outline" : "eye-off-outline"}
                    iconStyle={styles.iconRight}
                    onPress={() => setHideRepPassword(!hideRepPassword)}
                  />
                }
              />
              <Button
                gradient
                containerStyle={styles.btnContainerNext}
                onPress={
                  () => registroDatos() /* navigation.navigate("UserLoggued") */
                }
              >
                <Text bold white center>
                  Guardar
                </Text>
              </Button>

              <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
            </View>
          </Block>
        </Block>
      </View>
    </ScrollView>
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
