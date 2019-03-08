import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions
} from "react-native";

import { PRODUCT_LIST } from "../data/product-list";

const { width, height } = Dimensions.get("window");

class Carousel extends Component {
  _scrollX = new Animated.Value(0);

  render() {
    return (
      <View>
        <Animated.ScrollView
          pagingEnabled
          scrollEventThrottle
          horizontal
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this._scrollX
                  }
                }
              }
            ],

            {
              useNativeDriver: true
            }
          )}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {PRODUCT_LIST.map((item, i) => this._renderItem(item, i))}
        </Animated.ScrollView>
      </View>
    );
  }

  _renderItem = (item, i) => {
    return (
      <View key={item.id} style={[styles.root, styles.item]}>
        <View style={styles.metaContainer}>
          <Text style={[styles.font, styles.title]}>{item.title}</Text>
          <Text style={[styles.font, styles.subtitle]}>{item.subtitle}</Text>
          <Text style={[styles.font, styles.description]}>
            {item.description}
          </Text>
          <Text style={[styles.font, styles.price]}>{item.price}</Text>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    width,
    height,
    alignItems: "center"
  },
  scrollViewContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  font: {
    fontFamily: "Menlo",
    color: "#222"
  },
  metaContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    padding: 15
  },
  title: {
    fontSize: 36,
    fontWeight: "900"
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "900"
  },
  description: {
    fontSize: 14,
    marginVertical: 15,
    textAlign: "center"
  },
  price: {
    fontSize: 42,
    fontWeight: "400"
  }
});

export default Carousel;
