import { FlatList, ScrollView, StyleSheet } from "react-native";
import Pin from "../components/Pin";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import pins from "../assets/data/pins";

const pin = pins[0];

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.column} >
          {pins
            .filter((item, index) => index % 2 === 0)
            .map((pin) => (
              <Pin key={pin.id} {...pin} />
            ))}
        </View>
        <View style={styles.column} >
        {pins
            .filter((item, index) => index % 2 === 1)
            .map((pin) => (
              <Pin key={pin.id} {...pin} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  column: {
    flex: 1,
  }
});
