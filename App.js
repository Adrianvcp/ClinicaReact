import React from "react";
import Navigation from "./app/navigations/Navigation";
import NavigationAdmin from "./app/navigations/NavigationAdmin";
import { firebaseApp } from "./app/utils/FireBase";

const Admin = false;
function AdministradorStack(params) {
  if (Admin) {
    return <NavigationAdmin />;
  } else {
    return <Navigation />;
  }
}

export default function App() {
  return AdministradorStack();
}
