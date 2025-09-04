import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DasboardScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Location and Search Bar */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Seattle, USA</Text>
        <TouchableOpacity style={styles.searchBar}>
          <Icon name="magnify" size={20} color="#A0A0A0" />
          <TextInput placeholder="Search doctors..." style={styles.searchInput} />
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image source={{ uri: 'https://example.com/doctor-image.jpg' }} style={styles.heroImage} />
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>Looking for Specialist Doctors?</Text>
          <Text style={styles.heroSubtitle}>Schedule an appointment with our top doctors.</Text>
        </View>
      </View>

      {/* Categories Section */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Dentistry', 'Cardiology', 'Pulmonology', 'General', 'Neurology', 'Gastroenterology', 'Laboratory', 'Vaccination'].map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard}>
              <Icon name="stethoscope" size={40} color="#fff" style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Nearby Medical Centers */}
      <View style={styles.medicalCentersSection}>
        <Text style={styles.sectionTitle}>Nearby Medical Centers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Sunrise Health Clinic', 'Golden Cardiological', 'City Medical Center'].map((center, index) => (
            <View key={index} style={styles.centerCard}>
              <Image source={{ uri: 'https://example.com/clinic-image.jpg' }} style={styles.centerImage} />
              <Text style={styles.centerText}>{center}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="#0F1C2E" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon name="magnify" size={30} color="#0F1C2E" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="account" size={30} color="#0F1C2E" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F1C2E',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  heroSection: {
    marginBottom: 40,
    borderRadius: 8,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  heroTextContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
  },
  categoriesSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F1C2E',
    marginBottom: 10,
  },
  categoryCard: {
    backgroundColor: '#F4A300',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
  categoryIcon: {
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  medicalCentersSection: {
    marginBottom: 40,
  },
  centerCard: {
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerImage: {
    width: 120,
    height: 100,
    borderRadius: 8,
  },
  centerText: {
    marginTop: 10,
    fontSize: 14,
    color: '#0F1C2E',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
});

