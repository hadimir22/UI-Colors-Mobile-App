import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View
} from 'react-native';
import { withNavigation } from 'react-navigation';

class ColorDetails extends Component {
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('colorDetails');
    const { color1, color2, color3, color4 } = item;
    return (
      <View style={styles.main}>
        <StatusBar hidden={true} />
        <TouchableOpacity
          style={styles.back}
          onPress={() =>
            this.props.navigation.push('ApplyColor', {
              colorDetails: `${item.color1}`
            })
          }
        >
          <View style={[styles.boxStyle, { backgroundColor: `${color1}` }]}>
            <Text style={styles.text}>{color1}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.back}
          onPress={() =>
            this.props.navigation.push('ApplyColor', {
              colorDetails: `${item.color2}`
            })
          }
        >
          <View style={[styles.boxStyle, { backgroundColor: `${color2}` }]}>
            <Text style={styles.text}>{color2}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.back}
          onPress={() =>
            this.props.navigation.push('ApplyColor', {
              colorDetails: `${item.color3}`
            })
          }
        >
          <View style={[styles.boxStyle, { backgroundColor: `${color3}` }]}>
            <Text style={styles.text}>{color3}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.back}
          onPress={() =>
            this.props.navigation.push('ApplyColor', {
              colorDetails: `${item.color4}`
            })
          }
        >
          <View style={[styles.boxStyle, { backgroundColor: `${color4}` }]}>
            <Text style={styles.text}>{color4}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  back: {
    height: '25%'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  },
  boxStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default withNavigation(ColorDetails);
