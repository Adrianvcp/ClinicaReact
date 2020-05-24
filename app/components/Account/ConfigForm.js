import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountConfig from "../../components/Account/AccountConfiguration";
import { withNavigation } from "react-navigation";

//le aumento esto

import AccountOptions from "../../components/Account/AccountOptions";
import GestiónFamiliar from "../../screens/Account/GestionFamiliar";

function Configuration(props) {
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
    <View style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/ajustes.png")}
        style={styles.logo}
        reziseMode="contain"
      />

      <Text style={styles.title}>Configuraciones</Text>

      <AccountConfig
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
    </View>
  );
}

export default withNavigation(Configuration);

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logo: {
    width: "30%",
    height: 120,
    marginTop: 40,
    margin: 35,
    marginLeft: 140,
    marginBottom: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 28,
    textAlign: "center",
    color: "#1e90ff"
  },
  description: {
    marginBottom: 20,
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20
  }
});
