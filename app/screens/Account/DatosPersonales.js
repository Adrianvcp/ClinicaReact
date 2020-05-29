import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Image, TextInput, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../../components/Loading";
import Text from "../../components/loginstyle/Text";
import Block from "../../components/loginstyle/Block";
import { theme } from "../../constants";

import Input from "../../components/loginstyle/Input";
import DatePicker from "react-native-datepicker";
import { Label } from "react-native-clean-form";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/loginstyle/Button";
import { AsyncStorage } from "react-native";
import { isEmpty } from "lodash";
import { registrodatos } from "../../utils/endpoints";
import { withNavigation } from "react-navigation";
import Toast from "react-native-easy-toast";
import { maxCaracter } from "../../utils/other";
import LetrasValidation from "../../utils/Letras";

function RegisterForm(props) {
  const toastRef = useRef();
  const { navigation } = props;

  console.log(navigation);

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

  //check letter
  var inputValueLetter1 = (d) => {
    const isValid = /^[A-Za-z]+$/.test(d);
    if (isValid || d == "") {
      setNombre(d);
    } else {
      Alert.alert("Alerta", "Solo letras.");
    }
  };
  var inputValueLetter2 = (d) => {
    const isValid = /^[A-Za-z]+$/.test(d);
    if (isValid || d == "") {
      setapellidoPaterno(d);
    } else {
      Alert.alert("Alerta", "Solo letras.");
    }
  };
  var inputValueLetter3 = (d) => {
    const isValid = /^[A-Za-z]+$/.test(d);
    if (isValid || d == "") {
      setapellidoMaterno(d);
    } else {
      Alert.alert("Alerta", "Solo letras.");
    }
  };

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
  /*   return fetch('/appointments/get_appos', data)
          .then(response => response.json())  // promise
          .then(json => dispatch(receiveAppos(json)))
  }  */

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
                placeholder=""
                style={styles.input}
                maxLength={20}
                value={nombre}
                onChange={(e) => inputValueLetter1(e.nativeEvent.text)}
                /*                 onKeyPress={maxCaracter(nombre, 20)}
                 */
              />

              <Input
                label="Apellido Paterno"
                placeholder=""
                password={true}
                style={styles.input}
                maxLength={30}
                value={apellidoPaterno}
                onChange={(e) => inputValueLetter2(e.nativeEvent.text)}
                /*                 onKeyPress={maxCaracter(apellidoPaterno, 30)}
                 */
              />
              <Input
                label="Apellido Materno"
                placeholder=""
                style={styles.input}
                maxLength={30}
                value={apellidoMaterno}
                onChange={(e) => inputValueLetter3(e.nativeEvent.text)}
                /*                 onKeyPress={maxCaracter(apellidoMaterno, 30)}
                 */
              />
              <Input
                label="DNI"
                placeholder=""
                style={styles.input}
                maxLength={8}
                keyboardType={"numeric"}
                onChange={(e) => setDni(e.nativeEvent.text)}
                /*                 onKeyPress={maxCaracter(dni, 8)}
                 */
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
                placeholder="seleccionar fecha"
                format="YYYY-MM-DD"
                minDate="1900-05-01"
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
                placeholder=""
                style={styles.input}
                maxLength={9}
                keyboardType={"numeric"}
                onChange={(e) => setTelefono(e.nativeEvent.text)}
                /*                 onKeyPress={maxCaracter(Telefono, 9)}
                 */
              />
              <Button
                gradient
                containerStyle={styles.btnContainerNext}
                onPress={() => {
                  registrodatos(
                    nombre,
                    apellidoMaterno,
                    apellidoPaterno,
                    dni,
                    Telefono,
                    fnacimiento,
                    toastRef,
                    navigation
                  );
                }}
              >
                <Text bold white center>
                  Guardar
                </Text>
              </Button>

              <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
            </View>
          </Block>
        </Block>
        <Toast ref={toastRef} position="center" opacity={(0, 9)} />
      </View>
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
