import React from "react";
import Ionicons from "react-native-vector-icons/AntDesign";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import StackNav from "./stackNav";
import Favorites from "../components/favorites";

const TabNavigator = createBottomTabNavigator(
  {
    Colors: StackNav,
    Favorites: Favorites
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Colors") {
          iconName = focused ? "appstore1" : "appstore-o";
        } else if (routeName === "Favorites") {
          iconName = focused ? "heart" : "hearto";
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),

    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

export default createAppContainer(TabNavigator);
