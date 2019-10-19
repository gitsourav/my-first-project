import React, { Component } from "react";
import * as Constants from "../components/Constants";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  Text,
  RefreshControl,
  SafeAreaView
} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

class FundList extends Component {
  constructor() {
    super();
    this.page = 0;
    this.state = {
      data: [],
      isLoading: false,
      totalCount: 0,
      loadedCount: 0,
      page: 0,
      isRefreshing: false,
      value: ""
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    console.log("page Mount " + this.page);
    this.getFundData(this.page);
  }

  getFundData = page => {
    //console.log(page);
    const inputParam = {
      ...Constants.PARAM_GETFUND,
      top: 100,
      skip: Number.parseInt(page * 100)
    };
    //console.log(inputParam);
    this.setState({ isLoading: true });
    fetch(
      "https://www.aberdeenstandard.com/en/uk/adviser/funds/funds/fundsajax",
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
        let listData = this.state.data;
        let data = !this.state.isRefreshing
          ? listData.concat(responseJson.Content.Products)
          : listData;

        // console.log(listData);
        this.setState(
          {
            isLoading: false,
            isRefreshing: false,
            totalCount: responseJson.Total,
            data: data
          },
          function() {
            // call the function to pull initial 12 records
            //this.addRecords(0);
            this.arrayholder = data;
          }
        );
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isRefreshing: false
        });
        alert(error);
      });
  };

  handleLoadMore = () => {
    if (!this.state.isLoading) {
      if (Object.keys(this.state.data).length < this.state.totalCount) {
        this.page = this.page + 1;
        this.getFundData(this.page);
      }
    }
  };

  onRefresh = () => {
    this.setState({ isRefreshing: true });
    this.getFundData(0);
    //this.getFundData(this.page);
  };
  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.isLoading) return null;
    return <ActivityIndicator style={{ padding: 20, color: "#000" }} />;
  };
  _renderItem = ({ item }) => {
    return (
      <ListItem
        containerStyle={{
          backgroundColor: "#eff7fc",
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 8,
          margin: 5,
          marginHorizontal: 10
        }}
        leftAvatar={{
          rounded: true,
          source: require("../assets/fund-icon.jpg")
        }}
        key={item.Name}
        title={item.Name}
        titleStyle={{ color: "black" }}
        subtitle={item.AssetClassName}
        subtitleStyle={{ color: "#002664" }}
        onPress={() =>
          this.props.navigation.navigate("Details", { item: item })
        }
        chevron
        badge={{
          badgeStyle: {
            backgroundColor: "#fff",
            height: 20,
            borderStyle: "solid",
            borderColor: "#c4e2f4",
            borderWidth: 1
          },
          value: item.ProductShareclassesLinks.length,
          textStyle: {
            color: "#999",
            paddingHorizontal: 10
          },
          containerStyle: {
            //marginTop: -30
          }
        }}
      />
    );
  };
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
  searchFilterFunction = text => {
    this.setState({
      value: text
    });
    console.log(text);

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.Name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    this.setState({ data: newData });
  };
  render() {
    if (this.state.isLoading && this.page === 0) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ActivityIndicator size="large" color="red" />
          </View>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={[styles.countLable, { margin: 5 }]}>
          Showing {Object.keys(this.state.data).length} of{" "}
          {this.state.totalCount} results.
        </Text>
        <FlatList
          // ItemSeparatorComponent={() => (
          //   <View
          //     style={{
          //       height: 1,
          //       marginHorizontal: 15,
          //       backgroundColor: "#CED0CE"
          //     }}
          //   />
          // )}

          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={item => item.ID}
          ListFooterComponent={this.renderFooter.bind(this)}
          ListHeaderComponent={this.renderHeader.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          onEndReachedThreshold={0.4}
          onEndReached={this.handleLoadMore.bind(this)}
        />
      </SafeAreaView>
    );
  }
}

export default FundList;

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 10
  },
  title: {
    fontSize: 20
  },
  countLable: {
    fontSize: 10,
    marginHorizontal: 10
  }
});
