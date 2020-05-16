import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ToastAndroid,
  View
} from "react-native";
import { withNavigation } from "react-navigation";
import { colorObject } from "../constants/index";
import Icon from "react-native-vector-icons/dist/AntDesign";
import AsyncStorage from "@react-native-community/async-storage";

class ColorPalettes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favColorIds: []
    };

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.getFavColors();
    });
  }

  componentDidMount() {
    this.getFavColors();
  }

  saveInAsyncStorage = async () => {
    try {
      colors = this.state.favColorIds;
      await AsyncStorage.setItem("colors", JSON.stringify(colors));
      ToastAndroid.show("Done", ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show("Please try again", ToastAndroid.SHORT);
    }
  };

  saveColor = id => {
    this.setState({ favColorIds: [...this.state.favColorIds, id] }, () => {
      this.saveInAsyncStorage();
    });
  };

  removeColor = id => {
    filteredArr = this.state.favColorIds.filter(colorId => {
      return colorId != id;
    });
    this.setState({ favColorIds: filteredArr }, () => {
      this.saveInAsyncStorage();
    });
  };

  getFavColors = async () => {
    try {
      const favColors = await AsyncStorage.getItem("colors");
      if (favColors !== null) {
        this.setState({ favColorIds: [...JSON.parse(favColors)] });
      }
    } catch (error) {
      ToastAndroid.show(
        "Something went wrong while getting favorites",
        ToastAndroid.SHORT
      );
    }
  };

  render() {
    const id = this.state.favColorIds;
    return (
      <View>
        <View style={styles.main}>
          <View style={styles.colorName}>
            <View style={{ justifyContent: "flex-start" }}>
              <Text style={styles.name}>{this.props.colorDetails.name}</Text>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
              {id.includes(this.props.colorDetails.id) ? (
                <TouchableOpacity
                  onPress={() => this.removeColor(this.props.colorDetails.id)}
                >
                  <Icon name="heart" size={20} color="red" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.saveColor(this.props.colorDetails.id)}
                >
                  <Icon name="hearto" size={20} color="black" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.colorBox}
            onPress={() =>
              this.props.navigation.push("ColorDetails", {
                colorDetails: this.props.colorDetails
              })
            }
          >
            <View
              style={{
                width: "25%",
                backgroundColor: this.props.colorDetails.color1,
                paddingVertical: 40,
                borderBottomLeftRadius: 10
              }}
            />

            <View
              style={{
                width: "25%",
                paddingVertical: 40,
                backgroundColor: this.props.colorDetails.color2
              }}
            />

            <View
              style={{
                width: "25%",
                paddingVertical: 40,
                backgroundColor: this.props.colorDetails.color3
              }}
            />

            <View
              style={{
                width: "25%",
                paddingVertical: 40,
                backgroundColor: this.props.colorDetails.color4,
                borderBottomRightRadius: 10
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Color = withNavigation(ColorPalettes);

class ColorList extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.mainBG}>
          <StatusBar hidden={true} />
          {colorObject.map(item => {
            return <Color key={item.name} colorDetails={item} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainBG: {
    backgroundColor: "#dcdde1"
  },

  main: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 10
  },

  colorName: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  name: {
    fontWeight: "bold"
  },
  colorBox: {
    flexDirection: "row"
  }
});

export default ColorList;
