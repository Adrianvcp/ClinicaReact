import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import Loading from "../Loading";
import Text from "../../components/loginstyle/Text";
import Block from "../../components/loginstyle/Block";
import Button from "../../components/loginstyle/Button";
import { theme } from "../../constants";
import Toast, { DURATION } from "react-native-easy-toast";
import Input from "../../components/loginstyle/Input";
import { ep_login, ep_login2 } from "../../utils/endpoints";

function RegisterForm(props) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRepPassword, setHideRepPassword] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const url = "http://backendapplication-1.azurewebsites.net/api/usuarios";
  /*   {
    "correo": "p@p.com",
    "enable": true,
    "id": 0,
    "password": "holi"
  } */

  const register2 = async () => {
    const ObjData = {};

    if (!email || !password || !RePassword) {
      toastRef.current.show("Todos los campos son obligatorios", 500);
    } else {
      if (!validateEmail(email))
        toastRef.current.show("El email no es correcto", 500);
      else if (password !== RePassword) {
        toastRef.current.show("Las contraseñas no son iguales", 500);
      } else {
        ObjData.correo = email;
        ObjData.password = password;
        ObjData.enable = true;
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(ObjData),
        })
          .then((res) => res.json())
          .then(() => {
            toastRef.current.show("Usuario registrado Satisfactoriamente!", 5000);
            
            /*ep_login(ObjData.correo, ObjData.password, navigation);*/
            ep_login2(ObjData.correo, ObjData.password, navigation);
          });
      }
    }
  };

  /*   const registroDatos = () => {

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
  }; */
  return (
    <View style={{ flex: 1, marginTop: -20 }}>
      <Block padding={[0, theme.sizes.base * 0.1]}>
        <Block center middle>
          <View
            style={{
              justifyContent: "center",
              height: 150,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/img/logo2.png")}
              style={{
                width: 100,
                resizeMode: "contain",
                marginTop: 20,
              }}
              reziseMode="contain"
            />
          </View>
        </Block>
        <Text h1 center bold>
          <Text h1 primary>
            EasyAppointment
          </Text>
        </Text>
        <Text h1 center>
          <Text h3>Citas Disponible Siempre</Text>
        </Text>

        <Block middle>
          <View>
            <Input
              label="Correo electronico"
              placeholder="abc@easy.com"
              style={styles.input}
              onChange={(e) => setEmail(e.nativeEvent.text)}
              rightIcon={
                <Icon
                  type="material-community"
                  name="at"
                  iconStyle={styles.iconRight}
                />
              }
            />

            <Input
              label="Contraseña"
              placeholder="*****"
              password={true}
              secureTextEntry={hidePassword}
              style={styles.input}
              onChange={(e) => setPassword(e.nativeEvent.text)}
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
              label="Repetir contraseña"
              placeholder="******"
              password={true}
              secureTextEntry={true}
              style={styles.input}
              onChange={(e) => setRePassword(e.nativeEvent.text)}
              rightIcon={
                <Icon
                  type="material-community"
                  name={hideRepPassword ? "eye-outline" : "eye-off-outline"}
                  iconStyle={styles.iconRight}
                  onPress={() => setHideRepPassword(!hideRepPassword)}
                />
              }
            />

            <Button gradient onPress={register2}>
              <Text bold white center>
                Registrarse
              </Text>
            </Button>
            <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
          </View>
        </Block>
      </Block>
    </View>
  );
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "white",
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
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
