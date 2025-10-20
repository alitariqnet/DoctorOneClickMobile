import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const doctorsData = [
  {
    id: "1",
    name: "Dr. David Patel",
    specialty: "Cardiologist",
    location: "Cardiology Center, USA",
    rating: 5.0,
    reviews: 1872,
    image: require("../assets/images/doctor1.jpg"),
    bgColor: "#FCE4EC",
  },
  {
    id: "2",
    name: "Dr. Jessica Turner",
    specialty: "Gynecologist",
    location: "Women's Clinic, Seattle, USA",
    rating: 4.9,
    reviews: 127,
    image: require("../assets/images/doctor2.jpg"),
    bgColor: "#E3F2FD",
  },
  {
    id: "3",
    name: "Dr. Michael Johnson",
    specialty: "Orthopedic Surgeon",
    location: "Maple Associates, NY, USA",
    rating: 4.7,
    reviews: 5223,
    image: require("../assets/images/doctor3.jpg"),
    bgColor: "#FFF3E0",
  },
  {
    id: "4",
    name: "Dr. Emily Walker",
    specialty: "Pediatrics",
    location: "Serenity Pediatrics Clinic, USA",
    rating: 4.5,
    reviews: 405,
    image: require("../assets/images/clinic1.jpg"),
    bgColor: "#E8F5E9",
  },
];

const categories = ["All", "General", "Cardiologist", "Dentist", "Gynecologist"];

const AllDoctorsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = doctorsData.filter(
    (doctor) =>
      (selectedCategory === "All" ||
        doctor.specialty.toLowerCase().includes(selectedCategory.toLowerCase())) &&
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Doctors</Text>
        <View style={{ width: 24 }} /> {/* empty space for balance */}
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctor..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.activeCategoryText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Result Count and Sort */}
      <View style={styles.resultRow}>
        <Text style={styles.resultCount}>{filteredDoctors.length} founds</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Default </Text>
          <Ionicons name="swap-vertical-outline" size={16} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Doctor List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.imageContainer, { backgroundColor: item.bgColor }]}>
              <Image source={item.image} style={styles.doctorImage} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text style={styles.specialty}>{item.specialty}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#f5b300" />
                <Text style={styles.ratingText}>
                  {item.rating} ({item.reviews} Reviews)
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={22} color="#999" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default AllDoctorsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
  },
  categoryContainer: { flexGrow: 0, marginBottom: 10 },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    marginRight: 8,
  },
  categoryText: {
    fontSize: 13,
    color: "#333",
  },
  activeCategory: {
    backgroundColor: "#0E5EF9",
  },
  activeCategoryText: {
    color: "#fff",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  resultCount: { color: "#555", fontSize: 13 },
  sortButton: { flexDirection: "row", alignItems: "center" },
  sortText: { color: "#555", fontSize: 13 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 14,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  infoContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  specialty: {
    color: "#666",
    fontSize: 13,
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "#666",
    fontSize: 12,
    marginLeft: 3,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  ratingText: {
    color: "#444",
    fontSize: 12,
    marginLeft: 4,
  },
  favoriteButton: {
    alignSelf: "flex-start",
    padding: 5,
  },
});
