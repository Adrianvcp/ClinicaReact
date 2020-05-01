import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
let { width, height } = Dimensions.get("window");

const LATITUDE = 0.0;
const LONGITUDE = 0.0;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = 0.05;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      width: width,
      marginBottom: 1,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }
  findMe = async () => {
    this.watchID = await navigator.geolocation.watchPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      this.setState({
        region: {
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      });
    });

    await navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
      },
      (error) => console.log(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  componentDidMount() {
    this.findMe();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    const { region } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={[styles.map, { width: this.state.width }]}
          style={StyleSheet.absoluteFill}
          onMapReady={() => console.log(this.state.region)}
          showsUserLocation
          followsUserLocation={true}
          region={region}
          showsMyLocationButton={true}
          // style={StyleSheet.absoluteFill}
          textStyle={{ color: "#bc8b00" }}
          containerStyle={{ backgroundColor: "white", borderColor: "#BC8B00" }}
        >
          <Marker
            draggable
            coordinate={this.state.region}
            title="You are here"
            // description="You are here"
            pinColor="blue"
            //onDragEnd={this.onUserPinDragEnd.bind(this)}
          />
        </MapView>
        {/* <Text>{this.state.region.latitude}</Text> */}
      </View>
    );
  }
}
Map.navigationOptions = {
  title: "Location",
  headerStyle: {
    backgroundColor: "#ff6666",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    flex: 1,
    alignItems: "center",
  },
  map: {
    position: "absolute",
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Map;
