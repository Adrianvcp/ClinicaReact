import React, { useState, useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
import Loading from "../../components/Loading";
import Text from "../../components/loginstyle/Text";
import Block from "../../components/loginstyle/Block";
import { theme } from "../../constants";
import Toast from "react-native-easy-toast";
import Input from "../../components/loginstyle/Input";
import DatePicker from "react-native-datepicker";
import { Label } from "react-native-clean-form";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/loginstyle/Button";
import { añadirpaciente } from "../../utils/endpoints";

function RegisterForm(props) {
  
  const toastRef= useRef();
  const {navigation}= props;



  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [mode, setMode] = useState("date");
  const [correo, setCorreo] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setapellidoPaterno] = useState("");
  const [apellidoMaterno, setapellidoMaterno] = useState("");
  const [dni, setDni] = useState("");
  const [fnacimiento, setFnacimiento] = useState(new Date(1598051730000));
  const [edad, setEdad] = useState("");
  const [Telefono, setTelefono] = useState("");



  return (

<ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.formContainer}>
        <Block
          padding={[0, theme.sizes.base * 0.1]}
          paddingLeft={30}
          paddingRight={30}
        >
          <Block>
            <View>
              <Text style={{ paddingTop: 15, fontWeight: "100", fontSize: 20 }}>
                Informacion Basica:
              </Text>
              <Input
                label="Nombres"
                placeholder=""
                style={styles.input}
                onChange={(e) => setNombre(e.nativeEvent.text)}
               
              />

              <Input
                label="Apellido Paterno"
                placeholder=""
                style={styles.input}
                onChange={(e) => setapellidoPaterno(e.nativeEvent.text)}
               
              />
              <Input
                label="Apellido Materno"
                placeholder=""
                style={styles.input}
                onChange={(e) => setapellidoMaterno(e.nativeEvent.text)}
              
              />
              <Input
                label="DNI"
                placeholder=""
                style={styles.input}
                onChange={(e) => setDni(e.nativeEvent.text)}
              />

              <Label style={styles.input}>Fecha Nacimiento</Label>
              <DatePicker
                style={{
                  width: "100%",
                  /*                   backgroundColor: "red",
                   */
                }}
                date={fnacimiento}
                mode={mode}
                containerStyle={""}
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1900-05-01"
                maxDate="2026-05-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    borderWidth: 0,
                  },
                  dateInput: {
                    borderWidth: 0,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    borderBottomWidth: 1,
                    borderBottomColor: "#C5CCD6",
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(fnacimiento) => {
                  setFnacimiento(fnacimiento);
                }}
              />
              <Input
                label="Edad"
                placeholder=""
                style={styles.input}
                onChange={(e) => setEdad(e.nativeEvent.text)}
              />
                <Input
                label="Parentesco"
                placeholder=""
                style={styles.input}
                onChange={(e) => setParentesco(e.nativeEvent.text)}
              />    
               <Input
                label="Correo"
                placeholder=""
                style={styles.input}
                onChange={(e) => setCorreo(e.nativeEvent.text)}
              />
              <Input
                label="Telefono"
                placeholder=""
                style={styles.input}
                onChange={(e) => setTelefono(e.nativeEvent.text)}
              />

              <Button
                gradient
                containerStyle={styles.btnContainerNext}
                onPress={() => {
                  añadirpaciente(nombre, apellidoMaterno, apellidoPaterno, dni, Telefono, edad, fnacimiento,parentesco,correo,toastRef,navigation);
                }}
              >
                <Text bold white center>
                  Agregar Paciente
                </Text>
              </Button>

              <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
            </View>
     
            <Toast ref={toastRef} position="center" opacity={0,9}/>
          </Block>
        </Block>
      </View>
    </ScrollView>

  )
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,

    marginTop: 10,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
    marginBottom: 20,
  },
  btnContainerNext: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  input: {
    marginTop: -10,
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: 1,
  },
})
