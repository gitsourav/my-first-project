import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

class Settings extends React.Component {
  siteSettings = [
    {
      title: "Country",
      icon: "web",
      type: "foundation",
      onPress: () => {
        //alert("j");
        this.props.navigation.navigate("InvestorSelector", {
          fromSetting: true
        });
      }
    },
    {
      title: "Language",
      icon: "language",
      type: "font-awesome",
      onPress: () => {
        //alert("j");
        this.props.navigation.navigate("Home");
      }
    },
    {
      title: "Investor Type",
      icon: "md-people",
      type: "ionicon",
      onPress: () => {
        //alert("j");
        this.props.navigation.navigate("Home");
      }
    }
  ];

  appSettings = [
    {
      title: "Face ID",
      icon: "face-recognition",
      type: "material-community"
    }
  ];
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

          {this.siteSettings.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon, type: item.type, color: "#00aced" }}
              onPress={() => item.onPress()}
              bottomDivider
              chevron
            />
          ))}
          <View style={{ margin: 10 }} />

          {this.appSettings.map((item, i) => (
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
