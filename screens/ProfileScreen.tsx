import { Image, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://scontent.fdac135-1.fna.fbcdn.net/v/t1.6435-9/148289406_105993934859783_4291012364172084677_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeHHignath6-ofch3atPiqpE64w4ust0LsTrjDi6y3QuxCkntvw6oUkXov-djo-6EvaEanD96ck_s99Yqu9urpyh&_nc_ohc=EHY6wbmB4vEAX-zQaxg&_nc_ht=scontent.fdac135-1.fna&oh=00_AT9VhOYysxQoQ7qlxtVsf4-kFwsmiVv88-pGYgGjgkjAhw&oe=62BED03D",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Yamin</Text>
      <Text style={styles.subtitle}>123 Follower | 456 Followings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
  },
  image: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 200,
  },
  subtitle: {
    color: "#181818",
    fontWeight: "600",
  },
});
