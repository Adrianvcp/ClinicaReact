import React, { Component, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { View } from "react-native";
/* import { GOOGLE_API_KEY } from "react-native-dotenv"; //Styles
 */
//Components
/* import PlaceList from "../Place/PlaceList";
 */ import styles from "./styles";
import { withNavigation } from "react-navigation";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Input from "../Maps/Input";
import ActionButton from "react-native-action-button";
import Btn from "react-native-micro-animated-button";

const GOOGLE_API_KEY = "AIzaSyDfufIc7bjAp40d5LYtexhIW__3Yr-2Nrs";
const LATITUDE = 0.0;
const LONGITUDE = 0.0;

class MapScreen extends Component {
  //Set the HeaderTitle screen
  static navigationOptions = (props) => {
    const placeName = props.navigation.getParam("placeName");
    return { headerTitle: placeName.toUpperCase() };
  };

  constructor(props) {
    console.log("MOSTRANDO LA NAVEGACION");

    super(props);
    //Initial State
    this.state = {
      navigation: props.navigation,
      lat: LATITUDE,
      long: LONGITUDE,
      ubi: "",
      places: [],
      isLoading: false,
      placeType: "restaurant",
    };
  }

  getDistrict(lati, longi) {
    /* https://maps.googleapis.com/maps/api/geocode/json?latlng=-12.082962721932494,-77.09339214502931&sensor=true&key=AIzaSyDfufIc7bjAp40d5LYtexhIW__3Yr-2Nrs */
    const urlBase = `https://maps.googleapis.com/maps/api/geocode/json?`;
    const latlong = `latlng=${lati},${longi}&sensor=true`;
    const key = `&key=${GOOGLE_API_KEY}`;
    const url = urlBase + latlong + key;
    let resultado;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        resultado = res.results[4].address_components[1].long_name;
      });
  }

  findMe = async () => {
    this.watchID = await navigator.geolocation.watchPosition(({ coords }) => {
      const { latitude, longitude } = coords;

      const urlBase = `https://maps.googleapis.com/maps/api/geocode/json?`;
      const latlong = `latlng=${latitude},${longitude}&sensor=true`;
      const key = `&key=${GOOGLE_API_KEY}`;
      const url = urlBase + latlong + key;

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            ubi: res.results[4].address_components[1].long_name,
          });
        });

      /*       console.log(this.state.ubi);
       */ this.setState({
        lat: latitude,
        long: longitude,
      });
    });

    await navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => console.log(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  getData(loc) {
    const markers = [];
    const url = this.getPlacesUrl(
      10,
      10,
      10,
      10,
      loc.description,
      GOOGLE_API_KEY
    );

    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        res.results.map((element, index) => {
          const marketObj = {};
          marketObj.id = element.id;
          marketObj.name = element.name;
          marketObj.photos = element.photos;
          marketObj.rating = element.rating;
          /*           marketObj.vicinity = element.vicinity;
           */

          marketObj.marker = {
            latitude: element.geometry.location.lat,
            longitude: element.geometry.location.lng,
          };
          markers.push(marketObj);

          markers.push(marketObj);
        });
        //update
        this.setState({ places: markers });
      });
  }

  componentDidMount() {
    /*     console.log(this.props);
     */

    console.log("componentDidMount");
    const placeType = "Bank";
    this.setState({ placeType: placeType });

    this.getCurrentLocation();
    this.findMe();
  }

  /**
   * Get current user's position
   */
  getCurrentLocation() {
    console.log("getCurrentLocation");
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      this.setState({ lat: lat, long: long });
      this.getPlaces();
    });
  }

  /**
   * Get the Place URL
   */
  getPlacesUrl(lat, long, radius, type, querydat, apiKey) {
    /*     const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
     */
    console.log("getPlacesUrl");

    const baseUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?`;
    /*     const location = `location=${lat},${long}&radius=${radius}`;

    const typeData = `&types=${type}`;
         */
    const query = `&query=${querydat}`;

    const api = `&key=${apiKey}`;
    /*     return `${baseUrl}${location}${typeData}${api}`;
     */
    return `${baseUrl}${query}${api}`;
  }

  getPlaces() {
    console.log("getPlaces");
    const { lat, long, placeType } = this.state;
    const markers = [];
    const url = this.getPlacesUrl(
      lat,
      long,
      1500,
      "clinics",
      "asdasd",
      GOOGLE_API_KEY
    );
    /*     console.log(url);
     */ fetch(url)
      .then((res) => res.json())
      .then((res) => {
        res.results.map((element, index) => {
          const marketObj = {};
          marketObj.id = element.id;
          marketObj.name = element.name;
          marketObj.photos = element.photos;
          marketObj.rating = element.rating;

          marketObj.marker = {
            latitude: element.geometry.location.lat,
            longitude: element.geometry.location.lng,
          };

          markers.push(marketObj);
        });
        //update our places array
        this.setState({ places: markers });
      });
  }

  render() {
    const { lat, long, places, navigation } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.placeList}>
          <Input notifyChange={(loc) => this.getData(loc)} />
        </View>
        <View style={styles.mapView}>
          <MapView
            showsMyLocationButton={false}
            style={{
              flex: 1,
            }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            /* posicion donde estoy */
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {this.state.places.map((marker, i) => (
              <MapView.Marker
                key={i}
                coordinate={{
                  latitude: marker.marker.latitude,
                  longitude: marker.marker.longitude,
                }}
                title={marker.name}
                onPress={() => {
                  navigation.navigate("restaurants", {
                    lugar: marker.distrito,
                  });
                }}
              />
            ))}
          </MapView>
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "absolute",
            }}
          >
            <Btn
              label="Usar Ubicacion"
              ref={(ref) => (this.btn = ref)}
              onPress={() => {
                /*                 console.log("ESTADO");
                 */

                /*                 console.log(this.getDistrict(this.state.lat, this.state.long));
                 */ this.btn.success();
                navigation.navigate("restaurants", {
                  lugar: this.state.ubi,
                });
                /*                 console.log(this.state);
                 */
              }}
              successIcon="check"
            />
          </View>
        </View>

        {/*         <View style={styles.placeList}>
          <PlaceList places={places} />
        </View> */}
      </View>
    );
  }
}

export default MapScreen;
