import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Image, Dimensions, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

import { withNavigation } from "react-navigation";
const { width, height } = Dimensions.get("window");

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
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../../assets/img/carpeta.png")}
          style={{
            width: "50%",
            resizeMode: "contain",
            height: 150,
            marginTop: height / 2 - 250,
            backgroundColor: "white",
          }}
        />
      </View>
      <View>
        <Text
          style={{
            paddingLeft: width / 2 / 3,
            paddingRight: width / 2 / 3,
            textAlign: "center",
            paddingTop: 20,
            fontSize: 20,
          }}
        >
          Para reservar tu cita,llena los siguientes datos
        </Text>
        <Button
          title="SIGUIENTE"
          containerStyle={styles.btnContainerNext}
          buttonStyle={styles.btnNext}
          onPress={() => navigation.navigate("Datos")}
        />
      </View>
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
  btnNext: {
    backgroundColor: "#00a680",
  },
  btnContainerNext: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  btnCloseSessionText: {
    color: "#1e90ff",
  },
  text: {
    fontSize: 16,
    marginBottom: 7,
    color: "#2f4f4f",
    marginTop: 7,
    marginRight: 205,
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
    backgroundColor: "#fff",
    paddingBottom: 10,
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
