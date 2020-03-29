import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, StyleSheet } from "react-native";
import { Input, Icon } from "react-native-elements";

const ListaSeleccionar = props => {
  const { titulo, nameIcon, itemsList } = props;
  const valor = "";

  return (
    <View>
      <Text style={styles.Titulo}>{titulo}</Text>
      <View style={[styles.container, styles.collegeContainer]}>
        <View style={styles.collegeIconColumn}>
          <Icon
            name={nameIcon}
            type="material-community"
            underlayColor="transparent"
            iconStyle={styles.collegeIcon}
            color="gray"
            size={20}
          />
        </View>
        <View style={styles.collegeColumn}>
          <RNPickerSelect
            placeholder={{
              label: "Seleccionar",
              value: null
            }}
            style={styles.veamos}
            items={itemsList}
            onValueChange={() => this.valor}
          />
        </View>
      </View>
      <View style={styles.lineStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    marginTop: -11
  },
  collegeContainer: {
    flex: 1
  },
  Titulo: {
    fontSize: 16,
    color: "#86939E",
    margin: 8,
    fontWeight: "bold"
  },
  collegeIconColumn: {
    flex: 2,
    justifyContent: "center"
  },

  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#fff",
    marginRight: 40,
    marginLeft: 40,
    textAlign: "left"
  },
  veamos: { marginTop: -14 },
  estructura: {
    flex: 1,
    marginTop: 15,
    backgroundColor: "#fff",
    marginRight: 40,
    marginLeft: 40,
    textAlign: "left"
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10,
    marginTop: -14,
    color: "#9CA6AF"
  },
  collegeColumn: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left"
  }
});

export default ListaSeleccionar;
