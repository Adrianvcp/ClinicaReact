import React from "react";
import { StyleSheet, View, Image, Text, Dimensions, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import { ConfirmDialog } from "react-native-simple-dialogs";
import Dialog, {
  DialogContent,
  SlideAnimation
} from "react-native-popup-dialog";

export default function Header({ navigation, title, icon }) {
  const ancho = Dimensions.get("window").width;
  const { as } = "";
  const alerta = true;

  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {icon ? (
        <View
          style={{
            flex: 1,
            paddingLeft: 180
          }}
        >
          <Icon
            name={icon}
            type="material-community"
            underlayColor="transparent"
            color="gray"
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
