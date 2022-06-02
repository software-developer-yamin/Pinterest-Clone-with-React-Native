import React from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { IMasonryList } from "../types";
import Pin from "./Pin";
import { Text, View } from "./Themed";

interface Props {
  pins: IMasonryList[];
}

const MasonryList = ({ pins }: Props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.container}>
        <View style={styles.column}>
          {pins
            .filter((_, index) => index % 2 === 0)
            .map((pin) => (
              <Pin key={pin.id} {...pin} />
            ))}
        </View>
        <View style={styles.column}>
          {pins
            .filter((_, index) => index % 2 === 1)
            .map((pin) => (
              <Pin key={pin.id} {...pin} />
            ))}
        </View>
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
