import React from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { ListItem } from "react-native-elements";
import { _retrieveData } from "../utility/util";
import { normalizeUnits } from "moment";

//https://ide.appitr.com/ide/2216-lonely-addition

const ORANGE = "#FF9500";
const BLUE = "#007AFF";
const GREEN = "#4CD964";
const RED = "#FF3B30";
const GREY = "#8E8E93";
const PURPLE = "#5856D6";
const TEAL_BLUE = "#5AC8FA";
const NEW_BLUE = "#5AC8FB";

const siteSettings = [
  {
    title: "Country",
    icon: "web",
    type: "foundation",
    backgroundColor: GREEN,
    rightTitle: "United Kingdom",
    onPress: context => {
      context.props.navigation.navigate("InvestorSelector", {
        fromSetting: true
      });
    }
  },
  {
    title: "Language",
    icon: "language",
    type: "font-awesome",
    backgroundColor: BLUE,
    rightTitle: "English",
    onPress: context => {
      context.props.navigation.navigate("Home");
    }
  },
  {
    title: "Investor Type",
    icon: "md-people",
    type: "ionicon",
    backgroundColor: PURPLE,
    rightTitle: "Investor",
    onPress: context => {}
  },
  {
    title: "New User",
    icon: "md-people",
    type: "ionicon",
    backgroundColor: PURPLE,
    // rightTitle: "Val " + _retrieveData("IsFirstTimeUser").then(val => val),
    onPress: () => {
      AsyncStorage.clear();
    }
  }
];

const appSettings = [
  {
    title: "Face ID",
    icon: "face-recognition",
    type: "material-community",
    backgroundColor: GREY,
    checkbox: true,
    hideChevron: true
  }
];

class Settings extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerTitleStyle: {
      //textAlign: "left",
      flex: 1,
      fontSize: 25
    },
    headerStyle: {}
  });

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={{ margin: 10 }} />

          {siteSettings.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{
                name: item.icon,
                type: item.type,
                color: "white",
                containerStyle: {
                  backgroundColor: item.backgroundColor,
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  alignItems: "center",
                  justifyContent: "center"
                }
              }}
              rightTitle={item.rightTitle}
              rightTitleStyle={{ width: 250, textAlign: "right" }}
              onPress={() => item.onPress(this)}
              bottomDivider
              chevron
            />
          ))}
          <View style={{ margin: 10 }} />

          {appSettings.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon, type: item.type, color: "#00aced" }}
              bottomDivider
              switch={item.checkbox && { value: true }}
              chevron={!item.hideChevron}
            />
          ))}
        </View>
      </React.Fragment>
    );
  }
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1E6EA"
  }
});
