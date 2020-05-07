import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View } from "react-native";
/* import { GOOGLE_API_KEY } from "react-native-dotenv"; //Styles
 */
//Components
/* import PlaceList from "../Place/PlaceList";
 */ import styles from "../../screens/Maps/styles";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Input from "../../screens/Maps/Input";
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
    super(props);
    //Initial State
    this.state = {
      lat: 0.0,
      long: 0.0,
      places: [],
      isLoading: false,
      placeType: "restaurant",
    };
  }

  componentDidMount() {
    /*     console.log(this.props);
     */ const { navigation } = this.props;
    const { latitud, longitud } = navigation.state.params.restaurant.item;
    console.log(latitud, longitud);

    const placeType = "Bank";
    this.setState({ placeType: placeType });
    this.setState({ lat: latitud, long: longitud });
  }

  render() {
    const { lat, long, places } = this.state;
    console.log("CTMRRRRRRRRRRR");

    const {
      latitud,
      longitud,
    } = this.props.navigation.state.params.restaurant.item.ubicacion;
    console.log(latitud, longitud);
    const Objcorr = {
      latitude: parseFloat(-12.058229),
      longitude: parseFloat(-77.038408),
    };
    return (
      <View style={styles.container}>
        <View style={styles.mapView}>
          <MapView
            style={{
              flex: 1,
            }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: parseFloat(latitud),
              longitude: parseFloat(longitud),
              latitudeDelta: 0.02,
              longitudeDelta: 0.0,
            }}
          >
            <Marker coordinate={Objcorr} />
            {/*             {places.map((marker, i) => (
              <MapView.Marker
                key={i}
                coordinate={{
                                     latitude: marker.marker.latitude,
                  longitude: marker.marker.longitude, 
                  latitude: latitud,
                  longitude: longitud,
                }}
                title={marker.name}
              />
            ))} */}
          </MapView>
        </View>
      </View>
    );
  }
}

export default MapScreen;
