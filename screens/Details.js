import React from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  View
} from "react-native";
import * as Constants from "../components/Constants";
import { ListItem, Card, Icon, Button, Text } from "react-native-elements";
import Moment from "moment";

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: true,
      isRefreshing: false
    };
  }

  configureInputParam = () => {
    let inputParam = { ...Constants.PARAM_FUNDDETAILS };
    const { params } = this.props.navigation.state;
    inputParam.CspUris = params.item.ProductShareclassesLinks;
    // inputParam.FundId = params.item.ID;
    // inputParam.FundName = ""; //params.FundRangeName;
    // inputParam.FundRangeId = ""; //params.item.FundRangeId;
    //inputParam.Countries = JSON.parse(Constants.PARAM_GETFUND.countries); // params.item.Countries;
    // inputParam.CountryCodes = []; //params.item.CountryCodes;
    // inputParam.investorTypeIds = []; //]//params.item.investorTypeIds;

    // inputParam.investorTypeIds = []; //params.item.investorTypeIds;
    //console.log(params);
    //console.log(params.item.FundRangeName);
    //console.log(inputParam);
    return inputParam;
  };
  getFundPrices = () => {
    const inputParam = this.configureInputParam();
    console.log(inputParam);
    this.setState({ isLoading: true });
    fetch(
      "https://www.aberdeenstandard.com/en/uk/adviser/funds/funds/shareclassesajax",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputParam)
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        //console.log("Respones JSON");
        //console.log(responseJson);
        let listData = this.processJSON(responseJson);
        //console.log(listData);
        this.setState({
          isLoading: false,
          isRefreshing: false,
          data: listData
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isRefreshing: false
        });
        alert(error);
      });
  };
  processJSON = responseJson => {
    let listData = [];
    // console.log("Length response - " + responseJson.Shareclasses.length);
    for (var i = 0; i < responseJson.Shareclasses.length; i++) {
      var shareclass = JSON.parse(responseJson.Shareclasses[i]).Content[0];
      var documents = responseJson.Documents[shareclass.ID];
      listData.push({ shareclass, documents });

      console.log("Item- -- -- --" + i);
      console.log(listData[i]);
    }
    console.log("Object Length -- " + listData.length);
    //console.log(listData);
    return listData;
  };
  componentDidMount() {
    this.getFundPrices();
  }
  _renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    Moment.locale("en");
    return (
      <View>
        <Card
          containerStyle={{ flex: 1, borderRadius: 8 }}
          title={item.shareclass.Name}
          titleStyle={{ alignSelf: "flex-start", marginLeft: 10 }}
          image={require("../assets/fund-icon.jpg")}
        >
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly"
              }}
            >
              <View style={{ flex: 1, marginBottom: 10 }}>
                <Text>
                  {" "}
                  Price{" "}
                  {item.shareclass.Prices[0].PricePerUnit +
                    " " +
                    item.shareclass.ShareclassCurrencyCode}
                </Text>
              </View>
              <View style={{ flex: 1, marginBottom: 10 }}>
                <Text>
                  {" "}
                  Price Date{" "}
                  {Moment(item.shareclass.Prices[0].LastSuccessfulSync).format(
                    "DD MMM YYYY"
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly"
              }}
            >
              <View style={{ flex: 1, marginBottom: 10 }}>
                <Text>
                  {" "}
                  Price Change {item.shareclass.Prices[0].ChangeValue}
                </Text>
              </View>
            </View>
          </View>
          {/* <View>
            {item.documents && <Text h4> Related Literatures</Text>}

            {item.documents &&
              item.documents.map((doc, i) => (
                <View key={i}>
                  <Text>{doc.Type}</Text>
                </View>
              ))}
          </View> */}
          <Button
            icon={<Icon name="code" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 5,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            onPress={() =>
              navigate("FundDetails", { URL: item.shareclass.Url })
            }
            title="VIEW NOW"
          />
        </Card>
      </View>
    );
  };

  render() {
    if (this.state.isLoading && this.state.data.length === 0) {
      return (
        <View>
          <Text h4 style={{ margin: 10 }}>
            {this.props.navigation.state.params.item.Name}
          </Text>
          <ActivityIndicator style={{ marginTop: 20 }} />
        </View>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          <Text h4 style={{ margin: 10 }}>
            {this.props.navigation.state.params.item.Name}
          </Text>
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={item => item.shareclass.ID}
            onEndReachedThreshold={0.4}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default Details;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    //backgroundColor: "#1a9ce3",
    color: "white"
    //justifyContent: "center"
  }
});
