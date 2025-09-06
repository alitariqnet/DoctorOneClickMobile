import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Location Header */}
        <View style={styles.header}>
          <Icon name="location-sharp" size={20} color="#000" />
          <Text style={styles.locationText}>Seattle, USA</Text>
          <Icon name="chevron-down" size={20} color="#000" />
          <View style={styles.profileIcon}>
            <Icon name="person-circle-outline" size={32} color="#000" />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Icon name="search-outline" size={20} color="#999" />
          <TextInput
            placeholder="Search doctor..."
            style={styles.searchInput}
          />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Looking for</Text>
            <Text style={styles.bannerTitle}>Specialist Doctors?</Text>
            <Text style={styles.bannerSubtitle}>
              Schedule an appointment with our top doctors.
            </Text>
          </View>
          <Image
            source={require("../assets/images/doctor1.jpg")}
            style={styles.bannerImage}
          />
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <View style={styles.categories}>
          {[
            { name: "Dentistry", icon: "medkit-outline", color: "#fde2e2" },
            { name: "Cardiology", icon: "heart-outline", color: "#d6f5e5" },
            { name: "Pulmonology", icon: "lungs-outline", color: "#ffe5d9" },
            { name: "General", icon: "people-outline", color: "#e0d4f7" },
            { name: "Neurology", icon: "fitness-outline", color: "#c9f7f5" },
            { name: "Gastro", icon: "restaurant-outline", color: "#f5d0f9" },
            { name: "Laboratory", icon: "flask-outline", color: "#ffe1f0" },
            { name: "Vaccination", icon: "bandage-outline", color: "#d0f7fa" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryCard, { backgroundColor: item.color }]}
            >
              <Icon name={item.icon} size={26} color="#333" />
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nearby Medical Centers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Medical Centers</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            {
              name: "Sunrise Health Clinic",
              image: require("../assets/images/clinic1.jpg"),
            },
            {
              name: "Golden Cardiology",
              image: require("../assets/images/clinic2.jpg"),
            },
          ].map((center, index) => (
            <View key={index} style={styles.centerCard}>
              <Image source={center.image} style={styles.centerImage} />
              <Text style={styles.centerText}>{center.name}</Text>
            </View>
          ))}
        </ScrollView>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Icon name="home" size={26} color="#007AFF" />
        <Icon name="calendar-outline" size={26} color="#aaa" />
        <Icon name="chatbubble-outline" size={26} color="#aaa" />
        <Icon name="settings-outline" size={26} color="#aaa" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  locationText: { fontSize: 16, marginLeft: 5, fontWeight: "600" },
  profileIcon: { marginLeft: "auto" },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    marginHorizontal: 15,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: { marginLeft: 8, flex: 1, fontSize: 14 },
  banner: {
    flexDirection: "row",
    backgroundColor: "#d0f0f7",
    margin: 15,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  bannerTitle: { fontSize: 16, fontWeight: "700" },
  bannerSubtitle: { fontSize: 12, marginTop: 5, color: "#555" },
  bannerImage: { width: 80, height: 80, borderRadius: 40, marginLeft: 10 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700" },
  seeAll: { fontSize: 14, color: "#007AFF" },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  categoryCard: {
    width: "22%",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  categoryText: { fontSize: 12, marginTop: 6, textAlign: "center" },
  centerCard: {
    width: 160,
    marginLeft: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  centerImage: { width: "100%", height: 100 },
  centerText: {
    fontSize: 14,
    fontWeight: "600",
    padding: 8,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
});
