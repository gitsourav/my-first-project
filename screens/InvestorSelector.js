import React, { Component } from "react";
import * as Constants from "../components/Constants";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ModalDropdown from "react-native-modal-dropdown";
import { Button } from "react-native-elements";

class InvestorSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInvestorType: false,
      showLanguage: false,
      allChecked: false
    };
  }
  _renderRow = (option, index, isSelected) => {
    return (
      <View style={{ padding: 8, fontSize: 20 }}>
        <Text>{option.value}</Text>
      </View>
    );
  };
  onSelect = (index, option) => {
    //  alert(value);
    this.setState({
      showInvestorType: true
    });
    console.log(option.value);
  };
  onSelectInvestorType = (index, option) => {
    this.setState({
      showLanguage: true
    });
  };

  onSelectLanguage = (index, option) => {
    this.setState({
      allChecked: true
    });
  };
  render() {
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
              options={[
                { key: "option 1", value: "asf" },
                { key: "asd", value: "option 2" }
              ]}
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
                options={[
                  { key: "option 1", value: "asf" },
                  { key: "asd", value: "option 2" }
                ]}
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
                options={[
                  { key: "option 1", value: "asf" },
                  { key: "asd", value: "option 2" }
                ]}
                renderRow={this._renderRow}
                renderButtonText={option => option.value}
                onSelect={this.onSelectLanguage}
              />
            </View>
          )}
          {this.state.allChecked && (
            <Button
              style={{ margin: 15 }}
              title="Continue"
              onPress={() => this.props.navigation.navigate("Home")}
            />
          )}
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