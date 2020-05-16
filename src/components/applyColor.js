import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ActivityIndicator
} from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/dist/AntDesign";

class ApplyColor extends Component {
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("colorDetails");

    return (
      <View style={styles.main}>
        <StatusBar hidden={true} />
        <View style={styles.foreground}>
          <Text style={{ color: item, fontSize: 25 }}>
            Text with {item} color
          </Text>
        </View>

        <View
          style={[
            {
              backgroundColor: item,
              paddingVertical: 20,
              paddingHorizontal: 50
            }
          ]}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            View or Div with {item} color
          </Text>
        </View>

        <View
          style={[styles.background, { borderColor: item, borderWidth: 1 }]}
        >
          <Text style={{ color: item, fontSize: 20 }}>
            Border with {item} color
          </Text>
        </View>

        <View>
          <Text style={{ color: item, fontSize: 20, paddingBottom: 10 }}>
            Loader with {item} color
          </Text>
          <ActivityIndicator size="large" color={item} />
        </View>

        <View>
          <Text style={{ color: item, fontSize: 20, paddingBottom: 10 }}>
            Icons with {item} color
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Icon name="star" size={20} color={item} />
            <Icon name="heart" size={20} color={item} />
            <Icon name="like1" size={20} color={item} />
            <Icon name="android1" size={20} color={item} />
          </View>
        </View>

        <View
          style={[{ backgroundColor: item, borderRadius: 15, padding: 15 }]}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Button</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },

  background: {
    padding: 40,
    borderRadius: 15
  },

  add: {
    borderWidth: 1
  }
});

export default withNavigation(ApplyColor);
