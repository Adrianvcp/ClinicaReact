import Toast, { DURATION } from "react-native-easy-toast";
import { AsyncStorage } from "react-native";
import { withNavigation } from "react-navigation";
import { isEmpty } from "lodash";
import { Alert } from "react-native";
import { reload } from "expo/build/Updates/Updates";
async function funcionA() {
  const dato = {};
  await navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude);
    dato = {
      lat: latitude,
      long: longitude,
    };

    console.log(dato);
  });
}

async function ep_listUsuarios(
  correo,
  new_pass,
  RePassword,
  toastRef,
  navigation
) {
  var listUsers;
  var json;

  if (!correo || !new_pass || !RePassword) {
    toastRef.current.show("Todos los campos son obligatorios", 5000);
  } else {
    if (new_pass !== RePassword) {
      toastRef.current.show("Las contraseñas deben ser iguales", 5000);
    } else {
      try {
        const resp = await fetch(
          "http://easyappointment.azurewebsites.net/api/usuarios"
        );
        json = await resp.json();
        for (var i = 0; i < json.length; ++i) {
          console.log(json[i].correo + "  " + correo);
          var ObjData = {};

          if (json[i].correo == correo) {
            try {
              (ObjData.correo = json[i].correo),
                (ObjData.enable = true),
                (ObjData.id = json[i].id),
                (ObjData.password = new_pass);

              const resp = await fetch(
                "http://easyappointment.azurewebsites.net/api/usuarios/" +
                  json[i].id,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                  },
                  body: JSON.stringify(ObjData),
                }
              );
              break;
            } catch (error) {
              toastRef.current.show("Error de actualizacion", 5000);
              console.log("ERROR AL ACTUALIZAR");
            }
          }
        }
        toastRef.current.show("Contraseña actualizada", 5000);
        setTimeout(() => {
          console.log("sdas");
        }, 80000);
        //navigation.navigate("MyAccount");
      } catch (error) {
        console.log("ERROR LISTA DE USUARIOS");
      }
    }
  }
}

async function ep_login(email, password, navigation, toastRef) {
  if (isEmpty(email)) {
    toastRef.current.show("Por favor, ingrese el correo electrónico", 5000);
  } else if (isEmpty(password)) {
    toastRef.current.show("Por favor, ingrese su contraseña", 5000);
  } else {
    const urlbase = `http://easyappointment.azurewebsites.net/api/usuarios/login?`;
    const correo = `correo=${email.trim()}`;
    const pass = `&password=${password}`;
    const url = urlbase + correo + pass;
    var json;
    /* console.log(url); */
    try {
      const respuesta = await fetch(url);
      json = await respuesta.json();

      /* guardar en Asynstorage */

      const keyUser = async () => {
        try {
          await AsyncStorage.setItem("keyuser", "true");
          await AsyncStorage.setItem("id", String(json.id));
        } catch (error) {
          console.log("error");
        }
      };

      keyUser();
      /*       keyUser().then(() => {
        if (email.trim() == "admin01@easyAppointme.com.pe") {
          reload();
        }
      }); */
    } catch (error) {
      toastRef.current.show("Correo y/o contraseña incorrecta", 5000);
    }

    navigation.navigate("Welcome", { user: json.id });
  }
}

async function ep_login2(email, password, navigation, toastRef) {
  console.log("funcion login");
  console.log(email, password);
  const urlbase = `http://easyappointment.azurewebsites.net/api/usuarios/login?`;
  const correo = `correo=${email.trim()}`;
  const pass = `&password=${password}`;
  const url = urlbase + correo + pass;
  var json;
  console.log(url);
  try {
    const respuesta = await fetch(url);
    json = await respuesta.json();

    /* guardar en Asynstorage */
    console.log("aqii?");
    const keyUser = async () => {
      try {
        console.log("intentando");

        await AsyncStorage.setItem("keyuser", "true");
        await AsyncStorage.setItem("id", String(json.id));
        console.log("paso a guardarlo");
      } catch (error) {
        console.log("error");
      }
    };

    keyUser();
  } catch (error) {
    //  toastRef.current.show("Usuario y/o contraseña incorrecta", 1000);
  }
  /* ANTES WELCOME */
  navigation.navigate("formuDatos", { user: json.id });
}

function routeDinamic() {
  try {
    const keyUser = async () => {
      try {
        const urlbase =
          "https://easyappointment.azurewebsites.net/api/usuarios/";
        const id = await AsyncStorage.getItem("id");
        const url = urlbase + id;
        console.log(url);
        var json;

        const respuesta = await fetch(url);
        json = await respuesta.json();
        console.log(json);
        if (json.enable == true) {
          console.log("entre");
          /*           navigation.navigate("Welcome", { user: json.id });
           */
        } else {
          /*           navigation.navigate("MyAccount");
           */
        }
      } catch (error) {
        console.log(error);
      }
    };

    /* guardar en Asynstorage */
    keyUser();
  } catch (error) {
    Alert.alert("error", "puta weon vamos mal :s ");
  }
}

async function registrodatos(
  nombre,
  apellidoMaterno,
  apellidoPaterno,
  dni,
  Telefono,
  fnacimiento,
  toastRef,
  navigation
) {
  // const { navigation} = props;

  console.log(navigation);

  if (
    isEmpty(nombre) ||
    isEmpty(apellidoMaterno) ||
    isEmpty(apellidoPaterno) ||
    isEmpty(dni) ||
    isEmpty(Telefono)
  ) {
    toastRef.current.show(
      "Todos los campos son obligatorios",
      DURATION.LENGTH_LONG
    );
  } else {
    const urlbase = `https://easyappointment.azurewebsites.net/api/usuarios/`;
    const id = await AsyncStorage.getItem("id");
    const url = urlbase + id + "/paciente";

    console.log(url);

    const User = {
      correo: "probando2",
      enable: true,
      password: "probando2",
    };

    const DataObj = {};
    (DataObj.accountManagment = true),
      (DataObj.apellidoMaterno = apellidoMaterno),
      (DataObj.apellidoPaterno = apellidoPaterno),
      (DataObj.correo = "a@a.com"),
      (DataObj.dni = dni),
      (DataObj.edad = "30"),
      (DataObj.fechaNac = fnacimiento),
      (DataObj.nombre = nombre),
      (DataObj.parentesco = "Yo"),
      (DataObj.telefono = Telefono),
      (DataObj.usuario = User),
      console.log(JSON.stringify(DataObj));
    // esto es para ver el objeto que estoy ingresando

    fetch(url, {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(DataObj),
    })
      .then((res) => res.json())
      .then(() => {
        console.log(navigation);
        navigation.navigate("UserLoggued");

        //navigation.navigate("Login");
      })
      .catch((e) => {
        Alert.alert("Error", "Ocurrio un error");
      });

    toastRef.current.show("¡Datos personales grabados!", DURATION.LENGTH_LONG);
  }
}

async function añadirpaciente(
  nombre,
  apellidoMaterno,
  apellidoPaterno,
  dni,
  Telefono,
  fnacimiento,
  parentesco,
  correo,
  toastRef,
  navigation
) {
  // const { navigation} = props;

  console.log(navigation);

  if (
    isEmpty(nombre) ||
    isEmpty(apellidoMaterno) ||
    isEmpty(apellidoPaterno) ||
    isEmpty(dni) ||
    isEmpty(Telefono) ||
    isEmpty(correo) ||
    isEmpty(parentesco)
  ) {
    toastRef.current.show("Todos los campos son obligatorios", 4000);
  } else {
    const urlbase = `https://easyappointment.azurewebsites.net/api/usuarios/`;
    const id = await AsyncStorage.getItem("id");
    const url = urlbase + id + "/paciente";

    console.log(url);

    const User = {
      correo: "probando2",
      enable: true,
      password: "probando2",
    };

    const DataObj = {};
    (DataObj.accountManagment = false),
      (DataObj.apellidoMaterno = apellidoMaterno),
      (DataObj.apellidoPaterno = apellidoPaterno),
      (DataObj.correo = correo),
      (DataObj.dni = dni),
      (DataObj.edad = "30"),
      (DataObj.fechaNac = fnacimiento),
      (DataObj.nombre = nombre),
      (DataObj.parentesco = parentesco),
      (DataObj.telefono = Telefono),
      (DataObj.usuario = User),
      console.log(JSON.stringify(DataObj));
    // esto es para ver el objeto que estoy ingresando

    fetch(url, {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(DataObj),
    })
      .then((res) => res.json())
      .then(() => {
        toastRef.current.show("Datos personales guardados", 10000),
          navigation.navigate("GestFamiliar");

        console.log(navigation);

        //navigation.navigate("Login");
      });
  }
}
//NO SE ENCUENTRA FUNCIONANDO PORQUE PARECE QUE EN EL ENDPOINT HAY ERROR. DE TODAS MANERAS SE DEBE MEJORAR EL CODE
async function modificardatos(
  nombre,
  apellidoMaterno,
  apellidoPaterno,
  dni,
  Telefono,
  fnacimiento,
  toastRef,
  navigation
) {
  // const { navigation} = props;

  console.log(navigation);

  if (
    isEmpty(nombre) ||
    isEmpty(apellidoMaterno) ||
    isEmpty(apellidoPaterno) ||
    isEmpty(dni) ||
    isEmpty(Telefono)
  ) {
    toastRef.current.show("Todos los campos son obligatorios", 4000);
  } else {
    /*   const urlbase = `https://backendapplication-1.azurewebsites.net/api/usuarios/`;
   const id = await AsyncStorage.getItem("id");
   const url = urlbase + id + "/paciente";
 */

    const urlbase = `https://easyappointment.azurewebsites.net/api/pacientes/`;
    const id = 2;
    const url = urlbase + id;

    console.log(url);

    const User = {
      id: await AsyncStorage.getItem("id"),
      correo: "pruebas@f.com",
      enable: true,
      password: "f",
    };

    const DataObj = {};
    (DataObj.accountManagment = true),
      (DataObj.apellidoMaterno = apellidoMaterno),
      (DataObj.apellidoPaterno = apellidoPaterno),
      (DataObj.correo = "aea@a.com"),
      (DataObj.dni = dni),
      (DataObj.edad = "30"),
      (DataObj.fechaNac = fnacimiento),
      (DataObj.nombre = nombre),
      (DataObj.parentesco = "yo"),
      (DataObj.telefono = Telefono),
      (DataObj.usuario = User),
      console.log(JSON.stringify(DataObj));
    // esto es para ver el objeto que estoy ingresando

    fetch(url, {
      method: "PUT",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(DataObj),
    })
      .then((res) => res.json())
      .then(() => {
        toastRef.current.show("¡Datos personales modificados!", 10000),
          navigation.navigate("InfoUser");

        console.log(navigation);

        //navigation.navigate("Login");
      });
  }
}

async function ep_primeraVez(v_id) {
  var listUsers;
  var json;
  try {
    const resp = await fetch(
      "https://easyappointment.azurewebsites.net/api/pacientes"
    );
    json = await resp.json();
    for (var i = 0; i < json.length; ++i) {
      if (String(json[i].usuario.id) == String(v_id)) {
        return "true";
        break;
      }
    }
  } catch (error) {
    console.log("ERROR LISTA DE USUARIOS");
  }
}

function anularMiCita(ObjetoCita) {
  var nuevoObjeto = Object.assign({}, ObjetoCita);
  nuevoObjeto.paciente = null;
  nuevoObjeto.reserva = false;
  nuevoObjeto.hora = nuevoObjeto.fecha + "T" + nuevoObjeto.hora;
  console.log(JSON.stringify(nuevoObjeto));
  try {
    fetch("https://easyappointment.azurewebsites.net/api/citas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(nuevoObjeto),
    }).then((res) => res.json());
  } catch (error) {
    console.log(Alert.alert("Tenemos inconvenientes,alaos"));
  }
}

module.exports = {
  funcionA,
  ep_login,
  ep_login2,
  ep_listUsuarios,
  ep_primeraVez,
  registrodatos,
  añadirpaciente,
  modificardatos,
  routeDinamic,
  anularMiCita,
};
