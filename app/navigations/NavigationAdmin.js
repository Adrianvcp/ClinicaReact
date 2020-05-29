import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import RestaurantScreenStacks from "./RestaurantsStacks";
//import TopListScreenStacks from "./TopListsStacks";
import SearchScreenStacks from "./SearchStacks";
import AccountScreenStack from "./AccountStacks";
import AdmStack from "./AdmStack";

const adminVar = false;

const NavigationStacks = createBottomTabNavigator(
  {
    /* BARRA INFERIOR  */

    Search: {
      screen: AdmStack,
      navigationOptions: () => ({
        tabBarLabel: "Citas Reservadas",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="medical-bag"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
    Account: {
      screen: AccountScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="account-circle"
            size={22}
            color={tintColor}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: "Search",
    order: ["Search", "Account"],
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#1e90ff",
    },
  }
);

export default createAppContainer(NavigationStacks);
