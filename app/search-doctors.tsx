import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

type RootStackParamList = {
  Search: undefined;
  DoctorDetails: { doctor: Doctor };
};

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  image: any;
  category: string;
  latitude?: number;
  longitude?: number;
  address: string;
}

interface SearchResult {
  id: string;
  name: string;
  type: 'doctor' | 'hospital';
  specialty?: string;
  rating?: number;
  reviews?: number;
  address: string;
  latitude: number;
  longitude: number;
}

const { width, height } = Dimensions.get('window');

const SearchDoctorsScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 37.7749, // San Francisco coordinates
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLocation, setSelectedLocation] = useState<SearchResult | null>(null);

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
      category: 'Cardiologist',
      latitude: 37.7749,
      longitude: -122.4194,
      address: '123 Medical Center Dr, San Francisco, CA'
    },
    {
      id: '2',
      name: 'Dr. Jessica Turner',
      specialty: 'Gynecologist',
      location: 'Women\'s Clinic, Seattle, USA',
      rating: 4.8,
      reviews: 127,
      image: require('../assets/images/doctor2.jpg'),
      category: 'General',
      latitude: 37.7833,
      longitude: -122.4167,
      address: '456 Health Ave, San Francisco, CA'
    },
    {
      id: '3',
      name: 'Dr. Michael Johnson',
      specialty: 'Orthopedic Surgery',
      location: 'Maple Associates, NY, USA',
      rating: 4.7,
      reviews: 5223,
      image: require('../assets/images/doctor3.jpg'),
      category: 'General',
      latitude: 37.7589,
      longitude: -122.4189,
      address: '789 Bone St, San Francisco, CA'
    },
    {
      id: '4',
      name: 'Dr. Emily Walker',
      specialty: 'Pediatrics',
      location: 'Serenity Pediatrics Clinic',
      rating: 4.9,
      reviews: 405,
      image: require('../assets/images/doctor4.jpg'),
      category: 'Pediatrics',
      latitude: 37.7699,
      longitude: -122.4094,
      address: '321 Child Care Ln, San Francisco, CA'
    }
  ];

  const hospitals: SearchResult[] = [
    {
      id: 'h1',
      name: 'San Francisco General Hospital',
      type: 'hospital',
      address: '1001 Potrero Ave, San Francisco, CA',
      latitude: 37.7558,
      longitude: -122.4065
    },
    {
      id: 'h2',
      name: 'UCSF Medical Center',
      type: 'hospital',
      address: '505 Parnassus Ave, San Francisco, CA',
      latitude: 37.7630,
      longitude: -122.4580
    }
  ];

  // Convert doctors to search results format
  const doctorSearchResults: SearchResult[] = doctors.map(doctor => ({
    id: doctor.id,
    name: doctor.name,
    type: 'doctor' as const,
    specialty: doctor.specialty,
    rating: doctor.rating,
    reviews: doctor.reviews,
    address: doctor.address,
    latitude: doctor.latitude || 37.7749,
    longitude: doctor.longitude || -122.4194
  }));

  // Combine all search results
  const allSearchResults: SearchResult[] = [...doctorSearchResults, ...hospitals];

  useEffect(() => {
    // Filter results based on search text and category
    const filtered = allSearchResults.filter(result => {
      const matchesSearch = result.name.toLowerCase().includes(searchText.toLowerCase()) ||
                           (result.specialty && result.specialty.toLowerCase().includes(searchText.toLowerCase())) ||
                           result.address.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || 
                             (result.type === 'doctor' && 
                              (result as any).category === selectedCategory);
      
      return matchesSearch && matchesCategory;
    });

    setSearchResults(filtered);

    // Update map to show all markers if there are results
    if (filtered.length > 0) {
      const coordinates = filtered.map(result => ({
        latitude: result.latitude,
        longitude: result.longitude
      }));

      // Calculate region that fits all markers
      const minLat = Math.min(...coordinates.map(coord => coord.latitude));
      const maxLat = Math.max(...coordinates.map(coord => coord.latitude));
      const minLng = Math.min(...coordinates.map(coord => coord.longitude));
      const maxLng = Math.max(...coordinates.map(coord => coord.longitude));

      setMapRegion({
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: (maxLat - minLat) * 1.1,
        longitudeDelta: (maxLng - minLng) * 1.1,
      });
    }
  }, [searchText, selectedCategory]);

  const handleMarkerPress = (result: SearchResult): void => {
    setSelectedLocation(result);
    // Center map on selected marker
    setMapRegion({
      ...mapRegion,
      latitude: result.latitude,
      longitude: result.longitude,
    });
  };

  const handleResultPress = (result: SearchResult): void => {
    if (result.type === 'doctor') {
      const doctor = doctors.find(d => d.id === result.id);
      if (doctor) {
        navigation.navigate('DoctorDetails', { doctor });
      }
    } else {
      Alert.alert(
        result.name,
        `${result.address}\n\nHospital details coming soon...`
      );
    }
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity 
      style={styles.resultCard}
      onPress={() => handleResultPress(item)}
    >
      <View style={styles.resultIcon}>
        <Ionicons 
          name={item.type === 'doctor' ? 'medical' : 'business'} 
          size={24} 
          color="#2A7DE1" 
        />
      </View>
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>{item.name}</Text>
        {item.specialty && (
          <Text style={styles.resultSpecialty}>{item.specialty}</Text>
        )}
        <Text style={styles.resultAddress}>{item.address}</Text>
        {item.rating && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
          </View>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
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
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.headerIcon} />
      </View>

      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, hospitals, locations..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#888"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map(renderCategoryItem)}
        </ScrollView>

        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={mapRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {searchResults.map((result) => (
              <Marker
                key={result.id}
                coordinate={{
                  latitude: result.latitude,
                  longitude: result.longitude
                }}
                title={result.name}
                description={result.specialty || result.address}
                onPress={() => handleMarkerPress(result)}
              >
                <View style={[
                  styles.marker,
                  selectedLocation?.id === result.id && styles.markerSelected
                ]}>
                  <Ionicons 
                    name={result.type === 'doctor' ? 'medical' : 'business'} 
                    size={16} 
                    color="white" 
                  />
                </View>
              </Marker>
            ))}
          </MapView>
        </View>

        {/* Search Results */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>
            {searchResults.length} Results Found
          </Text>
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resultsList}
          />
        </View>
      </View>
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerIcon: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    margin: 20,
    marginBottom: 12,
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
    paddingHorizontal: 20,
    marginBottom: 12,
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
  mapContainer: {
    height: height * 0.35,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    backgroundColor: '#2A7DE1',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  markerSelected: {
    backgroundColor: '#FF6B6B',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  resultsList: {
    paddingBottom: 20,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  resultSpecialty: {
    fontSize: 14,
    color: '#2A7DE1',
    fontWeight: '600',
    marginBottom: 4,
  },
  resultAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 4,
    marginRight: 8,
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
  },
});

export default SearchDoctorsScreen;