import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

const siteSettings = [
  {
    title: "Country",
    icon: "web",
    type: "foundation"
  },
  {
    title: "Language",
    icon: "language",
    type: "font-awesome"
  },
  {
    title: "Investor Type",
    icon: "md-people",
    type: "ionicon"
  }
];

const appSettings = [
  {
    title: "Face ID",
    icon: "face-recognition",
    type: "material-community"
  }
];

class Settings extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerTitleStyle: { textAlign: "left", flex: 1, fontSize: 25 },
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
              leftIcon={{ name: item.icon, type: item.type, color: "#00aced" }}
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
