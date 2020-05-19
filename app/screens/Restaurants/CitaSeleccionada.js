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



function CitaSeleccionada(props) {
  const parametrosBuscados = props.navigation.state.params.parametrosBuscados;
  const confirmar = props.navigation.state.params.confirmar;

  const [checkedvar, setchecked] = useState(false);
  const { navigation, alerta } = props;
  const { restaurant } = navigation.state.params;
  const { item } = navigation.state.params.restaurant;

  const data = [
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" },
  ];
  const scrollX = new Animated.Value(0);
  const [esp, setesp] = useState("");
  const [sinSeleccion, setsinSeleccion] = useState("Sinseleccion");
  const [login, setlogin] = useState("false");
  var ObjP = {};
  // para listar pacientes x usuario

  async function Paci() {
    // para listar pacientes x usuario
    await AsyncStorage.getItem("id").then((v) => console.log("jiji:" + v));
    const urlbase = `https://backendapplication-1.azurewebsites.net/api/usuarios/`;
    const id = await AsyncStorage.getItem("id");
    const url = urlbase + id + "/pacientes?id=" + id;

    console.log(url);

    return url;
  }

  const [opt_pac, setOptPac] = useState([]);
  useEffect(() => {
    Paci().then((url) => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => setOptPac(json))
        .catch((error) => console.error(error));
    });
  }, []);

  const patientsOptions = [{ value: 0, label: "Seleccionar" }];

  for (let i = 0; i < opt_pac.length; i++) {
    const element = opt_pac[i];
    const obj = {
      value: element.id,
      label: element.nombre,
    };

    patientsOptions.push(obj);
  }

  //

  const keydata = async () => {
    const lg = await AsyncStorage.getItem("keyuser").then((a) => {
      console.log("asd");
      console.log(a);
      setlogin(a);
    });
  };

  const menu = useRef();
  /* FUNCIONES ANULAR */
  const showDialog = () => {
    setdialogVisible(true);
  };
  const handleCancel = () => {
    confirmar === false;
  };
  const handleOK = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    confirmar === false;
  };

  const showMenu = () => menu.current.show();
  /* const blabla = () => {
    keydata();
    if (login != "true") {
      alert("No inicio sesion");
    }
  };
*/
  {
    confirmar ? console.log(objPaciente()) : console.log("nada");
  }

  function objPaciente() {
    for (let i = 0; i < opt_pac.length; i++) {
      if (parseInt(opt_pac[i].id) == parseInt(esp)) {
        ObjP = opt_pac[i];
        break;
      }
      console.log("No se encontro el paciente en el arreglo obtenido");
            

    }

    console.log(ObjP);
    const ObjPaciente = Object.assign({}, item);

    /* pOST */
    /* Armo la info para enviar  */
    ObjPaciente["paciente"] = Object.assign({}, ObjP);
    ObjPaciente["reserva"] = true;
    ObjPaciente["hora"] = ObjPaciente["fecha"] + "T" + ObjPaciente["hora"];
    console.log(JSON.stringify(ObjPaciente));

    try {
      fetch("https://backendapplication-1.azurewebsites.net/api/citas", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ObjPaciente),
      });

      //Alert.alert("Reserva", "Cita reservada correctamente");
      confirmar = false;
      //navigation.navigate("UserLoggued");
      /* Como mejora -> confirmar cambiarlo a Asyncstorage en vez de enviar un paramtro */
    } catch (error) {
      console.log(error);
      
    }
  }

 return (
<View style={styles.flex}>
     
      <View>
        <Dialog.Container visible={login && confirmar}>
          <View>
            <Icon
              name="calendar-clock"
              type="material-community"
              underlayColor="transparent"
              iconStyle={styles.collegeIcon}
              color="gray"
              size={60}
            />
          </View>

          <View>
            <Dialog.Title
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Reserva Completada{" "}
            </Dialog.Title>
                
             
            <Dialog.Description style={styles.textoMenu}>
              Especialidad: {parametrosBuscados.especialidad}
            </Dialog.Description>
            <Dialog.Description style={styles.textoMenu}>
              Dia: {parametrosBuscados.fecha}
            </Dialog.Description>
            <Dialog.Description style={styles.textoMenu}>
              Horario:{restaurant.item.hora}
            </Dialog.Description>
            <Dialog.Description style={styles.textoMenu}>
              {restaurant.item.ubicacion.clinica.nombre}
            </Dialog.Description>
            <Dialog.Description style={styles.textoMenu}>
              Sede:{restaurant.item.ubicacion.distrito}
            </Dialog.Description>

            <CheckBox
              title="Notificar cita medica"
              checked={checkedvar}
              onPress={() => {
                setchecked(!checkedvar);
              }}
            />
          </View>

          <Dialog.Button
            label="Cancelar"
            onPress={() => {
              navigation.navigate("cita", { navigation, confirmar: false });
            }}
          />

          <Dialog.Button
            label="ACEPTAR"
            onPress={() => {
              
              navigation.navigate("cita",{ navigation,confirmar:false});
              navigation.navigate("restaurants");
            }}
          />
        </Dialog.Container>
      </View>
      <View style={[styles.flexa]}>
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
                "https://sites.google.com/site/multisaberes58/especialidades/shutterstock_426687286.jpg",
            }}
            resizeMode="cover"
            style={{ width, height: width / 2 }}
          />
        </ScrollView>
      </View>

      <View style={[styles.flex, styles.content]}>
        {/* INFO  */}
        <View style={[styles.flex, styles.contentHeader]}>
          <Image
            style={[styles.avatar, styles.shadow]}
            source={{
              uri:
                /* restaurant.item.phurl  */
                "https://randomuser.me/api/portraits/women/44.jpg",
            }}
          />

          <Text style={{ fontWeight: "bold", fontSize: 20, color: "grey" }}>
            {restaurant.item.ubicacion.clinica.nombre} -{" "}
            {restaurant.item.ubicacion.distrito}
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
                  {parametrosBuscados.especialidad}
                </Text>
                {/* DETALLE CITA */}
                <Text
                  style={{ fontWeight: "bold", marginTop: 10, color: "grey" }}
                >
                  DETALLE DE LA CITA
                </Text>
                <View style={{ flex: 1 }}></View>
                <Text style={{ fontWeight: "100", marginTop: 3 }}>
                  Dia: {parametrosBuscados.fecha}
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 3 }}>
                  Doctor:{" "}
                  {restaurant.item.medico.nombre +
                    " " +
                    restaurant.item.medico.apellidoPaterno}
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 3 }}>
                  Hora: {restaurant.item.hora}
                </Text>
                <Text
                  style={{ fontWeight: "bold", marginTop: 10, color: "grey" }}
                >
                  PACIENTE
                </Text>

                <View style={styles.dividir}>
                  <SelectInput
                    value={esp ? esp : 0}
                    options={patientsOptions}
                    onCancelEditing={() => console.log("onCancel")}
                    onSubmitEditing={(a) => setesp(a)}
                    onValueChange={(a) => setesp(a)}
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
                <MapView navigation={navigation}></MapView>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
    );
    
}

export default withNavigation(CitaSeleccionada);


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
