import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { Icon } from "react-native-elements";
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";
import * as clinics from "../../../themes/clinics";
import { Button } from "react-native-elements";

const { width, height } = Dimensions.get("window");

export default class NuevoPaciente extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: props.navigation,
      isLoading: false,
      refreshing: false,
      listapacientes: [],
      error: null,
    };
  }

  pacientes = async () => {
    var id = await AsyncStorage.getItem("id");

    const resp = await fetch(
      "https://easyappointment.azurewebsites.net/api/usuarios/{id}/pacientes?id=" +
        id
    );

    const json = await resp.json();
    this.setState({ listapacientes: json });
    this.setState({ isLoading: false, refreshing: false });
  };

  actualizar = () => {
    this.setState({ refreshing: true }, () => {
      this.pacientes();
    });
  };

  componentDidMount() {
    var keys = async () => {
      var id = await AsyncStorage.getItem("id");
      var res = await fetch(
        "https://easyappointment.azurewebsites.net/api/usuarios/{id}/pacientes?id=" +
          id
      );
      var res2 = await res.json();
      this.setState({ listapacientes: res2 });
    };

    keys();
  }

  pacientespasar(json) {
    this.setState({
      listapacientes: json,
    });
  }

  render() {
    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/Familiar.jpeg")}
          style={styles.logo}
          reziseMode="cover"
        />

        <Text style={styles.title}>Agrega a tu familiar como paciente</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          decelerationRate={0}
          snapToAlignment="center"
          data={this.state.listapacientes}
          renderItem={(restaurant) => (
            <Restaurant
              restaurant={restaurant}
              navigation={this.state.navigation}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0}
          refreshing={this.state.refreshing}
          onRefresh={this.actualizar}
        />

        <AddPatientButton navigation={this.state.navigation} />
        <ActionButton
          gradient
          containerStyle={styles.btnAddPatient}
          onPress={() => {
            this.state.navigation.navigate("PacienteAgregar");
          }}
        ></ActionButton>
      </View>
    );
  }
}

function AddPatientButton(props) {
  const { navigation } = props;
  return (
    <ActionButton
      buttonColor="#1e90ff"
      /*       onPress={() => navigation.navigate("AddPatient")}
       */ onPress={() => navigation.navigate("PacienteAgregar")}
    />
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;

  console.log(restaurant);
  const {
    accountManagment,
    apellidoMaterno,
    apellidoPaterno,
    correo,
    dni,
    edad,
    fechaNac,
    nombre,
    parentesco,
    telefono,
  } = restaurant.item;
  const [imageRestaurant, setImageRestaurant] = useState(null);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ marginBottom: 10, marginTop: 10 }}
      onPress={() => {
        navigation.navigate("InfoUser");
      }}
    >
      <View
        style={[
          styles.viewRestaurant,
          styles.shadow,
          styles.destinationInfo2,
          /* { backgroundColor: "yellow" } */
          ,
        ]}
      >
        <View style={styles.viewRestaurantImage}>
          <Image
            resizeMode="cover"
            source={{
              uri: "https://nulm.gov.in/images/user.png",
            }}
            borderRadius={50}
            style={styles.imageRestaurant}
            PlaceholderContent={<ActivityIndicator color="fff" />}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.TitleNombre}>
              {nombre + " " + apellidoMaterno}
            </Text>
            <Text style={styles.restaurantAddress}>DNI: {dni}</Text>
          </View>

          <Icon
            type="material-community"
            name="chevron-right"
            underlayColor="transparent"
            size={15}
            iconStyle={{ fontSize: 24, marginLeft: 5, marginTop: 5 }}
            color="grey"
            reverse={true}
            containerStyle={{
              marginTop: 5,
              marginLeft: "10%",
              width: "100%",
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
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
  imageRestaurant: {
    width: 60,
    height: 60,
  },
  viewRestaurantImage: {
    marginRight: 30,
  },
  viewRestaurant: {
    flexDirection: "row",
    borderRadius: 20,
    borderColor: "green",
    backgroundColor: "white",
  },
  destinationInfo2: {
    borderRadius: clinics.sizes.radius,
    paddingHorizontal: clinics.sizes.padding,
    paddingVertical: clinics.sizes.padding / 2,
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: clinics.colors.white,
  },
  btnAddPatient: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  logo: {
    width: "100%",
    height: 180,
    marginTop: 0,
    margin: 25,
    marginLeft: 0,
  },
  title: {
    fontWeight: "bolder",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "100",
  },
  TitleNombre: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    marginBottom: 20,
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
    fontSize: 14,
  },
});
