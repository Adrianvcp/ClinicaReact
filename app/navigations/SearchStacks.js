import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../screens/search";

export const SearchScreenStacks = createStackNavigator({
  restaurants: {
    screen: SearchScreen,
    navigationOptions: () => ({
      title: "Busca tu restaurante"
    })
  }
});

export default SearchScreenStacks;
