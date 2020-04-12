import React, { useRef } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "../../components/Account/ForgotPassword";
import Toast from "react-native-easy-toast";

export default function ForgotPassword() {
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
    backgroundColor: "white",
  },
});
