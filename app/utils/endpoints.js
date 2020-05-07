import Toast from "react-native-easy-toast";
import { AsyncStorage } from "react-native";
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

async function ep_listUsuarios(correo, new_pass, toastRef, navigation) {
  var listUsers;
  var json;
  try {
    const resp = await fetch(
      "http://backendapplication-1.azurewebsites.net/api/usuarios"
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
            "http://backendapplication-1.azurewebsites.net/api/usuarios/" +
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
          toastRef.current.show("Error de actualizacion", 1000);
          console.log("ERROR AL ACTUALIZAR");
        }
      }
    }
    toastRef.current.show("Actualizacion de contraseña correctamente", 1000);
    setTimeout(() => {
      console.log("sdas");
    }, 6000);
    navigation.navigate("MyAccount");
  } catch (error) {
    console.log("ERROR LISTA DE USUARIOS");
  }
}

async function ep_login(email, password, navigation, toastRef) {
  console.log("funcion login");
  console.log(email, password);
  const urlbase = `http://backendapplication-1.azurewebsites.net/api/usuarios/login?`;
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
    toastRef.current.show("Usuario y/o contraseña incorrecta", 1000);
  }
  /* ANTES WELCOME */
  navigation.navigate("Welcome", { user: json.id });
}

async function ep_primeraVez(v_id) {
  var listUsers;
  var json;
  try {
    const resp = await fetch(
      "https://backendapplication-1.azurewebsites.net/api/pacientes"
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

module.exports = {
  funcionA,
  ep_login,
  ep_listUsuarios,
  ep_primeraVez,
};
