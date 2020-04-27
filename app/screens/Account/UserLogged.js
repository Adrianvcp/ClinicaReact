import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import { theme } from "../../constants";
import Button2 from "../../components/loginstyle/Button";
import Text from "../../components/loginstyle/Text";
import Block from "../../components/loginstyle/Block";

import { withNavigation } from "react-navigation";

function UserLogged(props) {
  //aumento esto
  const { navigation } = props;

  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);

  return (
    <View style={styles.viewUserInfo}>
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <View style={{ marginTop: 30 }}>
        <Button
          title="Datos Personales"
          buttonStyle={styles.menuItem2}
          titleStyle={styles.text}
          /*           onPress={() => navigation.navigate("Config")}
           */

          onPress={() => navigation.navigate("InfoUser")}
          iconRight={true}
          icon={
            <Icon
              type="material-community"
              name="check"
              size={27}
              color="#ccc"
              iconStyle={{ marginRight: "25%" }}
            />
          }
        />
      </View>
      <Button
        title="Gestión Familiar"
        buttonStyle={styles.menuItem2}
        titleStyle={styles.text}
        onPress={() => navigation.navigate("GestFamiliar")}
        iconRight={true}
        icon={
          <Icon
            type="material-community"
            name="account-group"
            size={30}
            color="#ccc"
            iconStyle={{ marginRight: "26%" }}
            //iconNameRight="chevron-right"
            //iconColorRight="#ccc"
          />
        }
        //iconLeft
      />

      {/*       <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />
 */}
      <Block padding={[30, theme.sizes.base * 3]}>
        <Button2 gradient onPress={() => firebase.auth().signOut()}>
          <Text bold white center>
            Cerrar Sesion
          </Text>
        </Button2>
      </Block>

      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading text={textLoading} isVisible={isLoading} />
    </View>
  );
}

export default withNavigation(UserLogged);

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "white",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSessionText: {
    color: "#1e90ff",
  },
  text: {
    alignContent: "flex-start",
    width: "70%",
    fontSize: 16,
    marginBottom: 7,
    color: "#2f4f4f",
    marginTop: 7,
    marginRight: "20%",
  },
  text2: {
    fontSize: 16,
    marginBottom: 7,
    color: "#2f4f4f",
    marginTop: 7,
    marginRight: 190,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    backgroundColor: "white",
    paddingBottom: 10,
  },
  menuItem2: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    backgroundColor: "white",
    paddingBottom: 10,
    paddingLeft: "10%",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
  },

  iconL: {
    marginRight: 16,
  },
  icon2: {
    marginRight: 16,
  },
});
//15
