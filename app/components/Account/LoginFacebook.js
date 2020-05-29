import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import { FacebookApi } from "../../utils/Social";
import Loading from "../Loading";

export default function LoginFacebook(props) {
  const { toastRef, navigation } = props;
  const [isLoading, setIsLoading] = useState(false);

  const login = async function login() {
    try {
      await Facebook.initializeAsync(FacebookApi.application_id);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: FacebookApi.permissions
      });
      if (type === "success") {
        setIsLoading(true);
        // Get the user's name using Facebook's Graph API
        const credentials = firebase.auth.FacebookAuthProvider.credential(
          token
        );

        await firebase
          .auth()
          .signInWithCredential()
          .then(() => {
            navigation.navigate("MyAccount");
          })
          .catch(() => {
            toastRef.current.show(
              "Error accediendo por Facebook, inténtelo más tarde"
            );
          });

        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        //Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else if (type === "cancel") {
        toastRef.current.show("Inicio de sesión cancelado");
      } else {
        toastRef.current.show("Error desconocido, intentelo más tarde");
      }
      setIsLoading(false);
    } catch ({ message }) {
      //toastRef.current.show("Facebook Login Error");
      alert(`Facebook Login Error: ${message}`);
    }
  };
  return (
    <>
      <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading isVisible={isLoading} text="Iniciando sesión" />
    </>
  );
}
