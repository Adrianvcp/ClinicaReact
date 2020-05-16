import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

class Input extends Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder="Busca..."
        minLength={2}
        autoFocus={false}
        returnKeyType={"default"}
        fetcDetails={true}
        onPress={(data, details = null) => {
          this.props.notifyChange(details);
          /*           console.log(data);
          console.log(details.geometry); */
        }}
        query={{
          key: "AIzaSyDfufIc7bjAp40d5LYtexhIW__3Yr-2Nrs",
          language: "en",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        styles={{
          textInputContainer: {
            width: "100%",
          },
          description: {
            fontWeight: "bold",
          },
          listView: {
            backgroundColor: "transparent",
            /*             overflow: "hidden",
             */
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
      />
    );
  }
}

export default Input;
