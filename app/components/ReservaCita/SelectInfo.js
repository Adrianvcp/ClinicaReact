import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, StyleSheet } from "react-native";
import { Input, Icon } from "react-native-elements";

const ListaSeleccionar = () => {
  return (
    <RNPickerSelect
      onValueChange={value => console.log(value)}
      style={styles.inputAndroid}
      items={[
        { label: "Football", value: "football" },
        { label: "Baseball", value: "baseball" },
        { label: "Hockey", value: "hockey" }
      ]}
    ></RNPickerSelect>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#fff",
    marginRight: 40,
    marginLeft: 40,
    borderColor: "gray",
    paddingLeft: 13125,
    borderTopColor: "black"
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    marginRight: 100,
    paddingLeft: 100
  }
});
export default ListaSeleccionar;
