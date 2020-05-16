export function districtData(texto) {
  const dato = texto;

  const arregloDeSubCadenas = dato.split(",", 1);
  const primera = arregloDeSubCadenas[0].split(" ", 1);
  return arregloDeSubCadenas[0].replace(primera, "").trim();
}
