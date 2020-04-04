import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity
} from "react-native";
import SelectInfo from "../../components/ReservaCita/SelectInfo";
import RNPickerSelect from "react-native-picker-select";
import { Icon } from "react-native-elements";
import Dialog, {
  DialogContent,
  SlideAnimation
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
  Button
} from "react-native-clean-form";

import * as theme from "../../../themes/clinics";
const { width, height } = Dimensions.get("window");

export default function CitaSeleccionada(props) {
  const { navigation, alerta } = props;
  const { restaurant } = navigation.state.params;
  const data = [
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" }
  ];
  const [paciente, setpaciente] = useState("");
  const scrollX = new Animated.Value(0);
  const seguroData = [
    { label: "Pacifico Seguro", value: "Pacifico Seguro" },
    { label: "Pacifico Seguro 2", value: "Pacifico Seguro 2" },
    { label: "Pacifico Seguro 3", value: "Pacifico Seguro 3" }
  ];
  const [esp, setesp] = useState("");

  console.log(restaurant.item);

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
            { nativeEvent: { contentOffset: { x: scrollX } } }
          ])}
        >
          <Image
            source={{
              uri:
                "https://www.vesalio.com.pe/wp-content/uploads/2018/04/Oftalmolog%C3%ADa.jpg"
            }}
            resizeMode="cover"
            style={{
              position: "relative",
              width,
              height: width / 2
            }}
          />
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              position: "absolute"
            }}
          >
            <View>
              <Icon
                containerStyle={{
                  marginTop: 70,
                  marginRight: 20,
                  marginLeft: 20
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
          </View>
        </ScrollView>
      </View>

      <View style={[styles.flex, styles.content]}>
        {/* INFO  */}
        <View style={[styles.flex, styles.contentHeader]}>
          <Image
            style={[styles.avatar, styles.shadow]}
            source={{ uri: restaurant.item.phurl }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>Oftalmologia</Text>
            <Icon
              containerStyle={{ marginTop: 5, marginRight: 20, marginLeft: 20 }}
              name="phone"
              type="material-community"
              underlayColor="transparent"
              color="#2CBC00"
              size={30}
            />
            <Icon
              containerStyle={{ marginTop: 5 }}
              name="map-marker"
              type="material-community"
              underlayColor="transparent"
              color="#EE272A"
              size={30}
            />
          </View>
          <TouchableOpacity>
            <Text
              style={{ marginTop: 5, color: "#007BFA" }}
              onPress={() =>
                navigation.navigate("PerfilClinica", { navigation })
              }
            >
              {restaurant.item.name_clinic}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              width: "100%",
              borderWidth: 0.5,
              borderColor: "black",
              marginBottom: 10,
              marginTop: 10
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ height: 400, width: "60%" }}>
              <ScrollView>
                <View>
                  {/*                 <Text
                    style={{ fontWeight: "bold", marginTop: 10, color: "grey" }}
                  >
                    ESPECIALIDAD
                  </Text>
                  <Label>Especialidad</Label>
 */}
                  {/* DETALLE CITA */}

                  <Text
                    style={{ fontWeight: "bold", marginTop: 10, color: "grey" }}
                  >
                    DETALLE DE LA CITA
                  </Text>
                  <View style={{ flex: 1 }}></View>
                  <Label>Dia: 13/04/20</Label>
                  <Label>{restaurant.item.nombreDoctor}</Label>
                  <Label>{restaurant.item.path}</Label>

                  <Text
                    style={{ fontWeight: "bold", marginTop: 10, color: "grey" }}
                  >
                    PACIENTE
                  </Text>
                  <Select
                    name="esp"
                    label="esp"
                    options={seguroData}
                    placeholder="Sin seleccion"
                    value={esp}
                    onValueChange={a => setesp(a)}
                  />
                </View>
              </ScrollView>
            </View>
            <View
              style={{
                paddingTop: 10,
                width: "45%"
              }}
            >
              <Icon
                name="delete-forever-outline"
                type="material-community"
                underlayColor="transparent"
                color="#C9AB2A"
                size={40}
              />
              <Text style={{ textAlign: "center", marginBottom: 20 }}>
                ANULAR
              </Text>

              <Icon
                name="calendar-clock"
                type="material-community"
                underlayColor="transparent"
                color="#3394D5"
                size={40}
              />

              <Text style={{ textAlign: "center" }}>REPRO</Text>
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
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start" // if you want to fill rows left to right
  },
  def: {
    backgroundColor: "red"
  },
  column: {
    flexDirection: "column"
  },
  row: {
    flexDirection: "row"
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
    right: 0
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: "center",
    alignItems: "flex-start"
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
    marginTop: -theme.sizes.padding / 2
  },
  avatar: {
    position: "absolute",
    top: -theme.sizes.margin,
    right: theme.sizes.margin,
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  dotsContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 36,
    right: 0,
    left: 0
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: theme.colors.gray
  },
  title: {
    fontSize: theme.sizes.font * 2,
    fontWeight: "bold",
    width: width / 2
  },
  description: {
    fontSize: theme.sizes.font * 1.2,
    lineHeight: theme.sizes.font * 2,
    color: theme.colors.caption
  }
});
