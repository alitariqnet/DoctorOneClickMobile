// screens/MyBookingsScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type RootStackParamList = {
  MyBookings: undefined;
  DoctorDetails: { doctor: Doctor };
};

type MyBookingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyBookings'
>;

interface MyBookingsScreenProps {
  navigation: MyBookingsScreenNavigationProp;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  image: any;
}

interface Booking {
  id: string;
  date: string;
  time: string;
  doctor: Doctor;
  status: 'upcoming' | 'completed' | 'canceled';
}

const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'completed' | 'canceled'>('upcoming');

  const bookings: Booking[] = [
    {
      id: '1',
      date: 'May 22, 2023',
      time: '10.00 AM',
      doctor: {
        id: '1',
        name: 'Dr. James Robinson',
        specialty: 'Orthopedic Surgery',
        clinic: 'Elite Ortho Clinic, USA',
        image: require('../assets/doctor1.jpg')
      },
      status: 'upcoming'
    },
    {
      id: '2',
      date: 'June 14, 2023',
      time: '15.00 PM',
      doctor: {
        id: '2',
        name: 'Dr. Daniel Lee',
        specialty: 'Gastroenterologist',
        clinic: 'Digestive Institute, USA',
        image: require('../assets/doctor2.jpg')
      },
      status: 'upcoming'
    },
    {
      id: '3',
      date: 'June 21, 2023',
      time: '10.00 AM',
      doctor: {
        id: '3',
        name: 'Dr. Markus Hazzler',
        specialty: 'Cardiologist',
        clinic: 'HeartCare Center, USA',
        image: require('../assets/doctor3.jpg')
      },
      status: 'upcoming'
    },
    {
      id: '4',
      date: 'March 12, 2023',
      time: '11.00 AM',
      doctor: {
        id: '4',
        name: 'Dr. Sarah Johnson',
        specialty: 'Gynecologist',
        clinic: 'Women\'s Health Clinic',
        image: require('../assets/doctor4.jpg')
      },
      status: 'completed'
    },
    {
      id: '5',
      date: 'March 2, 2023',
      time: '12.00 PM',
      doctor: {
        id: '5',
        name: 'Dr. Michael Chang',
        specialty: 'Cardiologist',
        clinic: 'HeartCare Center, USA',
        image: require('../assets/doctor5.jpg')
      },
      status: 'completed'
    },
    {
      id: '6',
      date: 'Feb 2, 2023',
      time: '9.00 AM',
      doctor: {
        id: '6',
        name: 'Dr. Emily Walker',
        specialty: 'Pediatrics',
        clinic: 'Serenity Pediatrics Clinic',
        image: require('../assets/doctor6.jpg')
      },
      status: 'completed'
    }
  ];

  const filteredBookings = bookings.filter(booking => booking.status === selectedTab);

  const renderBookingCard = (booking: Booking) => (
    <View key={booking.id} style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingDateTime}>
          {booking.date} - {booking.time}
        </Text>
      </View>
      
      <View style={styles.doctorInfo}>
        <Image source={booking.doctor.image} style={styles.doctorImage} />
        <View style={styles.doctorDetails}>
          <Text style={styles.doctorName}>{booking.doctor.name}</Text>
          <Text style={styles.doctorSpecialty}>{booking.doctor.specialty}</Text>
          <Text style={styles.doctorClinic}>{booking.doctor.clinic}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        {selectedTab === 'upcoming' && (
          <>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rescheduleButton}>
              <Text style={styles.rescheduleButtonText}>Reschedule</Text>
            </TouchableOpacity>
          </>
        )}
        {selectedTab === 'completed' && (
          <>
            <TouchableOpacity style={styles.rebookButton}>
              <Text style={styles.rebookButtonText}>Re-Book</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reviewButton}>
              <Text style={styles.reviewButtonText}>Add Review</Text>
            </TouchableOpacity>
          </>
        )}
        {selectedTab === 'canceled' && (
          <TouchableOpacity style={styles.rebookButton}>
            <Text style={styles.rebookButtonText}>Book Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'upcoming' && styles.tabActive]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={[styles.tabText, selectedTab === 'upcoming' && styles.tabTextActive]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'completed' && styles.tabActive]}
          onPress={() => setSelectedTab('completed')}
        >
          <Text style={[styles.tabText, selectedTab === 'completed' && styles.tabTextActive]}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'canceled' && styles.tabActive]}
          onPress={() => setSelectedTab('canceled')}
        >
          <Text style={[styles.tabText, selectedTab === 'canceled' && styles.tabTextActive]}>
            Canceled
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.bookingsContainer}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map(renderBookingCard)
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={64} color="#ccc" />
              <Text style={styles.emptyStateText}>No {selectedTab} bookings</Text>
              <Text style={styles.emptyStateSubtext}>
                {selectedTab === 'upcoming' 
                  ? 'You don\'t have any upcoming appointments'
                  : selectedTab === 'completed'
                  ? 'Your completed appointments will appear here'
                  : 'Your canceled appointments will appear here'
                }
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  headerRight: {
    width: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#2A7DE1',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  tabTextActive: {
    color: '#2A7DE1',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  bookingsContainer: {
    padding: 20,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  bookingHeader: {
    marginBottom: 12,
  },
  bookingDateTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  doctorDetails: {
    flex: 1,
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
    marginBottom: 2,
  },
  doctorClinic: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF6B6B',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  rescheduleButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#2A7DE1',
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  rescheduleButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  rebookButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#2A7DE1',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  rebookButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  reviewButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2A7DE1',
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: '#2A7DE1',
    fontWeight: '600',
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

export default MyBookingsScreen;