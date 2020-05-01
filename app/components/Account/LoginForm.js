import React, { useState, useRef } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import { Icon } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import { withNavigation } from "react-navigation";
import * as firebase from "firebase";
import Loading from "../Loading";

import Text from "../../components/loginstyle/Text";
import Button from "../../components/loginstyle/Button";
import Input from "../../components/loginstyle/Input";
import Block from "../../components/loginstyle/Block";
import { theme } from "../../constants";
import Toast from "react-native-easy-toast";

function LoginForm(props) {
  console.log(props);
  const { navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);
  const VALID_EMAIL = "contact@vela.com";
  const VALID_PASSWORD = "vela123";
  const { width, height } = Dimensions.get("window");
  const errors = [];
  const loading = false;
  const toastRef = useRef();
  const [id, setid] = useState("");
  const [userObj, setuserObj] = useState();

  const login = async () => {
    setIsVisibleLoading(true);
    if (!email || !password) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no es correcto");
      } else {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            navigation.navigate("Welcome");
          })
          .catch(() => {
            toastRef.current.show("Email o contraseña incorrecta");
          });
      }
    }
    setIsVisibleLoading(false);
  };

  const login2 = async () => {
    /* http://192.168.100.21:8080/api/usuarios/login?correo=abc%40abc.com&password=123 */
    const urlbase = `http://192.168.100.2:8080/api/usuarios/login?`;
    const correo = `correo=${email}`;
    const pass = `&password=${password}`;
    const url = urlbase + correo + pass;
    console.log(url);

    const respuesta = await fetch(url);
    const json = await respuesta.json();

    navigation.navigate("Welcome", { user: json.id });
  };
  /* setOptEsp(json) */

  return (
    <View style={styles.formContainer}>
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
          <Input
            label="Email"
            error={hasErrors("email")}
            style={[styles.input, hasErrors("email")]}
            /*             onChangeText={(text) => setEmail(text)}*/
            onChange={(e) => setEmail(e.nativeEvent.text)}
            placeholder={VALID_EMAIL}
          />
          <Input
            secure
            label="Password"
            error={hasErrors("password")}
            style={[styles.input, hasErrors("password")]}
            defaultValue={VALID_PASSWORD}
            /* onChangeText={(text) => setPassword(tex)} */
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />

          <Button
            gradient
            onPress={login2}
            /*  onPress={() => this.handleLogin()} */
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Login
              </Text>
            )}
          </Button>

          <Button onPress={() => navigation.navigate("Forgot")}>
            <Text
              gray
              caption
              center
              style={{ textDecorationLine: "underline" }}
            >
              ¿Olvide mi contraseña?
            </Text>
          </Button>
        </Block>
      </Block>

      <Loading isVisible={isVisibleLoading} text="Iniciando sesión" />
    </View>
  );
}
export default withNavigation(LoginForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: -20,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#00a680",
  },
  login: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});
