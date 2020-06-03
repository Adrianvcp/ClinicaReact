import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
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
import { Alert } from "react-native";
import { AsyncStorage } from "react-native";
import { getEdad } from "../../utils/other";

function UserLogged(props) {
  //aumento esto
  const { navigation } = props;

  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const toastRef = useRef();

  useEffect(() => {
    //GET USER ID
    console.log("HOLi");
    async function getID() {
      var id = await AsyncStorage.getItem("id");
      console.log(id);
      try {
        //GET DATA USER
        var url =
          "https://easyappointment.azurewebsites.net/api/usuarios/{id}/pacientes/poseedor?id=" +
          id;

        console.log(url);
        var responseURL = await fetch(url);
        var json = await responseURL.json();

        //SEND THE INFO TO THE VARAIBLES
        setUserInfo(json);
        console.log("DATOS JSON:");
        console.log(json);
      } catch (error) {
        var Objid = await fetch(
          "https://easyappointment.azurewebsites.net/api/usuarios/" + id
        );
        var jsonID = await Objid.json();
        console.log(jsonID);
        var Obj = {
          nombre: "sin dato",
          apellidoPaterno: "sin",
          apellidoMaterno: "dato",
          dni: "sin dato",
          telefono: "sin dato",
          parentesco: "sin dato",
          edad: 30,
          correo: "sin dato",
          fechaNac: "sin dato",
          accountManagment: true,
          usuario: jsonID,
        };
        setUserInfo(Obj);
        Alert.alert("Error", "Todavia no se agregaron datos");
        console.log(error);
      }
    }
    //start function getID
    getID();
    //get Data User
  }, []);

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
        <View style={{ marginLeft: "5%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={
                (styles.tam,
                {
                  width: "81%",
                  fontSize: 18,
                  fontWeight: "100",
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                })
              }
            >
              Informacion Basica
            </Text>
            <TouchableOpacity>
              <Icon
                type="material-community"
                name="playlist-edit"
                underlayColor="transparent"
                size={15}
                iconStyle={{ fontSize: 24, marginLeft: 5, marginTop: 5 }}
                color="#1C90FF"
                reverse={true}
                containerStyle={{
                  marginTop: -19,
                  width: "100%",
                }}
                onPress={() => {
                  navigation.navigate("Mofificar", { userInfo: userInfo });
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.linea2}></View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              marginLeft: "6%",
              marginTop: "3%",
            }}
          >
            <Text style={styles.tam}>Nombres:</Text>

            <Text style={styles.tam}>Apellidos:</Text>

            <Text style={styles.tam}>Nacimiento:</Text>

            <Text style={styles.tam}>DNI:</Text>

            <Text style={styles.tam}>Telefono:</Text>
          </View>
          <View
            style={{
              marginTop: "3%",
              marginLeft: "2%",
            }}
          >
            <Text style={styles.tam}>{userInfo.nombre}</Text>

            <Text style={styles.tam}>
              {userInfo.apellidoPaterno + " " + userInfo.apellidoMaterno}
            </Text>

            <Text style={styles.tam}>{userInfo.fechaNac}</Text>

            <Text style={styles.tam}>{userInfo.dni}</Text>

            <Text style={styles.tam}>{userInfo.telefono}</Text>
          </View>
        </View>
        <View style={styles.linea}></View>
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
  btnCloseSessionText: {
    color: "#1e90ff",
  },
  tam: {
    fontSize: 17,
  },
  linea: {
    width: "90%",
    marginTop: "3%",
    marginBottom: "3%",
    justifyContent: "center",
    alignSelf: "center",
    borderBottomColor: "#9DA3B4",
    borderBottomWidth: 0.5,
  },
  linea2: {
    width: "90%",
    marginTop: -1,
    marginBottom: "3%",
    justifyContent: "center",
    alignSelf: "center",
    borderBottomColor: "#9DA3B4",
    borderBottomWidth: 0.5,
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
