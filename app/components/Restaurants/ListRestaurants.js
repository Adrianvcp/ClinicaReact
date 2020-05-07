import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Image, Icon } from "react-native-elements";
import * as clinics from "../../../themes/clinics";
import {
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";

import { useState, useRef } from "react";
import {
  Fieldset,
  FormGroup,
  Label,
  Input,
  Select,
} from "react-native-clean-form";
import DatePicker from "react-native-datepicker";
import SelectInput from "react-native-select-input-ios";

import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

export default function ListRestaurants(props, abc) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("time");
  const { navigation } = props;
  const restaurants = props.navigation.state.params.res;
  const {
    SearchHora,
    SearchClinica,
  } = props.navigation.state.params; /*   const searchHora = useRef();
  onst SearchClinica = useRef();*/ /*   const hideSearch = () => {
    searchHora.current.hide();
  }; */
  /*   const {} = props.navigation.state.params;
   */ /* console.log("PROPS");
  console.log(props); */ const [
    esp,
    setesp,
  ] = useState("");

  /*   const show = () => searchHora.current.show();
   */ const countryOptions = [
    { label: "Denmark", value: "Denmark" },
    { label: "Germany", value: "Germany" },
    { label: "United State", value: "United State" },
  ];

  const segurosOptions = [{ value: 0, label: "Seleccionar" }];

  return (
    <View style={{ backgroundColor: "white" }}>
      {/* FILTRAR POR HORA */}
      {/*       {console.log("Datos: " + varHora + " " + varClinica)}
       */}
      {SearchHora ? (
        <View /* ref={searchHora} */ style={{ margin: 10, marginBottom: -20 }}>
          <Fieldset label="Filtrar por Hora" last>
            <FormGroup>
              <Label>HORA</Label>
              <Input placeholder="10:00 PM" />
            </FormGroup>
          </Fieldset>
        </View>
      ) : (
        <View></View>
      )}
      {/* FILTRAR POR CLINICA */}
      {SearchClinica ? (
        <View
          /* ref={SearchClinica} */ style={{ margin: 10, marginBottom: -20 }}
        >
          <Fieldset label="Filtrar por Clinica" last>
            <FormGroup>
              <Label>Clinica</Label>
              <Select
                name="esp"
                label="esp"
                options={countryOptions}
                placeholder="Sin seleccion"
                value={esp}
                onValueChange={(a) => setesp(a)}
              />
            </FormGroup>
          </Fieldset>
        </View>
      ) : (
        <View></View>
      )}

      {/* FILTROS */}

      <View>
        <View /* ref={searchHora} */ style={{ margin: 10, marginBottom: -20 }}>
          <Fieldset label="Filtrar por Hora" last>
            <FormGroup>
              <Label>HORA</Label>
              <DatePicker
                style={{
                  width: "40%",
                  marginLeft: width / 4,
                  /*                   backgroundColor: "red",
                   */
                }}
                date={date}
                mode={mode}
                containerStyle={""}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    borderWidth: 0,
                  },
                  dateInput: {
                    borderWidth: 0,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  setDate(date);
                }}
              />
            </FormGroup>
          </Fieldset>
        </View>

        <View
          /* ref={SearchClinica} */ style={{ margin: 10, marginBottom: -20 }}
        >
          <Fieldset label="Filtrar por Clinica" last>
            <FormGroup>
              <Label>Clinica</Label>
              <SelectInput
                value={esp ? esp : 0}
                options={segurosOptions}
                onCancelEditing={() => console.log("onCancel")}
                onSubmitEditing={(a) => setesp(a)}
                onValueChange={(a) => setesp(a)}
                style={[styles.selectInput, styles.selectInputLarge]}
                labelStyle={styles.selectInputInner}
              />
              {Platform.OS === "ios" ? (
                <View style={{ marginLeft: -5 }}>
                  <Icon name="menu-down" type="material-community" />
                </View>
              ) : (
                <View></View>
              )}
            </FormGroup>
          </Fieldset>
        </View>
      </View>

      {/* LISTA DE CLINICAS */}
      {restaurants ? (
        <View>
          <FlatList
            /*             pagingEnabled
            disableScrollViewPanResponder */
            style={{ overflow: "hidden", height: "100%", marginTop: 15 }}
            showsVerticalScrollIndicator={false}
            decelerationRate={0}
            snapToAlignment="center"
            data={restaurants}
            renderItem={(restaurant) => (
              <Restaurant restaurant={restaurant} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0}
          />
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" />
          <Text>Cargando resturants</Text>
        </View>
      )}
    </View>
  );
}
/* 
async function url(img) {
  const rpp = await fetch(img);
  const blob = await FileReader();
  var reader = new FileReader();
  reader.onload = () => {
    console.log(reader.result);
  };
  reader.readAsDataURL(blob);
} */

function Restaurant(props) {
  const { restaurant, navigation } = props;

  const parametrosBuscados = props.navigation.state.params.searchData;

  const { fecha, hora, id, medico } = restaurant.item;
  const { nombre, telefono, descripcion } = restaurant.item.ubicacion.clinica;

  const { img } = restaurant.item.ubicacion;
  const [imageRestaurant, setImageRestaurant] = useState(null);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ marginBottom: 20 }}
      onPress={() =>
        navigation.navigate("cita", { restaurant, parametrosBuscados })
      }
    >
      <ImageBackground
        style={[styles.flex, styles.destination, styles.shadow]}
        imageStyle={{ borderRadius: clinics.sizes.radius }}
        source={{
          uri:
            "https://www.clinicainternacional.com.pe/blog/wp-content/uploads/2018/07/clinica-internacional-crecimiento-anual.jpg",
        }}
      >
        <View style={{ marginBottom: 50 }}>
          <View
            style={[
              styles.row,
              {
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={{ flex: 0 }}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/44.jpg",
                }}
                borderRadius={1000}
                style={styles.avatar}
              />
            </View>

            <View
              style={[
                styles.column,
                { flex: 2, paddingHorizontal: clinics.sizes.padding / 2 },
              ]}
            >
              <Text style={{ color: clinics.colors.white, fontWeight: "bold" }}>
                {medico.nombre}
              </Text>
              <Text style={{ color: clinics.colors.white, fontWeight: "bold" }}>
                <Octicons
                  name="location"
                  size={clinics.sizes.font * 0.8}
                  color={clinics.colors.white}
                />
                <Text> {nombre}</Text>
              </Text>
            </View>
            <View
              style={{
                flex: 0,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              {/*               <Text style={styles.rating}>{id}</Text>
               */}
            </View>
          </View>
        </View>

        <View
          style={[
            styles.row,
            styles.destinationInfo,
            styles.shadow,

            { paddingTop: -30 },
          ]}
        >
          <View
            style={{
              marginTop: 5,
              marginLeft: -25,
              marginRight: 5,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, color: "green" }}>{hora}</Text>
          </View>
          <View
            style={{
              marginTop: 5,
              flexDirection: "column",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: clinics.sizes.font * 1.05,
                  fontWeight: "500",
                  marginTop: 5,
                }}
              >
                {fecha}
              </Text>
            </View>
            <View
              style={[
                styles.row,
                {
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                },
              ]}
            >
              {/*               <Text style={{ color: "black" }}>{hora}</Text>
               */}
              <Text
                onPress={() =>
                  navigation.navigate("cita", {
                    restaurant,
                    parametrosBuscados,
                  })
                }
                style={{ textAlign: "right" }}
              >
                Ver info
              </Text>
              <FontAwesome
                onPress={() =>
                  navigation.navigate("cita", {
                    restaurant,
                    parametrosBuscados,
                  })
                }
                name="chevron-right"
                size={clinics.sizes.font * 0.75}
                color={clinics.colors.caption}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  row: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },
  header: {
    backgroundColor: clinics.colors.white,
    paddingHorizontal: clinics.sizes.padding,
    paddingTop: clinics.sizes.padding * 1.33,
    paddingBottom: clinics.sizes.padding * 0.66,
    justifyContent: "space-between",
    alignItems: "center",
  },
  articles: {},
  destinations: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  destination: {
    width: width - clinics.sizes.padding,
    height: width * 0.5,
    marginHorizontal: 20,
    paddingHorizontal: clinics.sizes.padding,
    paddingVertical: clinics.sizes.padding * 0.66,
    borderRadius: clinics.sizes.radius,
  },
  destinationInfo: {
    position: "absolute",
    borderRadius: clinics.sizes.radius,
    paddingHorizontal: clinics.sizes.padding,
    paddingVertical: clinics.sizes.padding / 2,
    bottom: 20,
    left:
      (width - clinics.sizes.padding * 7) / (Platform.OS === "ios" ? 3.2 : 3),
    backgroundColor: "white",
    width: width - clinics.sizes.padding * 4,
  },
  recommended: {},
  recommendedHeader: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: clinics.sizes.padding,
  },
  recommendedList: {},
  recommendation: {
    width: (width - clinics.sizes.padding * 2) / 2,
    marginHorizontal: 8,
    backgroundColor: clinics.colors.white,
    overflow: "hidden",
    borderRadius: clinics.sizes.radius,
    marginVertical: clinics.sizes.margin * 0.5,
  },
  recommendationHeader: {
    overflow: "hidden",
    borderTopRightRadius: clinics.sizes.radius,
    borderTopLeftRadius: clinics.sizes.radius,
  },
  recommendationOptions: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: clinics.sizes.padding / 2,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    fontSize: clinics.sizes.font * 1.25,
    color: clinics.colors.white,
  },
  recommendationImage: {
    width: (width - clinics.sizes.padding * 2) / 2,
    height: (width - clinics.sizes.padding * 2) / 2,
  },
  avatar: {
    width: clinics.sizes.padding,
    height: clinics.sizes.padding,
    borderRadius: clinics.sizes.padding / 2,
  },
  rating: {
    fontSize: clinics.sizes.font * 2,
    color: clinics.colors.white,
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: clinics.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 5,
  },
  dots: {
    width: 10,
    height: 10,
    borderWidth: 2.5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: clinics.colors.gray,
    borderColor: "transparent",
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 6.25,
    borderColor: clinics.colors.active,
  },
  selectInput: {
    /*     backgroundColor: "red", */
    marginLeft: width / 5,
    marginTop: 5,
    overflow: "hidden",
    height: "50%",
  },
  selectInputLarge: {
    width: "30%",
  },
  selectInputInner: {
    borderRadius: 4,
  },
});
