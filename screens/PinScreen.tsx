import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useNhostClient } from "@nhost/react";
import RemoteImage from "../components/RemoteImage";

const GET_PIN_QUERY = `
query MyQuery ($id: uuid!) {
  pins_by_pk(id: $id) {
    created_at
    id
    image
    title
    user_id
    user {
      avatarUrl
      displayName
    }
  }
}
`;

const PinScreen = () => {
  const [pin, setPin] = useState<any>(null);
  const nhost = useNhostClient();
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const {id}: any = route?.params;

  useEffect(() => {
    const fetchPin = async () => {
      const {data} = await nhost.graphql.request(GET_PIN_QUERY, { id });
        setPin(data.pins_by_pk);
    };
    fetchPin();
  }, [id]);

  if (!pin) {
    return <Text>Pin not found</Text>;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <RemoteImage fileId={pin.image} />
        <Text style={styles.title}>{pin.title}</Text>
      </View>

      <Pressable
        onPress={() => navigation.goBack()}
        style={[styles.backBtn, { top: insets.top + 20 }]}
      >
        <Ionicons name={"chevron-back"} size={35} color={"white"} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  title: {
    margin: 10,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 35,
  },
  backBtn: {
    position: "absolute",
    left: 10,
  },
});

export default PinScreen;
