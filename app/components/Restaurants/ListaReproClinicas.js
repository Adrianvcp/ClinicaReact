import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Image } from "react-native-elements";
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
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

export default function ListRestaurants(props) {
  const { navigation, info } = props;
  const restaurants = props.navigation.state.params.Data;
  console.log("aquasdai");
  console.log(props);
  const varHora = props.navigation.state.params.SearchHora;
  const varClinica = props.navigation.state.params.SearchClinica;

  const searchHora = useRef();
  const SearchClinica = useRef();

  const hideSearch = () => {
    searchHora.current.hide();
  };
  const [esp, setesp] = useState("");

  const show = () => searchHora.current.show();
  const countryOptions = [
    { label: "Denmark", value: "Denmark" },
    { label: "Germany", value: "Germany" },
    { label: "United State", value: "United State" },
  ];
  return (
    <View style={{ backgroundColor: "white" }}>
      {/* FILTRAR POR HORA */}
      {varHora ? (
        <View ref={searchHora} style={{ margin: 10, marginBottom: -20 }}>
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
      {varClinica ? (
        <View ref={SearchClinica} style={{ margin: 10, marginBottom: -20 }}>
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
      {/* LISTA DE CLINICAS */}
      {info ? (
        <View>
          <FlatList
            pagingEnabled
            disableScrollViewPanResponder
            style={{ overflow: "visible", height: height + 50, marginTop: 15 }}
            showsVerticalScrollIndicator={false}
            decelerationRate={0}
            snapToAlignment="center"
            data={info}
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

function Restaurant(props) {
  const { restaurant, navigation } = props;

  const {
    path,
    nombreDoctor,
    hora,
    url,
    name_clinic,
    id,
    phurl,
  } = restaurant.item;
  const [imageRestaurant, setImageRestaurant] = useState(null);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ marginBottom: 20 }}
      onPress={() => navigation.navigate("cita", { restaurant })}
    >
      <ImageBackground
        style={[styles.flex, styles.destination, styles.shadow]}
        imageStyle={{ borderRadius: clinics.sizes.radius }}
        source={{ uri: url }}
      >
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={{ flex: 0 }}>
            <Image
              source={{ uri: phurl }}
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
              {nombreDoctor}
            </Text>
            <Text style={{ color: clinics.colors.white, fontWeight: "bold" }}>
              <Octicons
                name="location"
                size={clinics.sizes.font * 0.8}
                color={clinics.colors.white}
              />
              <Text> {name_clinic}</Text>
            </Text>
          </View>
          <View
            style={{
              flex: 0,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text style={styles.rating}>{id}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
        <Text
          style={{
            fontSize: clinics.sizes.font * 1.25,
            fontWeight: "500",
            paddingBottom: 8,
          }}
        >
          {path}
        </Text>
        <View
          style={[
            styles.row,
            { justifyContent: "space-between", alignItems: "flex-end" },
          ]}
        >
          <Text style={{ color: "black" }}>{hora}</Text>

          <Text
            onPress={() => navigation.navigate("cita", { restaurant })}
            style={{ textAlign: "right" }}
          >
            Ver info
          </Text>
          <FontAwesome
            onPress={() => navigation.navigate("cita", { restaurant })}
            name="chevron-right"
            size={clinics.sizes.font * 0.75}
            color={clinics.colors.caption}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: "column",
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
      (width - clinics.sizes.padding * 4) / (Platform.OS === "ios" ? 3.2 : 3),
    backgroundColor: clinics.colors.white,
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
});
