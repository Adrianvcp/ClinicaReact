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
import Toast from "react-native-easy-toast";
import Input from "../../components/loginstyle/Input";
import { ep_listUsuarios } from "../../utils/endpoints";

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
      toastRef.current.show("Todos los campos son obligatorios", 5000);
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("Email no registrado", 5000);
      } else {
        if (password !== RePassword) {
          toastRef.current.show("Las contraseñas no son iguales", 5000);
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate("MyAccount");
            })
            .catch(() => {
              toastRef.current.show(
                "Error al crear la cuenta. Inténtelo nuevamente",5000
              );
            });
        }
      }
    }
    setIsVisibleLoading(false);
  };

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
              label="Nueva Contraseña"
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
              label="Repetir nueva contraseña"
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

            {/*             <Button
              title="CAMBIAR CONTRASEÑA"
              containerStyle={styles.btnContainerRegister}
              buttonStyle={styles.btnRegister}
              onPress={register}
            />
 */}
            <Button
              gradient
              onPress={() =>
                ep_listUsuarios(email, password,RePassword, toastRef, navigation)
              }
            >
              <Text bold white center>
                Cambiar Contraseña
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
