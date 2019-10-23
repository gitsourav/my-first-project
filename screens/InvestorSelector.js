import React, { Component } from "react";
import * as Constants from "../components/Constants";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { Button } from "react-native-elements";
import * as AsyncStore from "../utility/util";
import * as Settings from "../components/globalSettings";
import { StackActions } from "react-navigation";

console.log("here");
class InvestorSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInvestorType: false,
      showLanguage: false,
      allChecked: false,
      isloading: true,
      countries: [],
      investorTypes: [],
      languages: []
    };
    this.selectedCountry = "";
    this.selectedInvestorType = "";
    this.selectedLanguage = "";
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    if (params && params.fromSetting) {
      this.setState({
        isloading: false
      });
    } else {
      this._bootstrapAsync();
    }
  }

  componentDidMount() {
    let countries = [];
    Object.keys(Settings.countries).forEach(function(country) {
      countries.push({
        key: country,
        value: Settings.countries[country].countryName
      });
    });
    this.setState({
      countries: countries
    });
  }

  _bootstrapAsync = async () => {
    const isFirstTime = await AsyncStore._retrieveData("IsFirstTimeUser");
    console.log("Is first time user check");
    console.log("Is first time user " + isFirstTime);
    if (isFirstTime == "No") {
      this.props.navigation.navigate("Home");
    } else {
      this.setState({
        isloading: false
      });
    }
  };
  _renderRow = (option, index, isSelected) => {
    return (
      <View style={{ padding: 8, fontSize: 20 }}>
        <Text>{option.value}</Text>
      </View>
    );
  };

  onSelect = (index, option) => {
    let investorTypes = [];
    Object.keys(Settings.countries[option.key].investorTypes).forEach(function(
      investorType
    ) {
      investorTypes.push({
        key: investorType,
        value:
          Settings.countries[option.key].investorTypes[investorType].shortName
      });
    });
    this.setState({
      showInvestorType: true,
      investorTypes: investorTypes
    });
    this.selectedCountry = option.key;
  };
  onSelectInvestorType = (index, option) => {
    let languages = [];
    Settings.countries[this.selectedCountry].languages.forEach(function(
      language
    ) {
      languages.push({
        key: language.languageCode,
        value: language.englishName
      });
    });
    this.setState({
      showLanguage: true,
      languages: languages
    });
    this.selectedInvestorType = option.key;
  };

  onSelectLanguage = (index, option) => {
    this.setState({
      allChecked: true
    });
    this.selectedLanguage = option.key;
    AsyncStore._setData("IsFirstTimeUser", "No");
  };

  render() {
    console.log("Renderkalfkasdf");
    if (this.state.isloading) {
      return <ActivityIndicator style={{ padding: 20, color: "#000" }} />;
    }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#199ce3" }}>
        <View style={styles.container}>
          <View>
            <Text style={styles.label}>What country are your from?</Text>

            <ModalDropdown
              disabled={this.state.showInvestorType}
              defaultValue="Please select a country"
              style={{
                alignSelf: "center",
                width: 250,
                backgroundColor: "white",
                borderRadius: 8
              }}
              textStyle={{
                fontSize: 20,
                //height: 40,
                padding: 8,
                textAlign: "center"
              }}
              dropdownStyle={{
                width: 250,
                padding: 10,
                fontSize: 20,
                backgroundColor: "white",
                borderRadius: 8
              }}
              options={this.state.countries}
              renderRow={this._renderRow}
              renderButtonText={option => option.value}
              onSelect={this.onSelect}
            />
          </View>
          {this.state.showInvestorType && (
            <View>
              <Text style={styles.label}>Please select a investor Type</Text>

              <ModalDropdown
                disabled={this.state.showLanguage}
                defaultValue="Please select a investor type"
                style={{
                  alignSelf: "center",
                  width: 250,
                  backgroundColor: "white",
                  borderRadius: 8
                }}
                textStyle={{
                  fontSize: 20,
                  padding: 8,
                  textAlign: "center"
                }}
                dropdownStyle={{
                  width: 250,
                  padding: 10,
                  fontSize: 20,
                  backgroundColor: "white",
                  borderRadius: 8
                }}
                options={this.state.investorTypes}
                renderRow={this._renderRow}
                renderButtonText={option => option.value}
                onSelect={this.onSelectInvestorType}
              />
            </View>
          )}
          {this.state.showLanguage && (
            <View>
              <Text style={styles.label}>Please select a language</Text>

              <ModalDropdown
                defaultValue="Please select a language"
                style={{
                  alignSelf: "center",
                  width: 250,
                  backgroundColor: "white",
                  borderRadius: 8
                }}
                textStyle={{
                  fontSize: 20,
                  //height: 40,
                  padding: 8,
                  textAlign: "center"
                }}
                dropdownStyle={{
                  width: 250,
                  padding: 10,
                  fontSize: 20,
                  backgroundColor: "white",
                  borderRadius: 8
                }}
                options={this.state.languages}
                renderRow={this._renderRow}
                renderButtonText={option => option.value}
                onSelect={this.onSelectLanguage}
              />
            </View>
          )}
          <View style={{ flexDirection: "row" }}>
            {this.state.allChecked && (
              <Button
                sec
                style={{ margin: 15 }}
                title="Continue"
                onPress={() => this.props.navigation.navigate("Home")}
              />
            )}
            <Button
              type="outline"
              buttonStyle={{ borderColor: "white" }}
              style={{ margin: 15 }}
              title="Go Back"
              titleStyle={{ color: "white" }}
              onPress={() => this.props.navigation.navigate("Settings")}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default InvestorSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#199ce3",
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    margin: 10,
    fontSize: 25,
    color: "white"
  },
  textInput: {
    marginTop: 10,
    width: 60 + "%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    borderStyle: "solid",
    borderBottomWidth: 1,
    backgroundColor: "white"
  }
});
