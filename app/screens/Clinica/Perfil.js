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
import SelectInfo from "../../components/ReservaCita/SelectInfo";
import RNPickerSelect from "react-native-picker-select";
import { Icon } from "react-native-elements";
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog";
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

import * as theme from "../../../themes/clinics";
import call from "react-native-phone-call";

const { width, height } = Dimensions.get("window");

export default function CitaSeleccionada(props) {
  const { navigation, alerta } = props;
  const { restaurant } = navigation.state.params.navigation.state.params;
  const data = [
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" },
  ];
  const [paciente, setpaciente] = useState("");
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
  console.log(restaurant);

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
            source={{ uri: restaurant.item.url }}
            resizeMode="cover"
            style={{ width, height: width / 1.5 }}
          />
        </ScrollView>
      </View>

      <View style={[styles.flex, styles.content]}>
        {/* INFO  */}
        <View style={[styles.flex, styles.contentHeader]}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "70%" }}>
              <Text style={styles.title}>{restaurant.item.name_clinic}</Text>
              <Text>{restaurant.item.path}</Text>
            </View>
            <View
              style={{
                width: "30%",
                flexDirection: "row",
                justifyContent: "center",
                paddingLeft: 15,
              }}
            >
              <TouchableOpacity>
                <Icon
                  containerStyle={{ paddingRight: 15 }}
                  name="phone"
                  type="material-community"
                  underlayColor="transparent"
                  color="#1C90FF"
                  size={15}
                  reverse={true}
                  onPress={() => {
                    call(args).catch(console.error);
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="map-marker"
                  type="material-community"
                  underlayColor="transparent"
                  color="#1C90FF"
                  size={15}
                  reverse={true}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 400 }}>
            <ScrollView>
              <View>
                {/* DETALLE CITA */}
                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: 10,
                    color: "grey",
                    textAlign: "justify",
                  }}
                >
                  Estamos dedicados desde 1991 a brindarte una atención segura y
                  de calidad. Tenemos más de 5O especialidades médicas y un
                  staff de profesionales altamente calificados para atender
                  todas tus necesidades en salud. Nuestra amplia gama incluye
                  los servicios de atención ambulatoria, hospitalización y
                  emergencia las 24 horas y los 365 días del año. Somos parte
                  del selecto grupo de clínicas que poseen la más prestigiosa
                  acreditación en excelencia hospitalaria fuera de los Estados
                  Unidos, otorgada por la Joint Commission International (JCI).
                </Text>
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
    backgroundColor: theme.colors.active,
    borderTopLeftRadius: theme.sizes.border,
    borderTopRightRadius: theme.sizes.border,
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
});
