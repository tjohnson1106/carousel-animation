import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar
} from "react-native";
import { Svg } from "expo";

import { PRODUCT_LIST } from "../data/product-list";

const { Defs, RadialGradient, Stop, Rect } = Svg;

const LOGO_URI = `http://www.palaisdetokyo.com/sites/default/files/aiaiai_logo_circle_new_1.png`;

const getImageUri = (id) => `https://aiaiai.dk/images/front/${id}_m.png`;

const { width, height } = Dimensions.get("window");

class Carousel extends Component {
  _scrollX = new Animated.Value(0);

  render() {
    return (
      <View style={styles.root}>
        <StatusBar hidden />

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
        <Image source={{ uri: LOGO_URI }} style={styles.logoImage} />
      </View>
    );
  }

  _renderItem = (item, i) => {
    return (
      <View key={item.id} style={[styles.root, styles.item]}>
        <Image source={{ uri: getImageUri(item.id) }} style={[styles.image]} />

        <View style={styles.metaContainer}>
          <Text style={[styles.font, styles.title]}>{item.title}</Text>
          <Text style={[styles.font, styles.subtitle]}>{item.subtitle}</Text>
          <Text style={[styles.font, styles.description]}>
            {item.description}
          </Text>
          <Text style={[styles.font, styles.price]}>{item.price}</Text>
        </View>

        {this._renderRadialGradient(item.bg)}
      </View>
    );
  };

  _renderRadialGradient = (color) => {
    return (
      <View style={styles.svgContainer}>
        <Svg height={height} width={width}>
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="35%"
              r="60%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <Stop offset="100%" stopColor={color} stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill={`url(#grad)`}
            fillOpacity="0.9"
          />
        </Svg>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    width,
    height,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10
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
  image: {
    width: width * 0.85,
    height: width * 0.85,
    resizeMode: "contain"
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
  },
  svgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1
  },
  logoImage: {
    width: width / 7,
    height: width / 7,
    position: "absolute",
    top: 10,
    resizeMode: "contain"
  }
});

export default Carousel;
