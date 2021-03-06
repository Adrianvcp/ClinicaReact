import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

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

      <Button
        title="Configuración"
        buttonStyle={styles.menuItem2}
        titleStyle={styles.text}
        onPress={() => navigation.navigate("Config")}
        icon={
          <Icon
            type="material-community"
            name="settings"
            size={27}
            color="#ccc"
            iconStyle={styles.iconL}
            //iconNameRight="chevron-right"
            //iconColorRight="#ccc"
          />
        }
        //iconLeft
      />

      <Button
        title="Gestión Familiar"
        buttonStyle={styles.menuItem}
        titleStyle={styles.text2}
        onPress={() => navigation.navigate("GestFamiliar")}
        icon={
          <Icon
            type="material-community"
            name="account-group"
            size={30}
            color="#ccc"
            iconStyle={styles.icon2}
            //iconNameRight="chevron-right"
            //iconColorRight="#ccc"
          />
        }
        //iconLeft
      />

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading text={textLoading} isVisible={isLoading} />
    </View>
  );
}

export default withNavigation(UserLogged);

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2"
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
    paddingBottom: 10
  },
  btnCloseSessionText: {
    color: "#1e90ff"
  },
  text: {
    fontSize: 16,
    marginBottom: 7,
    color: "#2f4f4f",
    marginTop: 7,
    marginRight: 205
  },
  text2: {
    fontSize: 16,
    marginBottom: 7,
    color: "#2f4f4f",
    marginTop: 7,
    marginRight: 190
  },
  menuItem: {
    borderBottomWidth: 10,
    borderBottomColor: "#e3e3e3",
    backgroundColor: "#fff",
    paddingBottom: 10
  },
  menuItem2: {
    borderBottomWidth: 10,
    borderBottomColor: "#e3e3e3",
    backgroundColor: "#fff",
    paddingBottom: 10,
    borderTopWidth: 10,
    borderTopColor: "#e3e3e3"
  },

  iconL: {
    marginRight: 16
  },
  icon2: {
    marginRight: 16
  }
});
//15
