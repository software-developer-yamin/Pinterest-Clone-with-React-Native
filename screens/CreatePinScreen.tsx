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
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNhostClient } from "@nhost/react";
import { useNavigation } from "@react-navigation/native";

const CREATE_PIN_MUTATION = `
mutation MyMutation ($image: String!, $title: String) {
  insert_pins(objects: {image: $image, title: $title}) {
    returning {
      created_at
      id
      image
      title
      user_id
    }
  }
}
`;

const CreatePinScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [imageUri, setImageUri] = useState<null | string>(null);
  const [title, setTitle] = useState("");

  const nhost = useNhostClient();
  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const uploadFile = async () => {
    if (!imageUri) {
      return {
        error: {
          message: "No image selected",
        },
      };
    }

    const parts = imageUri.split("/");
    const name = parts[parts.length - 1];
    const nameParts = name.split(".");
    const extension = nameParts[nameParts.length - 1];

    const uri =
      Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri;

    const result = await nhost.storage.upload({
      file: {
        name,
        type: `image/${extension}`,
        uri,
      },
    });
    return result;
  };

  const onSubmit = async () => {
    // TODO upload image to storage
    const uploadResult = await uploadFile();

    if (uploadResult.error) {
      console.log(uploadResult.error);
      //Alert.alert("Error uploading the image", uploadResult.error.message);
      return;
    }

    const result = await nhost.graphql.request(CREATE_PIN_MUTATION, {
      title,
      image: uploadResult.fileMetadata.id,
    });

    if (result.error) {
      Alert.alert("Error creating the post", result.error.message);
    } else {
      navigation.goBack();
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
      {imageUri && (
        <>
          <Image
            source={{ uri: imageUri }}
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
            style={{ ...styles.input, color: isDarkMode ? "white" : "black" }}
          />
          <Pressable
            onPress={onSubmit}
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
