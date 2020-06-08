import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Image,
  View,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {colorObject} from '../constants/index';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import NoFavColor from '../assets/noImg.gif';

class ColorPalettes extends Component {
  render() {
    return (
      <View>
        <View style={styles.main}>
          <View style={styles.colorName}>
            <View style={{justifyContent: 'flex-start'}}>
              <Text style={styles.name}>{this.props.colorDetails.name}</Text>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
              <TouchableOpacity
                onPress={() =>
                  this.props.removeColor(this.props.colorDetails.id)
                }>
                <Icon name="heart" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.colorBox}
            onPress={() =>
              this.props.navi.navigate('ColorDetails', {
                colorDetails: this.props.colorDetails,
              })
            }>
            <View
              style={{
                width: '25%',
                backgroundColor: this.props.colorDetails.color1,
                paddingVertical: 40,
                borderBottomLeftRadius: 10,
              }}
            />

            <View
              style={{
                width: '25%',
                paddingVertical: 40,
                backgroundColor: this.props.colorDetails.color2,
              }}
            />

            <View
              style={{
                width: '25%',
                paddingVertical: 40,
                backgroundColor: this.props.colorDetails.color3,
              }}
            />

            <View
              style={{
                width: '25%',
                paddingVertical: 40,
                backgroundColor: this.props.colorDetails.color4,
                borderBottomRightRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Color = withNavigation(ColorPalettes);

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favColorIds: [],
      colors: null,
      loader: true,
    };

    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.getFavColors();
    });
  }

  componentDidMount() {
    this.getFavColors();
  }

  saveInAsyncStorage = async () => {
    try {
      colors = this.state.favColorIds;
      await AsyncStorage.setItem('colors', JSON.stringify(colors));
      ToastAndroid.show('Done', ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show('Please try again', ToastAndroid.SHORT);
    }
  };

  removeColor = id => {
    filteredArr = this.state.favColorIds.filter(colorId => {
      return colorId != id;
    });
    this.setState({favColorIds: filteredArr}, () => {
      this.saveInAsyncStorage();
      this.getFavColors();
    });
  };

  getFavColors = async () => {
    try {
      const favColors = await AsyncStorage.getItem('colors');

      if (favColors !== null) {
        filteredColors = [];

        JSON.parse(favColors).map(element => {
          fil = colorObject.filter(obj => {
            return obj.id === element;
          });
          filteredColors = [...filteredColors, ...fil];
        });

        this.setState({
          colors: filteredColors,
          favColorIds: JSON.parse(favColors),
        });
      }
      this.setState({loader: false});
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        'Something went wrong while getting favorites',
        ToastAndroid.SHORT,
      );
    }
  };
  render() {
    const {loader, colors} = this.state;
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.mainBG}>
          <StatusBar hidden={true} />
          {loader ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="tomato" />
            </View>
          ) : colors && colors.length !== 0 ? (
            colors.map(item => {
              return (
                <Color
                  key={item.name}
                  colorDetails={item}
                  navi={this.props.navigation}
                  removeColor={this.removeColor}
                />
              );
            })
          ) : (
            <View
              style={{
                flex: 1,
                marginVertical: '50%',
                alignSelf: 'center',
              }}>
              <Image
                source={NoFavColor}
                style={{height: 200, width: 200}}
                resizeMode="contain"
              />
              <Text style={{textAlign: 'center'}}>No Favorites</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainBG: {
    backgroundColor: '#dcdde1',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  main: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 10,
  },

  colorName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  colorBox: {
    flexDirection: 'row',
  },
});

export default withNavigation(Favorites);
