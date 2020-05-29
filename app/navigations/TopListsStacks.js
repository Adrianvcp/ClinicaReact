import { createStackNavigator } from "react-navigation-stack";
import TopRestaurantsScreen from "../screens/topRestaurantes";

const TopListScreenStacks = createStackNavigator({
  TopRestaurants: {
    screen: TopRestaurantsScreen,
    navigationOptions: () => ({
      title: "Los mejores restaurantes"
    })
  }
});

export default TopListScreenStacks;
