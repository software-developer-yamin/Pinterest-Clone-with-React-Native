import { Entypo, Feather } from "@expo/vector-icons";
import { useNhostClient, useSignOut, useUserId } from "@nhost/react";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import pins from "../assets/data/pins";
import MasonryList from "../components/MasonryList";
import { Text, View } from "../components/Themed";

const GET_USER_QUERY = `
query MyQuery($id: uuid!) {
  user(id: $id) {
    id
    avatarUrl
    displayName
    pins {
      id
      image
      title
      created_at
    }
  }
}
`;

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { signOut } = useSignOut();
  const nhost = useNhostClient();
  const [user, setUser] = useState();
  const userId = useUserId();

  const fetchUserData = async () => {
    const result = await nhost.graphql.request(GET_USER_QUERY, { id: userId });
    console.log(result);
    if (result.error) {
      Alert.alert("Error fetching the user");
    } else {
      setUser(result.data.user);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.info}>
        <View style={styles.iconContainer}>
          <Feather
            size={24}
            name="share"
            onPress={signOut}
            color="gray"
            style={styles.icon}
          />
          <Entypo
            size={24}
            name="dots-three-horizontal"
            color="gray"
            style={styles.icon}
          />
        </View>
        <Image
          source={{
            uri: user.avatarUrl,
          }}
          style={styles.image}
        />
        <Text style={styles.title}>{user.displayName}</Text>
        <Text
          style={{ ...styles.subtitle, color: isDarkMode ? "white" : "black" }}
        >
          123 Follower | 543 Followings
        </Text>
      </View>
      <MasonryList pins={user.pins} onRefresh={fetchUserData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  info: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 200,
  },
  subtitle: {
    color: "#181818",
    fontWeight: "600",
    paddingBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
});
