import React from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  FlatList,
  View
} from "react-native";
import * as Constants from "../components/Constants";
import { ListItem, Card, Icon, Button } from "react-native-elements";
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
      var data = JSON.parse(responseJson.Shareclasses[i]).Content[0];
      listData.push(data);

      // console.log("Item- -- -- --" + i);
      // console.log(data);
      //console.log(data);
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
          title={item.Name}
          titleStyle={{ alignSelf: "flex-start", marginLeft: 10 }}
          image={require("../assets/fund-icon.jpg")}
        >
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
                {item.Prices[0].PricePerUnit +
                  " " +
                  item.ShareclassCurrencyCode}
              </Text>
            </View>
            <View style={{ flex: 1, marginBottom: 10 }}>
              <Text> Price Date {item.Prices[0].LastSuccessfulSync}</Text>
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
                Price Date{" "}
                {Moment(item.Prices[0].LastSuccessfulSync).format(
                  "dd MMM YYYY"
                )}
              </Text>
            </View>
          </View>
          <Button
            icon={<Icon name="code" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 5,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            onPress={() => navigate("FundDetails", { URL: item.Url })}
            title="VIEW NOW"
          />
        </Card>
      </View>
    );
  };

  render() {
    if (this.state.isLoading && this.state.data.length === 0) {
      return (
        <View style={{ padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //TODO: Use SelectList
      <ScrollView style={styles.scrollView}>
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                marginHorizontal: 15,
                backgroundColor: "#CED0CE"
              }}
            />
          )}
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={item => item.ID}
          onEndReachedThreshold={0.4}
        />
        {/* {this.state.data.map((item, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => navigate("FundDetails", { URL: item.Url })}
          >
            <Text style={{ fontSize: 20 }}> Shareclasse - {item.Name} </Text>
            <View
              style={{
                borderBottomColor: "black",
                marginRight: 60,
                borderBottomWidth: 1
              }}
            />
            <Text> Price - {item.Prices[0].PricePerUnit} </Text>
            <Text> Currency - {item.ShareclassCurrencyCode} </Text>
            <Text style={{ marginBottom: 20 }}>
              {" "}
              AMCPerCent - {item.AMCPerCent}{" "}
            </Text>
          </TouchableOpacity>
        ))} */}
      </ScrollView>
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
