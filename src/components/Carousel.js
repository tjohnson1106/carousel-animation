import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { PRODUCT_LIST } from "../data/product-list";

class Carousel extends Component {
  state = {};
  render() {
    return (
      <View>
        <ScrollView
          pagingEnabled
          scrollEventThrottle
          horizontal
          onScroll
          contentContainerStyle={styles.scrollViewContainer}
        >
          {PRODUCT_LIST.map((item, i) => this._renderItem(item, i))}
        </ScrollView>
      </View>
    );
  }

  _renderItem = (item, i) => {
    return (
      <View key={item.id}>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});

export default Carousel;
