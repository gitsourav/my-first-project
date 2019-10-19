import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import FundDetails from "./screens/FundDetails";
import Details from "./screens/Details";
import Constants from "expo-constants";
import FundList from "./screens/FundList";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import InvestorSelector from "./screens/InvestorSelector";
import Settings from "./screens/Settings";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeStack = createStackNavigator(
  {
    InvestorSelector: {
      screen: InvestorSelector,
      navigationOptions: {
        header: null
      }
    },
    Home: {
      screen: FundList,
      navigationOptions: {
        header: null
      }
    },
    FundDetails: {
      screen: FundDetails,
      headerTitle: "Fund price details"
    },
    Details: {
      screen: Details,
      navigationOptions: {
        headerTitle: "Shareclass"
      }
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "screen",
    headerForceInset: { top: "never" }
  }
);
const SettingsStack = createStackNavigator({
  Settings: Settings
});

const AppContainer = createAppContainer(
  createBottomTabNavigator(
    {
      Home: HomeStack,
      Settings: SettingsStack
    },
    {
      tabBarOptions: {
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      }
    }
  )
);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // marginTop: Constants.statusBarHeight
  }
});
