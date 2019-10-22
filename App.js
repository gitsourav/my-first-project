import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import FundDetails from "./screens/FundDetails";
import Details from "./screens/Details";
import Constants from "expo-constants";
import FundList from "./screens/FundList";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import InvestorSelector from "./screens/InvestorSelector";
import Settings from "./screens/Settings";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";
import * as AsyncStore from "./utility/util";
//https://snack.expo.io/@spencercarli/complex-react-navigation-example
const AuthStack = createStackNavigator({
  InvestorSelector: {
    screen: InvestorSelector,
    navigationOptions: {
      header: null,
      tabBarVisible: false
    }
  }
});

const HomeStack = createStackNavigator(
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
const SettingsStack = createStackNavigator({
  Settings: Settings
});

const MainTabs = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: () => <Icon name="home" size={20} />
    }
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: "Settings",
      tabBarIcon: () => <Icon name="list" size={20} />
    }
  }
});
const MainDrawer = createDrawerNavigator({
  MainTabs: MainTabs
  // Settings: SettingsStack
});

const AppModalStack = createStackNavigator(
  {
    App: MainTabs
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const root = createSwitchNavigator({
  Auth: {
    screen: AuthStack
  },
  App: {
    screen: AppModalStack
  }
});

const AppContainer = createAppContainer(root);

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
