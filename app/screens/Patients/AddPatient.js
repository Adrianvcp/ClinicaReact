import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { set } from "react-native-reanimated";
import { withNavigation } from "react-navigation";

function AddRestaurantForm(props) {
  const { navigation } = props;

  return (
    <ScrollView style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/foto.jpg")}
        style={styles.logo}
        reziseMode="contain"
      />

      <Text style={styles.title}>Información Basica</Text>

      <Text style={styles.description}>
        Ingresa la información basica de tu familiar
      </Text>
      <View style={styles.formContainer}>
        <Input
          placeholder="Nombres:"
          containerStyle={styles.inputForm}
          //onChange={e => setEmail(e.nativeEvent.text)}
        />
        <Input
          placeholder="Apellidos:"
          containerStyle={styles.inputForm}
          //onChange={e => setPassword(e.nativeEvent.text)}
        />

        <Input
          placeholder="DNI:"
          containerStyle={styles.inputForm}
          //onChange={e => setPassword(e.nativeEvent.text)}
        />

        <Input
          placeholder="Teléfono:"
          containerStyle={styles.inputForm}
          //onChange={e => setPassword(e.nativeEvent.text)}
        />

        <Input
          placeholder="Seguro:"
          containerStyle={styles.inputForm}
          //onChange={e => setPassword(e.nativeEvent.text)}
        />

        <Input
          placeholder="Correo:"
          containerStyle={styles.inputForm}
          //onChange={e => setPassword(e.nativeEvent.text)}
        />
        <Button
          containerStyle={styles.btnContainerLogin}
          buttonStyle={styles.btnCitas}
          title="Agregar familiar "
          onPress={() => navigation.navigate("AppointmentList")}
        />
      </View>
    </ScrollView>
  );
}

export default withNavigation(AddRestaurantForm);

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: "#fff"
  },
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
    //margin: 10,
    marginLeft: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 21,
    //marginBottom: 5,
    textAlign: "center"
  },
  description: {
    textAlign: "center",
    marginLeft: 27,
    marginRight: 27,
    fontSize: 16
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "#fff",
    marginRight: 40,
    marginLeft: 40,
    margin: 115
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  btnContainerLogin: {
    marginTop: 30,
    width: "95%"
  },
  btnCitas: {
    backgroundColor: "#1e90ff"
  }
});
