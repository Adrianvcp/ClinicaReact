import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

//ojo
import Modal from "../Modal";
import AccountConfig from "../../components/Account/AccountConfiguration";
import GestiónFamiliar from "../../screens/Account/GestionFamiliar";

export default function AccountOptions(props) {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const toastRef = useRef();

  // ojo poniendo navigation
  const { navigation } = props;

  //ojo con esto2
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);

  //aumentando opciones en la cuenta
  const menuOptions = [
    {
      title: "Configuración",
      iconType: "material-community",
      iconNameLeft: "settings",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectedComponent("Config")
    },
    {
      title: "Gestión Familiar",
      iconType: "material-community",
      iconNameLeft: "account-group",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc"
      //onPress: () => selectedComponent("email")
    }
  ];

  const selectedComponent = key => {
    switch (key) {
      case "Config":
        setRenderComponent(
          <AccountConfig
            userInfo={userInfo}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "email":

      default:
        break;
    }
  };

  return (
    <View>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight
          }}
          onPress={menu.onPress}
          containerStyle={styles.menuItem}
        />
      ))}

      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 10,
    borderBottomColor: "#e3e3e3"
  }
});
