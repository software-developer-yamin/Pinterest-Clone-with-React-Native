import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
const CreatePinScreen = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
      }}
    >
      <Pressable
        onPress={pickImage}
        style={{
          ...styles.buttonContainer,
          backgroundColor: isDarkMode ? "white" : "black",
        }}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: isDarkMode ? "black" : "white",
          }}
        >
          Upload Your Pin
        </Text>
      </Pressable>
      {image && (
        <>
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              aspectRatio: 1,
              marginVertical: 20,
              borderRadius: 3,
            }}
          />
          <TextInput
            placeholder="Tittle..."
            value={title}
            placeholderTextColor={isDarkMode ? "white" : "black"}
            onChangeText={setTitle}
            style={{ ...styles.input,color: isDarkMode ? "white" : "black" }}
          />
          <Pressable
            onPress={pickImage}
            style={{
              ...styles.submitButton,
              backgroundColor: isDarkMode ? "white" : "black",
            }}
          >
            <Text
              style={{
                ...styles.submitText,
                color: isDarkMode ? "black" : "white",
              }}
            >
              Submit Pin
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default CreatePinScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    width: "90%",
    borderRadius: 50,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    padding: 10,
    width: "50%",
    borderRadius: 50,
    marginTop: 20,
  },
  submitText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    fontStyle: "italic",
    textTransform: "uppercase",
  },
});
