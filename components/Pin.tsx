import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Props {
  image: string;
  title: string;
}

const Pin = ({ image, title }: Props) => {
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    image && Image.getSize(image, (width, height) => setRatio(width / height));
  }, [image]);

  Image.getSize(image, (width, height) => setRatio(width / height));
  return (
    <View style={styles.container}>
      <View>
        <Image
          resizeMode="cover"
          source={{
            uri: image,
          }}
          style={{ ...styles.image, aspectRatio: ratio }}
        />
        <Pressable style={styles.heartBtn}>
          <AntDesign name="hearto" size={16} color="black" />
        </Pressable>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};

export default Pin;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 4,
  },
  image: {
    width: "100%",
    borderRadius: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    margin: 5,
    lineHeight: 22,
    color:"#181818"
  },
  heartBtn: {
    position: "absolute",
    backgroundColor: "#D3CFD4",
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 50,
  },
});
