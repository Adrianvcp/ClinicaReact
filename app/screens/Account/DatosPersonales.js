import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import Loading from "../../components/Loading";
import Text from "../../components/loginstyle/Text";
import Block from "../../components/loginstyle/Block";
import { theme } from "../../constants";
import Toast from "react-native-easy-toast";
import Input from "../../components/loginstyle/Input";

import { ScrollView } from "react-native-gesture-handler";

function RegisterForm(props) {
  const { toastRef, navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRepPassword, setHideRepPassword] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");

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
                label="Apellido Paterno"
                placeholder="Vela"
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
                label="Apellido Materno"
                placeholder="Cruz"
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
              <Input
                label="DNI"
                placeholder="12345678"
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
              <Input
                label="Fecha Nacimiento"
                placeholder="05/05/05"
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
              <Input
                label="Edad"
                placeholder="22"
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
              <Input
                label="Telefono"
                placeholder="134235346"
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
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  input: {
    marginTop: -10,
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
