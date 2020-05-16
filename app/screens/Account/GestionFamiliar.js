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
} from "react-native";
import { Icon } from "react-native-elements";
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";
import * as clinics from "../../../themes/clinics";
import { Button } from "react-native-elements";

export default function NuevoPaciente(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const { width, height } = Dimensions.get("window");
  const restaurants = require("../../utils/dat.json");

  //esto es para que se muestre el boton de + solo cuando esta registrado
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/Familiar.jpeg")}
        style={styles.logo}
        reziseMode= "cover"
      />

      {/*       <Text style={styles.title}>Añade a un familiar!</Text>
      <Text style={styles.description}>
        Reserva una cita a tus familiares desde tu cuenta al instante
      </Text> */}
      <Text style={styles.title}>Agrega a tu familiar como paciente</Text>
      <FlatList
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
      
      {user && <AddPatientButton navigation={navigation} />}
      <ActionButton    
      
      gradient
      containerStyle={styles.btnAddPatient}
      onPress={() => {
        navigation.navigate("PacienteAgregar");
      }}
    >
     
    </ActionButton>




    </View>

  );
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
              uri: url,
            }}
            borderRadius={50}
            style={styles.imageRestaurant}
            PlaceholderContent={<ActivityIndicator color="fff" />}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.TitleNombre}>Cesar Castro</Text>
            <Text style={styles.restaurantAddress}>DNI: 12345678</Text>
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
            onPress={() => {
              navigation.navigate("Mofificar");
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
  }
 
});
