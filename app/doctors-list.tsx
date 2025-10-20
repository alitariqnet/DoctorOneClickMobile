import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    ImageSourcePropType,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

type RootStackParamList = {
  DoctorsList: undefined;
  DoctorDetails: { doctor: Doctor };
};

type DoctorsListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DoctorsList'
>;

interface DoctorsListScreenProps {
  navigation: DoctorsListScreenNavigationProp;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  image: ImageSourcePropType;
  category: string;
}

const DoctorsListScreen: React.FC<DoctorsListScreenProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('Default');

  const categories: string[] = ['All', 'General', 'Cardiologist', 'Dentist', 'Neurology', 'Pediatrics'];

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. David Patel',
      specialty: 'Cardiologist',
      location: 'Cardiology Center, USA',
      rating: 4.8,
      reviews: 1872,
      image: require('../assets/images/doctor1.jpg'),
      category: 'Cardiologist'
    },
    {
      id: '2',
      name: 'Dr. Jessica Turner',
      specialty: 'Gynecologist',
      location: 'Women\'s Clinic, Seattle, USA',
      rating: 4.8,
      reviews: 127,
      image: require('../assets/images/doctor2.jpg'),
      category: 'General'
    },
    {
      id: '3',
      name: 'Dr. Michael Johnson',
      specialty: 'Orthopedic Surgery',
      location: 'Maple Associates, NY, USA',
      rating: 4.7,
      reviews: 5223,
      image: require('../assets/images/doctor3.jpg'),
      category: 'General'
    },
    {
      id: '4',
      name: 'Dr. Emily Walker',
      specialty: 'Pediatrics',
      location: 'Serenity Pediatrics Clinic',
      rating: 4.9,
      reviews: 405,
      image: require('../assets/images/doctor4.jpg'),
      category: 'Pediatrics'
    },
    {
      id: '5',
      name: 'Dr. Robert Chen',
      specialty: 'Dentist',
      location: 'Bright Smile Dental, CA',
      rating: 4.6,
      reviews: 892,
      image: require('../assets/images/doctor5.jpg'),
      category: 'Dentist'
    },
    {
      id: '6',
      name: 'Dr. Sarah Williams',
      specialty: 'Neurologist',
      location: 'Neuro Care Center, Boston',
      rating: 4.9,
      reviews: 654,
      image: require('../assets/images/doctor6.jpg'),
      category: 'Neurology'
    }
  ];

  const filteredDoctors: Doctor[] = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doctor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderDoctorItem = ({ item }: { item: Doctor }) => (
    <TouchableOpacity 
      style={styles.doctorCard}
      onPress={() => navigation.navigate('DoctorDetails', { doctor: item })}
    >
      <Image source={item.image} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.doctorLocation}>{item.location}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingStars}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.reviewsText}>{item.reviews.toLocaleString()} Reviews</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.categoryButtonSelected
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === category && styles.categoryTextSelected
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with time and title */}
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
        <Text style={styles.screenTitle}>All Doctors</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctor..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#888"
        />
      </View>

      {/* Categories Horizontal Scroll */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map(renderCategoryItem)}
      </ScrollView>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredDoctors.length} found{filteredDoctors.length !== 1 ? 's' : ''}
        </Text>
        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => {
            setSortOption(sortOption === 'Default' ? 'Rating' : 'Default');
          }}
        >
          <Text style={styles.sortText}>{sortOption}</Text>
          <Ionicons name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Doctors List */}
      <FlatList
        data={filteredDoctors}
        renderItem={renderDoctorItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No doctors found</Text>
            <Text style={styles.emptyStateSubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerRight: {
    width: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    margin: 20,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  categoriesContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryButtonSelected: {
    backgroundColor: '#2A7DE1',
    borderColor: '#2A7DE1',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  sortText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginRight: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#2A7DE1',
    fontWeight: '600',
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  doctorLocation: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 4,
    marginRight: 8,
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default DoctorsListScreen;