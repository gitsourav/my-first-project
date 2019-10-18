import React from "react";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { ListItem } from "react-native-elements";

class FundDetails extends React.Component {
  state = {};

  componentDidMount() {}
  displaySpinner() {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator />
      </View>
    );
  }

  render() {
    const { params } = this.props.navigation.state;
    let jsCode = `(function(){
        document.querySelector('body').style.paddingTop= "0px";
        document.querySelector('.sticky-header').style.display = 'none';
        document.querySelector('#footer1').style.display = 'none';
        document.querySelector('#inPageNavigation').style.top = 0;
        
    })()`;
    return (
      <WebView
        injectedJavaScript={jsCode}
        startInLoadingState={true}
        source={{
          uri: "https://aberdeenstandard.com" + params.URL + "?sc_expview=1"
        }}
        renderLoading={() => {
          return this.displaySpinner();
        }}
      />
    );
  }
}

export default FundDetails;
