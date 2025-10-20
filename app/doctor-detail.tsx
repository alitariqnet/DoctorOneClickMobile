import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { JSX, useState } from 'react';
import {
    Image,
    ImageSourcePropType,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type RootStackParamList = {
  DoctorList: undefined;
  DoctorDetails: undefined;
  BookAppointment: { doctorId: string };
};

type DoctorDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DoctorDetails'
>;

interface DoctorDetailsScreenProps {
  navigation: DoctorDetailsScreenNavigationProp;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Doctor {
  name: string;
  specialty: string;
  clinic: string;
  rating: number;
  reviews: number;
  about: string;
  workingTime: string;
  image: ImageSourcePropType;
}

const DoctorDetailsScreen: React.FC<DoctorDetailsScreenProps> = ({ navigation }) => {
  const [showFullAbout, setShowFullAbout] = useState<boolean>(false);

  const doctor: Doctor = {
    name: "Dr. David Patel",
    specialty: "Cardiologist",
    clinic: "Golden Cardiology Center",
    rating: 4.8,
    reviews: 1072,
    about: "Dr. David Patel, a dedicated cardiologist, brings a wealth of experience to Golden Gate Cardiology Center in Golden Gate, CA. He specializes in interventional cardiology and has helped thousands of patients with heart conditions. With over 15 years of experience, Dr. Patel is known for his compassionate care and innovative treatment approaches.",
    workingTime: "Monday-Friday, 08.00 AM-18.00 PM",
    image: require('../assets/images/doctor1.jpg')
  };

  const reviews: Review[] = [
    {
      id: 1,
      name: "Emily Anderson",
      rating: 4,
      comment: "Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to anyone seeking cardiac care. His bedside manner is exceptional.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "Excellent doctor! Very thorough and explained everything clearly.",
      date: "1 month ago"
    }
  ];

  const renderStars = (rating: number): JSX.Element => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={16}
            color="#FFD700"
          />
        ))}
      </View>
    );
  };

  const handleBookAppointment = (): void => {
    // Navigate to booking screen
    navigation.navigate('BookAppointment', { doctorId: '1' });
  };

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
        <Text style={styles.headerTitle}>Doctor Details</Text>
        <View style={styles.headerIcon} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Doctor Profile Section */}
        <View style={styles.profileSection}>
          <Image source={doctor.image} style={styles.doctorImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            <Text style={styles.doctorClinic}>{doctor.clinic}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(Math.floor(doctor.rating))}
              <Text style={styles.ratingText}>({doctor.reviews} reviews)</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* About Me Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About me</Text>
          <Text style={styles.aboutText}>
            {showFullAbout ? doctor.about : `${doctor.about.substring(0, 100)}...`}
          </Text>
          <TouchableOpacity onPress={() => setShowFullAbout(!showFullAbout)}>
            <Text style={styles.viewMoreText}>
              {showFullAbout ? 'view less' : 'view more'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Working Time Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Working Time</Text>
          <Text style={styles.workingTimeText}>{doctor.workingTime}</Text>
        </View>

        <View style={styles.divider} />

        {/* Reviews Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <View style={styles.reviewRating}>
                  {renderStars(review.rating)}
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.seeAllReviewsButton}>
            <Text style={styles.seeAllReviewsText}>See all reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Spacer for bottom button */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Book Appointment Button */}
      <View style={styles.bookAppointmentContainer}>
        <TouchableOpacity 
          style={styles.bookAppointmentButton}
          onPress={handleBookAppointment}
        >
          <Text style={styles.bookAppointmentText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles remain the same as above
const styles = StyleSheet.create({
  // ... (same styles as in the JavaScript version)
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#2A7DE1',
    marginBottom: 2,
    fontWeight: '600',
  },
  doctorClinic: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  viewMoreText: {
    fontSize: 14,
    color: '#2A7DE1',
    fontWeight: '600',
  },
  workingTimeText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  reviewItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  reviewRating: {
    alignItems: 'flex-end',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  seeAllReviewsButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  seeAllReviewsText: {
    fontSize: 14,
    color: '#2A7DE1',
    fontWeight: '600',
  },
  spacer: {
    height: 100,
  },
  bookAppointmentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  bookAppointmentButton: {
    backgroundColor: '#2A7DE1',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
  },
  bookAppointmentText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DoctorDetailsScreen;