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

import * as theme from "../../../themes/clinics";
const { width } = Dimensions.get("window");

/*----------- CUADRO DE DIALOGO - ACEPTAR O DECLINAR SOLICITUD -----------*/
import Dialog from "react-native-dialog";

import call from "react-native-phone-call";

export default function CitaSeleccionada(props) {
  console.log(props);
  const [dialogVisible, setdialogVisible] = useState(false);
  const [dialogVisibleRepro, setdialogVisibleRepro] = useState(false);

  const { navigation } = props;
  const { restaurant } = navigation.state.params;
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
    number: "986141854", // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
  };
  console.log(restaurant.item);

  /* FUNCIONES ANULAR */
  const showDialog = () => {
    setdialogVisible(true);
  };
  const handleCancel = () => {
    setdialogVisible(false);
  };
  const handleOK = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setdialogVisible(false);
    navigation.navigate("restaurants");
  };
  /* FUNCIONES REPROGRAMAR */
  const showDialogRepro = () => {
    setdialogVisibleRepro(true);
  };
  const handleCancelRepro = () => {
    setdialogVisibleRepro(false);
  };
  const handleOKRepro = () => {
    navigation.navigate("Repro", { navigation });
    setdialogVisibleRepro(false);
  };

  return (
    <View style={styles.flex}>
      <View style={[styles.flex]}>
        <ScrollView
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } },
          ])}
        >
          <Image
            source={{
              uri:
                "https://www.vesalio.com.pe/wp-content/uploads/2018/04/Oftalmolog%C3%ADa.jpg",
            }}
            resizeMode="cover"
            style={{
              position: "relative",
              width,
              height: width / 2,
            }}
          />
          {/*           <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              position: "absolute",
            }}
          >
            <View>
              <Icon
                containerStyle={{
                  marginTop: 70,
                  marginRight: 20,
                  marginLeft: 20,
                }}
                name="phone"
                type="material-community"
                underlayColor="transparent"
                color="white"
                size={20}
              />
            </View>
            <View>
              <Icon
                containerStyle={{ marginTop: 15 }}
                name="map-marker"
                type="material-community"
                underlayColor="transparent"
                color="white"
                size={20}
              />
            </View>
          </View> */}
        </ScrollView>
      </View>

      <View style={[styles.flex, styles.content]}>
        {/* INFO  -- DETALLE DE LAS CITAS*/}
        <View style={[styles.flex, styles.contentHeader]}>
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
                  {restaurant.item.name_clinic}
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
                  containerStyle={{ marginTop: -10 }}
                  name="map-marker"
                  type="material-community"
                  underlayColor="transparent"
                  reverse={true}
                  color="#EE272A"
                  size={15}
                />
              </TouchableOpacity>
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

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ height: 400, width: "60%" }}>
              <ScrollView>
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
                  <Text style={{ fontWeight: "100" }}>Dia: 13/04/20</Text>
                  <Text style={{ fontWeight: "100", marginTop: 3 }}>
                    {restaurant.item.nombreDoctor}
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
                        marginTop: 3,
                        fontWeight: "100",
                        color: "#007BFA",
                      }}
                      onPress={() =>
                        navigation.navigate("PerfilPaciente", { navigation })
                      }
                    >
                      Cesar Castro
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 0,
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
