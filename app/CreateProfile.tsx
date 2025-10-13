import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CreateProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => { navigation.setOptions({ headerShown: false }); }, [navigation]);

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // New state for modal

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) setDob(selectedDate);
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera access is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Gallery access is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name || !email || !dob || !gender) {
      Alert.alert("Incomplete Profile", "Please fill out all fields.");
      return;
    }

    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      navigation.navigate("dashboard" as never);
    }, 5000); // 5 seconds delay
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#000"
          onPress={() => navigation.navigate('dashboard')}
        />
        <Text style={styles.headerText}>Fill Your Profile</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../assets/images/doctor2.jpg")
          }
          style={styles.profileImage}
        />
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() =>
            Alert.alert("Change Photo", "Select an option", [
              { text: "Camera", onPress: openCamera },
              { text: "Gallery", onPress: pickImage },
              { text: "Cancel", style: "cancel" },
            ])
          }
        >
          <Ionicons name="pencil" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Michael Jordan"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Nickname"
          value={nickname}
          onChangeText={setNickname}
          style={styles.input}
        />
        <TextInput
          placeholder="name@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        {/* Date Picker */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons
            name="calendar-outline"
            size={18}
            color="#999"
            style={styles.icon}
          />
          <Text style={styles.placeholderText}>
            {dob ? dob.toLocaleDateString() : "Date of Birth"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dob || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Gender Picker */}
        <View style={styles.pickerWrapper}>
          <Ionicons
            name="male-female-outline"
            size={18}
            color="#999"
            style={styles.icon}
          />
          <Picker
            selectedValue={gender}
            onValueChange={(value) => setGender(value)}
            style={styles.picker}
          >
            <Picker.Item label="Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.checkmarkWrapper}>
              <Ionicons name="checkmark-done-circle" size={64} color="#4CAF50" />
            </View>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalMessage}>
              Your account is ready to use. You will be redirected to the Home Page in a few seconds...
            </Text>
            <View style={styles.spinner}>
              <ActivityIndicator size="small" color="#555" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f2f2f2",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: "38%",
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 6,
  },
  inputContainer: {
    gap: 16,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
    backgroundColor: "#fff",
  },
  placeholderText: {
    color: "#999",
    fontSize: 15,
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  pickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: "#fff",
  },
  picker: {
    flex: 1,
    height: 50,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#1E293B",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 40,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  checkmarkWrapper: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  spinner: {
    marginTop: 10,
  },
});
