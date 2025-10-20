// screens/FavoritesScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type RootStackParamList = {
  Favorites: undefined;
  DoctorDetails: { doctor: Doctor };
};

type FavoritesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Favorites'
>;

interface FavoritesScreenProps {
  navigation: FavoritesScreenNavigationProp;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  image: any;
  isFavorite: boolean;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const [favoriteDoctors, setFavoriteDoctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. David Patel',
      specialty: 'Cardiologist',
      location: 'Cardiology Center, USA',
      rating: 4.8,
      reviews: 1872,
      image: require('../assets/doctor1.jpg'),
      isFavorite: true
    },
    {
      id: '2',
      name: 'Dr. Jessica Turner',
      specialty: 'Gynecologist',
      location: 'Women\'s Clinic, Seattle, USA',
      rating: 4.8,
      reviews: 127,
      image: require('../assets/doctor2.jpg'),
      isFavorite: true
    },
    {
      id: '3',
      name: 'Dr. Michael Johnson',
      specialty: 'Orthopedic Surgery',
      location: 'Maple Associates, NY, USA',
      rating: 4.7,
      reviews: 5223,
      image: require('../assets/doctor3.jpg'),
      isFavorite: true
    },
    {
      id: '4',
      name: 'Dr. Emily Walker',
      specialty: 'Pediatrics',
      location: 'Serenity Pediatrics Clinic',
      rating: 4.9,
      reviews: 405,
      image: require('../assets/doctor4.jpg'),
      isFavorite: true
    }
  ]);

  const toggleFavorite = (doctorId: string): void => {
    setFavoriteDoctors(favoriteDoctors.map(doctor =>
      doctor.id === doctorId
        ? { ...doctor, isFavorite: !doctor.isFavorite }
        : doctor
    ));
  };

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
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews} reviews)</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons 
          name={item.isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color="#FF6B6B" 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
        <Text style={styles.screenTitle}>Favorites</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Doctors Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Doctors</Text>
        {favoriteDoctors.length > 0 ? (
          <FlatList
            data={favoriteDoctors}
            renderItem={renderDoctorItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No favorite doctors yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Start adding doctors to your favorites to see them here
            </Text>
          </View>
        )}
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
  section: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 16,
  },
  listContent: {
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
  favoriteButton: {
    padding: 4,
    alignSelf: 'flex-start',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default FavoritesScreen;