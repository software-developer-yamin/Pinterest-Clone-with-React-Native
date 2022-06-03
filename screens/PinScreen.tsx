import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
//import pins from "../assets/data/pins";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNhostClient } from "@nhost/react";

interface pinProps {
  image: string;
  title: string;
}

const PinScreen = () => {
  const [ratio, setRatio] = useState(1);
  const nhost = useNhostClient();
  const [pin, setPin] = useState<pinProps | null>(null);
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const { id }: any = route?.params;

  useEffect(() => {
    const fetchPin = async () => {
      try {
        const { data } = await nhost.graphql.request(`
      query MyQuery {
        pins_by_pk(id: "${id}") {
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
      `);
        setPin(data.pins_by_pk);
      } catch (error: any) {
        Alert.alert("Error", error.message);
      }
    };
    fetchPin();
  }, []);

  useEffect(() => {
    pin?.image &&
      Image.getSize(pin?.image, (width, height) => setRatio(width / height));
  }, [Image]);

  console.log(pin);

  return (
    <SafeAreaView style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: pin?.image }}
          style={{ ...styles.image, aspectRatio: ratio }}
          resizeMode="cover"
        />
        <Text style={{ ...styles.title }}>{pin?.title}</Text>
      </ScrollView>
      <Ionicons
        onPress={() => navigation.goBack()}
        name="chevron-back"
        size={35}
        color="white"
        style={{ ...styles.icon, top: top + 20 }}
      />
    </SafeAreaView>
  );
};

export default PinScreen;

const styles = StyleSheet.create({
  container: {
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
    fontSize: 24,
    fontWeight: "600",
    margin: 10,
    textAlign: "center",
    lineHeight: 35,
  },
  icon: {
    position: "absolute",
    left: 10,
  },
});
