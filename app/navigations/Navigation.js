import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import RestaurantScreenStacks from "./RestaurantsStacks";
//import TopListScreenStacks from "./TopListsStacks";
import SearchScreenStacks from "./SearchStacks";
import AccountScreenStack from "./AccountStacks";

const NavigationStacks = createBottomTabNavigator(
  {
    Restaurants: {
      screen: RestaurantScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Reserva tu citas",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="calendar-plus"
            size={22}
            color={tintColor}
          />
        )
      })
    },

    Search: {
      screen: SearchScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Mis citas",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="medical-bag"
            size={22}
            color={tintColor}
          />
        )
      })
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
        )
      })
    },
    hasdhasd: {
      screen: AccountScreenStack
    }
  },
  {
    initialRouteName: "Restaurants",
    order: ["Restaurants", "Search", "Account"],
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#1e90ff"
    }
  }
);

export default createAppContainer(NavigationStacks);
