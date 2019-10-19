import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TestList from "./screens/TestList";
import Home from "./screens/Home";
import FundDetails from "./screens/FundDetails";
import Details from "./screens/Details";
import Constants from "expo-constants";
import FundList from "./screens/FundList";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator(
  {
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
const AppContainer = createAppContainer(RootStack);

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
