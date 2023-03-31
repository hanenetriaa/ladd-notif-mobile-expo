import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, CameraType } from "expo-camera";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createUser } from "../../redux/actions/authActions/registerUser";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const error = useSelector((state) => state.auth.error);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const takePicture = async () => {
    if (profilePicture) {
      const photo = await profilePicture.takePictureAsync();
      setProfilePicture(photo.uri);
    }
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const imageGalleryLaunch = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfilePicture({
        uri: res.assets[0].uri,
        name: res.assets[0].fileName,
        type: res.assets[0].type,
      });
    }
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePicture", profilePicture);
    try {
      await dispatch(createUser(formData));
      // Si l'enregistrement réussit, redirigez l'utilisateur vers la page de connexion.
      navigation.navigate("Login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {profilePicture && (
        <Image
          source={{ uri: profilePicture.uri }}
          style={styles.profilePicture}
        />
      )}
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
          <Text style={styles.cameraButtonText}>Take picture</Text>
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity style={styles.imagePicker} onPress={imageGalleryLaunch}>
        <Text style={styles.imagePickerText}>Choose from gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button1} onPress={handleRegister}>
        <Text style={styles.imagePickerText}>Register</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container1: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
  },

  camera: {
    flex: 1,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    marginBottom: 10,
  },

  button1: {
    backgroundColor: "#22C55E",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
  },
  imagePicker: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  imagePickerText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default RegisterScreen;
