import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { Label, Select } from "react-native-clean-form";
import { Ionicons } from "@expo/vector-icons";
import MapView from "../../components/Mapa/JustMapa";
import Ubicacion from "../../screens/Restaurants/Ubicacion";
import * as theme from "../../../themes/clinics";
const { width } = Dimensions.get("window");
import { anularMiCita } from "../../utils/endpoints";
/*----------- CUADRO DE DIALOGO - ACEPTAR O DECLINAR SOLICITUD -----------*/
import Dialog from "react-native-dialog";

import call from "react-native-phone-call";
import { Alert } from "react-native";

export default function CitaSeleccionada(props) {
  console.log(props);
  const [dialogVisible, setdialogVisible] = useState(false);
  const [dialogVisibleRepro, setdialogVisibleRepro] = useState(false);

  const { navigation } = props;

  const { restaurant } = navigation.state.params;
  const { paciente } = restaurant.item;
  const { medico } = restaurant.item;
  const { ubicacion } = restaurant.item;
  const data = [
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" },
  ];
  const scrollX = new Animated.Value(0);
  const seguroData = [
    { label: "Pacifico Seguro", value: "Pacifico Seguro" },
    { label: "Pacifico Seguro 2", value: "Pacifico Seguro 2" },
    { label: "Pacifico Seguro 3", value: "Pacifico Seguro 3" },
  ];
  const [esp, setesp] = useState("");
  const args = {
    number: restaurant.item.ubicacion.clinica.telefono,
    prompt: false,
  };

  /* FUNCIONES ANULAR */
  const showDialog = () => {
    setdialogVisible(true);
  };
  const handleCancel = () => {
    setdialogVisible(false);
  };
  const handleOK = () => {
    /*UTILIZAR POST PARA ANULAR LA CITA*/
    setdialogVisible(false);
    try {
      anularMiCita(restaurant.item);
      navigation.navigate("restaurants");
      Alert.alert("Se elimino la cita.");
    } catch (error) {
      console.log(error);
    }
  };
  /* FUNCIONES REPROGRAMAR */
  const showDialogRepro = () => {
    setdialogVisibleRepro(true);
  };
  const handleCancelRepro = () => {
    setdialogVisibleRepro(false);
  };
  const handleOKRepro = () => {
    /*     navigation.navigate("Repro", { navigation });
     */
    /*     navigation.navigate("Repro", { navigation });
     */
    setdialogVisibleRepro(false);

    navigation.navigate("Repro", { seleccionada: restaurant.item });
  };

  return (
    <View style={styles.flex}>
      {/* ANULAR CITA */}
      <View>
        <Dialog.Container visible={dialogVisible}>
          <View>
            <Icon
              name="delete-circle"
              type="material-community"
              underlayColor="transparent"
              color="#52B1B1"
              size={100}
            />
          </View>

          <View>
            <Dialog.Title
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Desea anular su cita ?
            </Dialog.Title>

            <Dialog.Description style={{ marginTop: -1, textAlign: "center" }}>
              Aceptar si desea anular la cita:
            </Dialog.Description>

            <Dialog.Description style={{ marginTop: -1, textAlign: "center" }}>
              OFTAMOLOGIA
            </Dialog.Description>
            <Dialog.Description style={{ marginTop: -1, textAlign: "center" }}>
              DIA: {restaurant.item.fecha} - {restaurant.item.hora}
            </Dialog.Description>
            <Dialog.Description
              style={{ marginTop: -1, textAlign: "center", marginBottom: 15 }}
            >
              {restaurant.item.name_clinic}
            </Dialog.Description>
          </View>

          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="OK" onPress={handleOK} />
        </Dialog.Container>
      </View>

      {/* REPROGRAMAR CITA */}
      <View>
        <Dialog.Container visible={dialogVisibleRepro}>
          <View>
            <Icon
              name="delete-circle"
              type="material-community"
              underlayColor="transparent"
              color="#52B1B1"
              size={100}
            />
          </View>

          <View>
            <Dialog.Title
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Desea reprogramar su cita ?
            </Dialog.Title>

            <Dialog.Description style={{ marginTop: -1, textAlign: "center" }}>
              Aceptar si desea anular la cita:
            </Dialog.Description>

            <Dialog.Description style={{ marginTop: -1, textAlign: "center" }}>
              OFTAMOLOGIA
            </Dialog.Description>
            <Dialog.Description style={{ marginTop: -1, textAlign: "center" }}>
              DIA: {restaurant.item.fecha} - {restaurant.item.hora}
            </Dialog.Description>
            <Dialog.Description
              style={{ marginTop: -1, textAlign: "center", marginBottom: 15 }}
            >
              {restaurant.item.name_clinic}
            </Dialog.Description>
          </View>
          <Dialog.Button label="Cancel" onPress={handleCancelRepro} />
          <Dialog.Button label="OK" onPress={handleOKRepro} />
        </Dialog.Container>
      </View>

      <View>
        <Image
          source={{
            uri:
              "https://www.definicionabc.com/wp-content/uploads/2014/10/medicina-interna.jpg",
          }}
          resizeMode="cover"
          style={{
            position: "relative",
            width,
            height: width / 2,
          }}
        />
      </View>

      <View style={[styles.flex, styles.content]}>
        {/* INFO  -- DETALLE DE LAS CITAS*/}
        <View style={[styles.flex, styles.contentHeader]}>
          <Image
            style={[styles.avatar, styles.shadow]}
            source={{ uri: restaurant.item.phurl }}
          />
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "60%" }}>
              <Text style={styles.title}>Oftalmologia</Text>
              <TouchableOpacity>
                <Text
                  style={{ paddingTop: -100, color: "#007BFA" }}
                  onPress={() =>
                    navigation.navigate("PerfilClinica", { navigation })
                  }
                >
                  {restaurant.item.ubicacion.clinica.nombre}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "50%",
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 10,
              }}
            >
              <TouchableOpacity>
                <Icon
                  containerStyle={{
                    marginTop: 5,
                    marginRight: 20,
                    marginLeft: 40,
                  }}
                  name="phone"
                  type="material-community"
                  underlayColor="transparent"
                  color="#2CBC00"
                  size={25}
                  onPress={() => {
                    call(args).catch(console.error);
                  }}
                />
              </TouchableOpacity>

              {/*               <TouchableOpacity>
                <Icon
                  containerStyle={{ marginTop: 5 }}
                  name="map-marker"
                  type="material-community"
                  underlayColor="transparent"
                  color="#EE272A"
                  size={25}
                />
              </TouchableOpacity> */}
            </View>
          </View>

          <View
            style={{
              width: "100%",
              borderWidth: 0.5,
              borderColor: "black",
              marginBottom: 10,
              marginTop: 10,
            }}
          ></View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <View style={{ height: "100%", width: "60%" }}>
                <View>
                  {/* DETALLE CITA */}

                  <Text
                    style={{
                      fontWeight: "bold",
                      marginTop: 15,
                      marginBottom: 5,
                      color: "grey",
                    }}
                  >
                    DETALLE DE LA CITA
                  </Text>
                  <View style={{ flex: 1 }}></View>
                  <Text style={{ fontWeight: "100" }}>
                    Dia: {restaurant.item.fecha}
                  </Text>

                  <Text style={{ fontWeight: "100" }}>
                    Hora: {restaurant.item.hora}
                  </Text>

                  <Text style={{ fontWeight: "100", marginTop: 3 }}>
                    Doctor: {medico.nombre + " " + medico.apellidoPaterno}
                  </Text>
                  <Text style={{ fontWeight: "100", marginTop: 3 }}>
                    Sede: {restaurant.item.ubicacion.distrito}
                  </Text>

                  <Text style={{ fontWeight: "100", marginTop: 3 }}>
                    {restaurant.item.path}
                  </Text>

                  <Text
                    style={{ fontWeight: "bold", marginTop: 20, color: "grey" }}
                  >
                    PACIENTE
                  </Text>

                  <TouchableOpacity>
                    <Text
                      style={{
                        fontWeight: "100",
                        marginTop: 3,
                        color: "#007BFA",
                      }}
                      onPress={() =>
                        navigation.navigate("InfoUser", { navigation })
                      }
                    >
                      {paciente.nombre + " " + paciente.apellidoPaterno}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* ICONOS ->  ANULAR  Y REPROGRAMAR*/}
              <View
                style={{
                  paddingTop: 21.5,
                  width: "45%",
                }}
              >
                <View style={{ paddingLeft: 30 }}>
                  <Icon
                    name="delete-forever-outline"
                    type="material-community"
                    underlayColor="transparent"
                    color="#C9AB2A"
                    size={35}
                    onPress={showDialog}
                  />
                  <Text style={{ textAlign: "center", marginBottom: 20 }}>
                    ANULAR
                  </Text>
                </View>

                <View style={{ marginTop: 10, paddingLeft: 30 }}>
                  <Icon
                    name="calendar-clock"
                    type="material-community"
                    underlayColor="transparent"
                    color="#3394D5"
                    size={30}
                    onPress={showDialogRepro}
                  />
                  <Text style={{ textAlign: "center" }}>REPRO</Text>
                </View>
              </View>
            </View>
            <View style={{ height: 200, marginTop: 15 }}>
              <MapView navigation={navigation}></MapView>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  def: {
    backgroundColor: "red",
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  header: {
    // backgroundColor: 'transparent',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    // backgroundColor: theme.colors.active,
    // borderTopLeftRadius: theme.sizes.border,
    // borderTopRightRadius: theme.sizes.border,
  },
  contentHeader: {
    backgroundColor: "transparent",
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    marginTop: -theme.sizes.padding / 2,
  },
  avatar: {
    position: "absolute",
    top: -theme.sizes.margin,
    right: theme.sizes.margin,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  dotsContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 36,
    right: 0,
    left: 0,
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray,
  },
  title: {
    fontSize: theme.sizes.font * 2,
    fontWeight: "bold",
    width: width / 2,
  },
  description: {
    fontSize: theme.sizes.font * 1.2,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.caption,
  },
});
