import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import 'react-native-gesture-handler';
import {createStackNavigator} from 'react-navigation-stack';
import Scan from './src/Scan';
import Generate from './src/Generate';
import Qr from './src/Qr';

const AppNavigator2 = createStackNavigator(
  {
    Generate: Generate,
    Qr: Qr,
  },
  {
    headerMode: 'none',
  },
);
const AppNavigator1 = createMaterialTopTabNavigator(
  {
    Scan: Scan,
    Generate: AppNavigator2,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#212121',
      },
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      indicatorStyle: {
        backgroundColor: 'white',
      },
      labelStyle: {
        fontSize: 15,
      },
    },
  },
);
const AppContainer = createAppContainer(AppNavigator1);
/* export default class App extends Component {
  render() {
    return (
    <AppContainer/>
      <View>
        <Text>HELLO</Text>
      </View>
    );
  }
}
 */
export default AppContainer;
