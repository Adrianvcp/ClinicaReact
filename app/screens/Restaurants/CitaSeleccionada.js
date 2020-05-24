import React, { useState, useRef, useEffect } from "react";
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
import SelectInfo from "../../components/ReservaCita/SelectInfo";
import RNPickerSelect from "react-native-picker-select";
import { Icon, CheckBox, Overlay } from "react-native-elements";
import { DialogContent, SlideAnimation } from "react-native-popup-dialog";
import {
  Input,
  Label,
  Switch,
  FormGroup,
  Fieldset,
  FieldsContainer,
  ActionsContainer,
  Select,
  Button,
} from "react-native-clean-form";
import Dialog from "react-native-dialog";
import MapView from "../../components/Mapa/JustMapa";
import SelectInput from "react-native-select-input-ios";
import * as theme from "../../../themes/clinics";
const { width, height } = Dimensions.get("window");
import { withNavigation } from "react-navigation";
import { AsyncStorage, Alert } from "react-native";
import base64 from "react-native-base64";
import { render } from "react-dom";

export default class CitaSeleccionada extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      navigation: props.navigation,
      confirmar: props.navigation.state.params.confirmar,
      parametrosBuscados: props.navigation.state.params.parametrosBuscados,
      restaurant: props.navigation.state.params.restaurant,
      item: props.navigation.state.params.restaurant.item,
      esp: "",
      sinSeleccion: "",
      login: false,
      opt_pac: [],
      patientsOptions: [{ value: 0, label: "Seleccionar" }],
      pacienteSeleccionado: {},
      checkedvar: false,
    };
  } // para listar pacientes x usuario
  /* var ObjP = {};
   */

  componentDidMount() {
    console.log("DIDMOUNT");
    /* Guardo los pacientes  */
    var Paci = async () => {
      const urlbase = `https://backendapplication-1.azurewebsites.net/api/usuarios/`;
      const id = await AsyncStorage.getItem("id");
      const url = urlbase + id + "/pacientes?id=" + id;
      console.log(url);
      fetch(url)
        .then((r) => r.json())
        .then((json) => {
          this.setState({ opt_pac: json });
          console.log(this.state.opt_pac);
          var ObjOpciones = [{ value: 0, label: "Seleccionar" }];
          for (let i = 0; i < this.state.opt_pac.length; i++) {
            const element = this.state.opt_pac[i];
            const obj = {
              value: element.id,
              label: element.nombre,
            };
            ObjOpciones.push(obj);
          }

          this.setState({ patientsOptions: ObjOpciones });
          console.log(this.state.patientsOptions);
        });

      if (id != null) {
        this.setState({ login: true });
      }
      return url;
    };

    Paci();

    //CUANDO DA CLICK EN CHECK
    console.log("check");
    console.log(this.state.confirmar);
    console.log("LOGIN DID MOUNT: " + this.state.login);
  }

  componentWillReceiveProps() {
    console.log("will");
    var verificarlogin = async () => {
      const id = await AsyncStorage.getItem("id");
      if (id != null) {
        this.setState({ login: true });
      }
    };

    verificarlogin();

    //si se encuentra logeado
    if (this.state.login == false) {
      Alert.alert("Error", "Debe iniciar sesion");
    } else {
      //verifico si se selecciono un paciente
      var patiseleccionado = {};
      const verificar = (index) => {
        //condicion
        if (
          parseInt(this.state.opt_pac[index].id) == parseInt(this.state.esp)
        ) {
          patiseleccionado = Object.assign({}, this.state.opt_pac[index]);
          console.log(patiseleccionado);
          return true;
        }
        if (
          index == 0 &&
          parseInt(this.state.opt_pac[index].id) != parseInt(this.state.esp)
        )
          return false;
        //denuevo
        return verificar(index - 1);
      };
      var respuesta = verificar(this.state.opt_pac.length - 1);

      if (respuesta == true) {
        const ObjPaciente = Object.assign({}, this.state.item);
        ObjPaciente["paciente"] = Object.assign({}, patiseleccionado);
        ObjPaciente["reserva"] = true;
        ObjPaciente["hora"] = ObjPaciente["fecha"] + "T" + ObjPaciente["hora"];

        try {
          fetch("https://backendapplication-1.azurewebsites.net/api/citas", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ObjPaciente),
          });

          console.log(JSON.stringify(ObjPaciente));

          Alert.alert("Reserva", "Reserva completada con exito");
          this.state.navigation.navigate("restaurants");
        } catch (error) {
          console.log(error);
          return;
        }
      } else {
        Alert.alert("Error", "Falta seleccionar paciente");
      }
    }
  }

  render() {
    return (
      <View style={styles.flex}>
        <Text>{String(this.state.login)}</Text>
        <View style={[styles.flexa]}>
          <Image
            source={{
              uri:
                "https://sites.google.com/site/multisaberes58/especialidades/shutterstock_426687286.jpg",
            }}
            resizeMode="cover"
            style={{ width, height: width / 2 }}
          />
        </View>

        <View style={[styles.flex, styles.content]}>
          {/* INFO  */}
          <View style={[styles.flex, styles.contentHeader]}>
            <Image
              style={[styles.avatar, styles.shadow]}
              source={{
                uri: base64.decode(this.state.item.medico.img),
                /* restaurant.item.phurl  */
              }}
            />

            <Text style={{ fontWeight: "bold", fontSize: 20, color: "grey" }}>
              {this.state.restaurant.item.ubicacion.clinica.nombre} -{" "}
              {this.state.restaurant.item.ubicacion.distrito}
            </Text>

            <View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <Text
                    style={{ fontWeight: "bold", marginTop: 10, color: "grey" }}
                  >
                    ESPECIALIDAD
                  </Text>
                  <Text style={{ fontWeight: "100", marginTop: 3 }}>
                    {this.state.parametrosBuscados.especialidad}
                  </Text>
                  {/* DETALLE CITA */}
                  <Text
                    style={{ fontWeight: "bold", marginTop: 10, color: "grey" }}
                  >
                    DETALLE DE LA CITA
                  </Text>
                  <View style={{ flex: 1 }}></View>
                  <Text style={{ fontWeight: "100", marginTop: 3 }}>
                    Dia: {this.state.parametrosBuscados.fecha}
                  </Text>
                  <Text style={{ fontWeight: "100", marginTop: 3 }}>
                    Doctor:{" "}
                    {this.state.restaurant.item.medico.nombre +
                      " " +
                      this.state.restaurant.item.medico.apellidoPaterno}
                  </Text>
                  <Text style={{ fontWeight: "100", marginTop: 3 }}>
                    Hora: {this.state.restaurant.item.hora}
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", marginTop: 10, color: "grey" }}
                  >
                    PACIENTE
                  </Text>

                  <View style={styles.dividir}>
                    <SelectInput
                      value={this.state.esp ? this.state.esp : 0}
                      options={this.state.patientsOptions}
                      onCancelEditing={() => console.log("onCancel")}
                      onSubmitEditing={(a) => this.setState({ esp: a })}
                      onValueChange={(a) => this.setState({ esp: a })}
                      style={[styles.selectInput, styles.selectInputLarge]}
                      labelStyle={styles.selectInputInner}
                    />
                    {Platform.OS === "ios" ? (
                      <View style={{ borderBottomWidth: 0.3 }}>
                        <Icon name="menu-down" type="material-community" />
                      </View>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>

                <View style={{ height: 200 }}>
                  <MapView navigation={this.state.navigation}></MapView>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "white",
  },
  flexa: {
    flex: 0,
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  dividir: { width: "130%", flexDirection: "row", marginBottom: 10 },

  selectInput: {
    /*     backgroundColor: "red",
     */ marginTop: 5,
    borderBottomWidth: 0.3,
    overflow: "hidden",
  },
  selectInputLarge: {
    width: "50%",
  },
  selectInputInner: {
    borderRadius: 4,
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
  },
  description: {
    fontSize: theme.sizes.font * 1.2,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.caption,
  },
  textoMenu: {
    alignSelf: "center",
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center",
    marginTop: 4,
    fontSize: 17,
  },
  btnContainerNext: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});
