import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const Index = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');

  // Sample data for doctors
  const doctors = [
    {
      id: '1',
      name: 'Dr. David Patel',
      specialty: 'Cardiologist',
      location: 'Cardiology Center, USA',
      reviews: 1072,
      rating: 4.8,
      // image: require('./assets/images/doctor1.jpg') // You would need to add these images
    },
    {
      id: '2',
      name: 'Dr. Jessica Turner',
      specialty: 'Gynecologist',
      location: "Women's Clinic, Seattle, USA",
      reviews: 107,
      rating: 4.0,
      // image: require('./assets/images/doctor2.jpg')
    },
    {
      id: '3',
      name: 'Dr. Michael Johnson',
      specialty: 'Orthopedic Surgery',
      location: 'Mage Associates, NY, USA',
      reviews: 5223,
      rating: 4.7,
      // image: require('./assets/images/doctor3.jpg')
    },
    {
      id: '4',
      name: 'Dr. Emily Walker',
      specialty: 'Pediatrics',
      location: 'Severity Pediatrics Clinic',
      reviews: 446,
      rating: 4.5,
      // image: require('./assets/images/doctor4.jpg')
    }
  ];

  // Sample data for medical centers
  const medicalCenters = [
    {
      id: '1',
      name: 'Sanrise Health Clinic',
      address: '123 Oak Street, CA 08750',
      rating: 4.5,
      reviews: 53,
      distance: '3.5 km'
    },
    {
      id: '2',
      name: 'Golden Cardiol',
      address: '566 Brugge Site',
      rating: 4.9,
      reviews: 10,
      distance: '2.5 km'
    }
  ];

  // Categories for filtering
  const categories = ['General', 'Cardiologist', 'Dentist', 'Neurology'];

  const renderDoctorItem = ({ item }) => (
    <TouchableOpacity style={styles.doctorCard}>
      <Image source={item.image} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
        <Text style={styles.doctorLocation}>{item.location}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews} Reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMedicalCenter = ({ item }) => (
    <TouchableOpacity style={styles.centerCard}>
      <View style={styles.centerInfo}>
        <Text style={styles.centerName}>{item.name}</Text>
        <Text style={styles.centerAddress}>{item.address}</Text>
        <View style={styles.centerRatingContainer}>
          <Text style={styles.centerRating}>{item.rating}</Text>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Ionicons 
                key={i} 
                name="star" 
                size={16} 
                color={i < Math.floor(item.rating) ? "#FFD700" : "#CCC"} 
              />
            ))}
          </View>
          <Text style={styles.centerReviews}>({item.reviews} Reviews)</Text>
        </View>
        <Text style={styles.distance}>{item.distance}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Looking for Specialist Doctors?</Text>
        <Text style={styles.headerSubtitle}>
          Contact us at <Text style={styles.website}>www.icmnet.com</Text> and help doctors.
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Doctor, Hospital"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonSelected
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextSelected
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Nearby Medical Centers */}
        <Text style={styles.sectionTitle}>Nearby Medical Centers</Text>
        <FlatList
          data={medicalCenters}
          renderItem={renderMedicalCenter}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />

        {/* All Doctors */}
        <View style={styles.doctorsHeader}>
          <Text style={styles.sectionTitle}>All Doctors</Text>
          <Text style={styles.doctorCount}>532 doctors</Text>
        </View>
        
        <FlatList
          data={doctors}
          renderItem={renderDoctorItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    padding: 16,
  },
  header: {
    padding: 16,
    backgroundColor: '#2A7DE1',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
  },
  website: {
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginVertical: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#333',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonSelected: {
    backgroundColor: '#2A7DE1',
  },
  categoryText: {
    color: '#666',
  },
  categoryTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  centerCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  centerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  centerAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  centerRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  centerRating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  centerReviews: {
    fontSize: 14,
    color: '#666',
  },
  distance: {
    fontSize: 14,
    color: '#2A7DE1',
  },
  doctorsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  doctorCount: {
    fontSize: 14,
    color: '#666',
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#2A7DE1',
    marginBottom: 2,
  },
  doctorLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Index;