import React from "react";
import { StyleSheet, View, Image, Text, Dimensions, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import { ConfirmDialog } from "react-native-simple-dialogs";
import Dialog, {
  DialogContent,
  SlideAnimation
} from "react-native-popup-dialog";

export default function Header({ navigation, title, iconcheck, iconsearch }) {
  const ancho = Dimensions.get("window").width;
  const { as } = "";
  const alerta = true;
  console.log(ancho);
  return (
    <View style={styles.header}>
      <View
        style={{
          flex: 1
        }}
      >
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {iconcheck ? (
        <View
          style={{
            flex: 1,
            padding: 180
          }}
        >
          <Icon
            name={iconcheck}
            type="material-community"
            underlayColor="transparent"
            color="black"
            size={20}
            onPress={() =>
              navigation.navigate("informacioncitaconfirmada", { navigation })
            }
          />
        </View>
      ) : (
        <View></View>
      )}

      {iconsearch ? (
        <View
          style={{
            flex: 1,
            padding: 150
          }}
        >
          <Icon
            name={iconsearch}
            type="material-community"
            underlayColor="transparent"
            color="black"
            size={20}
            onPress={() =>
              navigation.navigate("informacioncitaconfirmada", { navigation })
            }
          />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333"
  }
});
