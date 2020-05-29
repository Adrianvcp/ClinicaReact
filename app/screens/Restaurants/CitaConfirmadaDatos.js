import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Input, Icon, CheckBox } from "react-native-elements";
import Dialog, {
  SlideAnimation,
  DialogContent
} from "react-native-popup-dialog";

export default function CitaConfirmadaDatos(props) {
  const [checkedvar, setchecked] = useState(false);
  const [visibledialog, setvisdialog] = useState(true);
  const data = props.navigation.state.params.navigation.state.params.restaurant;
  console.log("por aqui");
  console.log(checkedvar);
  return (
    <View style={styles.viewBody}>
      <View>
        <Image
          source={require("../../../assets/img/carpeta.png")}
          style={styles.logo}
          reziseMode="contain"
        />
        <Text style={styles.description}>
          Reserva tu cita de acuerdo a la especialidad medica
        </Text>
      </View>

      <View style={{ marginLeft: 10, marginRight: 10 }}>
        {/*  ESPECIALIDAD*/}
        <View style={{ marginTop: 3, fontSize: 1 }}>
          <Input
            style={{ color: "red" }}
            containerStyle={styles.inputForm}
            leftIcon={{
              type: "material-community",
              name: "heart-pulse",
              color: "gray",
              size: 20
            }}
            timeZoneOffsetInMinutes={0}
            label="Especialidad"
          />
        </View>
        {/* DIA */}
        <View style={{ marginTop: 3 }}>
          <Input
            placeholder={"11/11/1996"}
            style={{ color: "red" }}
            containerStyle={styles.inputForm}
            leftIcon={{
              type: "material-community",
              name: "calendar-search",
              color: "gray",
              size: 20
            }}
            timeZoneOffsetInMinutes={0}
            label="Dia"
          />
        </View>
        {/* HORARIO */}
        <View style={{ marginTop: 3 }}>
          <Input
            placeholder={data.item.hora}
            style={{ color: "red" }}
            containerStyle={styles.inputForm}
            leftIcon={{
              type: "material-community",
              name: "calendar-clock",
              color: "gray",
              size: 20
            }}
            timeZoneOffsetInMinutes={0}
            label="Horario"
          />
        </View>
        {/* CLINICA */}
        <View style={{ marginTop: 3 }}>
          <Input
            placeholder={data.item.name_clinic}
            style={{ color: "red" }}
            containerStyle={styles.inputForm}
            leftIcon={{
              type: "material-community",
              name: "home-heart",
              color: "gray",
              size: 20
            }}
            timeZoneOffsetInMinutes={0}
            label="Clinica"
          />
        </View>
        {/* DOCTOR */}
        <View style={{ marginTop: 3 }}>
          <Input
            placeholder={data.item.nombreDoctor}
            style={{ color: "red" }}
            containerStyle={styles.inputForm}
            leftIcon={{
              type: "material-community",
              name: "account",
              color: "gray",
              size: 20
            }}
            timeZoneOffsetInMinutes={0}
            label="Doctor"
          />
        </View>
        {/* PACIENTE */}
        <View style={{ marginTop: 3 }}>
          <Input
            placeholder={"11/11/1996"}
            style={{ color: "red" }}
            containerStyle={styles.inputForm}
            leftIcon={{
              type: "material-community",
              name: "account-outline",
              color: "gray",
              size: 20
            }}
            timeZoneOffsetInMinutes={0}
            label="Paciente"
          />
        </View>
      </View>

      <Dialog
        visible={visibledialog}
        onTouchOutside={() => {
          setvisdialog(!visibledialog);
        }}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom"
          })
        }
      >
        <DialogContent>
          <Icon
            name="check-circle-outline"
            type="material-community"
            underlayColor="transparent"
            iconStyle={styles.collegeIcon}
            color="green"
            size={60}
          />
          <Text style={styles.title}>Reserva completada</Text>
          <Text style={styles.description}>Especialidad: Oftalmologia</Text>

          <Text style={styles.description}>Dia: 13/04/20</Text>

          <Text style={styles.description}>Horario: {data.item.hora}</Text>

          <Text style={styles.description}>
            Clinica: {data.item.name_clinic}{" "}
          </Text>

          <Text style={styles.description}>Paciente: Cesar Castro</Text>
          <CheckBox
            title="Notificar cita medica"
            checked={checkedvar}
            onPress={() => {
              setchecked(!checkedvar);
            }}
          />
        </DialogContent>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff"
  },
  collegeIconColumn: {
    flex: 2,
    justifyContent: "center"
  },
  linerstyle: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10,
    marginTop: -14,
    color: "#9CA6AF"
  },
  container: {
    marginBottom: 10,
    marginTop: -11
  },
  collegeContainer: {
    flex: 1
  },
  Titulo: {
    fontSize: 16,
    color: "#86939E",
    marginTop: 10,
    fontWeight: "bold"
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center"
  },
  description: {
    color: "grey",
    alignSelf: "center",
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center",
    marginTop: 4,
    fontSize: 17
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "#E1E6ED",
    marginLeft: 20,
    marginRight: 20
  },
  restaurantName: {
    fontWeight: "bold"
  },
  restaurantAddress: {
    paddingTop: 2,
    color: "grey"
  },
  restaurantDescription: {
    paddingTop: 10,
    color: "grey",
    width: 300
  },
  margenDetalle: {
    marginTop: 20,
    marginRight: 30,
    marginLeft: 30
  },
  collegeColumn: {
    flex: 8,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left"
  },
  estructura: {
    flex: 1,
    marginTop: 15,
    backgroundColor: "#fff",
    marginRight: 40,
    marginLeft: 40,
    textAlign: "left"
  },
  veamos: { marginTop: -14 }
});
