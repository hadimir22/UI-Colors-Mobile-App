import { createStackNavigator, createAppContainer } from "react-navigation";
import Colors from "../components/colorPalettes";
import ColorDetails from "../components/colorDetails";
import ApplyColor from "../components/applyColor";

const StackNav = createStackNavigator(
  {
    Colors: {
      screen: Colors,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },

    ColorDetails: {
      screen: ColorDetails,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },

    ApplyColor: {
      screen: ApplyColor,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    initialRouteName: "Colors"
  }
);

export default createAppContainer(StackNav);
