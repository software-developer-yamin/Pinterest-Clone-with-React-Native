import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { IMasonryList } from "../types";
import Pin from "./Pin";
import { Text, View } from "./Themed";

interface Props {
  pins: IMasonryList[];
}

const MasonryList = ({ pins }: Props) => {
  const numColumns = Math.ceil(useWindowDimensions().width / 350);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {Array.from(Array(numColumns)).map((_, colIndex) => (
          <View key={colIndex} style={styles.column}>
            {pins
              .filter((_, index) => index % numColumns === colIndex)
              .map((pin) => (
                <Pin key={pin.id} {...pin} />
              ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MasonryList;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  column: {
    flex: 1,
  },
});
