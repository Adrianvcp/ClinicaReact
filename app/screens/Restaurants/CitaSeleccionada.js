import React, { useState, useRef } from "react";
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
import { Icon, CheckBox } from "react-native-elements";
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
import SelectInput from "react-native-select-input-ios";
import * as theme from "../../../themes/clinics";
const { width, height } = Dimensions.get("window");

export default function CitaSeleccionada(props) {
  const confirmar = props.navigation.state.params.confirmar;
  console.log(props.navigation.state.params);
  console.log(props.navigation.state.params.confirmar);
  console.log(confirmar);
  const [checkedvar, setchecked] = useState(false);
  const { navigation, alerta } = props;
  const { restaurant } = navigation.state.params;
  const data = [
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" },
  ];
  const [paciente, setpaciente] = useState("");
  const scrollX = new Animated.Value(0);
  const [esp, setesp] = useState("");
  const [sinSeleccion, setsinSeleccion] = useState("Sinseleccion");

  const seguroData = [
    { value: 0, label: "Paciente 1" },
    { value: 1, label: "Paciente 2" },
    { value: 2, label: "Paciente 3" },
    { value: 3, label: "Paciente 4" },
  ];

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
    setconfirmar(false);
  };

  const showMenu = () => menu.current.show();

  return (
    <View style={styles.flex}>
      {/* ANULAR CITA */}
      <View>
        <Dialog.Container visible={confirmar}>
          <View>
            {/*             <Icon
              name="delete-circle"
              type="material-community"
              underlayColor="transparent"
              color="#52B1B1"
              size={100}
            /> */}
            <Icon
              name="check-circle-outline"
              type="material-community"
              underlayColor="transparent"
              iconStyle={styles.collegeIcon}
              color="green"
              size={60}
            />
          </View>

          <View>
            {/*             <Dialog.Title
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
              DIA:11/11/1996 - {restaurant.item.hora}
            </Dialog.Description>
            <Dialog.Description
              style={{ marginTop: -1, textAlign: "center", marginBottom: 15 }}
            >
              {restaurant.item.name_clinic}
            </Dialog.Description> */}
            <Dialog.Title
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Reserva completada{" "}
            </Dialog.Title>
            {/*             <Text style={styles.title}>Reserva completada</Text>
             */}
            <Dialog.Description style={styles.textoMenu}>
              Especialidad: Oftalmologia
            </Dialog.Description>
            <Dialog.Description style={styles.textoMenu}>
              Dia: 13/04/20
            </Dialog.Description>
            <Dialog.Description style={styles.textoMenu}>
              Horario:
            </Dialog.Description>
            <Dialog.Description style={styles.textoMenu}>
              Clinica:
            </Dialog.Description>
            <Dialog.Description style={styles.textoMenu}>
              Paciente: Cesar Castro
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
            label="Cancel"
            onPress={() => {
              navigation.navigate("cita", { navigation, confirmar: false });
            }}
          />
          <Dialog.Button label="OK" onPress={handleOK} />
        </Dialog.Container>
      </View>

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
            source={{ uri: restaurant.item.url }}
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
            source={{ uri: restaurant.item.phurl }}
          />

          <Text style={styles.title}>{restaurant.item.name_clinic}</Text>

          <View style={{ height: 400 }}>
            <ScrollView>
              <View>
                <Text
                  style={{ fontWeight: "bold", marginTop: 10, color: "grey" }}
                >
                  ESPECIALIDAD
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 3 }}>
                  Especialidad
                </Text>
                {/* DETALLE CITA */}
                <Text
                  style={{ fontWeight: "bold", marginTop: 10, color: "grey" }}
                >
                  DETALLE DE LA CITA
                </Text>
                <View style={{ flex: 1 }}></View>
                <Text style={{ fontWeight: "100", marginTop: 3 }}>
                  Dia: 13/04/20
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 3 }}>
                  {restaurant.item.nombreDoctor}
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 3 }}>
                  {restaurant.item.path}
                </Text>
                <Text
                  style={{ fontWeight: "bold", marginTop: 10, color: "grey" }}
                >
                  PACIENTE
                </Text>
                {/*                 <Select
                  name="esp"
                  label="esp"
                  options={seguroData}
                  placeholder="Sin seleccion"
                  value={esp}
                  onValueChange={(a) => setesp(a)}
                /> */}
                {/* LISTA ESPECIALIDAD */}
                <View style={styles.dividir}>
                  <SelectInput
                    value={esp ? esp : 0}
                    options={seguroData}
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
            </ScrollView>
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
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  dividir: { width: "100%", flexDirection: "row" },

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
});
