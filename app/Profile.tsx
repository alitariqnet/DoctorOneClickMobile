import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { RootStackParamList } from "../../App"; // adjust the path to your App.tsx

const ProfileScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  React.useLayoutEffect(() => {
      navigation.setOptions({ title: "" });
    }, [navigation]);
    
  const profileOptions = [
    { icon: "person-outline", label: "Edit Profile" },
    { icon: "heart-outline", label: "Favorite" },
    { icon: "notifications-outline", label: "Notifications" },
    { icon: "settings-outline", label: "Settings" },
    { icon: "help-circle-outline", label: "Help and Support" },
    { icon: "document-text-outline", label: "Terms and Conditions" },
    { icon: "log-out-outline", label: "Log Out" },
  ];

  // Handle logout confirmation
  const handleLogout = () => {
    setShowLogoutModal(false);
    navigation.replace("SignIn"); // goes back to SignIn screen and clears history
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Profile</Text>

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <View>
          <Image
            source={require("../assets/images/doctor2.jpg")}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Feather name="edit-3" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Daniel Martinez</Text>
        <Text style={styles.phone}>+123 856479683</Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        {profileOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              if (item.label === "Log Out") {
                setShowLogoutModal(true);
              } else {
                console.log(item.label);
              }
            }}
          >
            <Ionicons name={item.icon as any} size={22} color="#333" />
            <Text
              style={[
                styles.menuLabel,
                item.label === "Log Out" && { color: "black" },
              ]}
            >
              {item.label}
            </Text>
            <Feather name="chevron-right" size={20} color="#aaa" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Confirmation Modal */}
      <Modal transparent visible={showLogoutModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.logoutBtn]}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginTop: 10,
  },
  phone: {
    fontSize: 14,
    color: "#888",
  },
  menuContainer: {
    width: "90%",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 5, marginLeft: 130 },
  modalText: { fontSize: 15, color: "#555", marginBottom: 20,  marginLeft: 60 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelBtn: { backgroundColor: "#eee" },
  logoutBtn: { backgroundColor: "#000" },
  cancelText: { fontSize: 15, color: "#333" },
  logoutText: { fontSize: 15, color: "#fff" },
});

export default ProfileScreen;
