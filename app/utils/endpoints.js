async function funcionA(params) {
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

function funcionB(params) {
  console.log("funcion B");
}

module.exports = {
  funcionA,
  funcionB,
};
