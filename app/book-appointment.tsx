import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type RootStackParamList = {
  DoctorDetails: undefined;
  BookAppointment: undefined;
  Home: undefined;
};

type BookAppointmentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BookAppointment'
>;

interface BookAppointmentScreenProps {
  navigation: BookAppointmentScreenNavigationProp;
}

interface CalendarData {
  month: string;
  days: string[];
  dates: number[][];
}

const BookAppointmentScreen: React.FC<BookAppointmentScreenProps> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const doctor = {
    name: "Dr. David Patel",
    specialty: "Cardiologist",
    clinic: "Golden Cardiology Center"
  };

  const calendarData: CalendarData = {
    month: "June 2023",
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dates: [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 30, 26, 27, 28],
      [29, 30, 1, 2, 3, 4, 5]
    ]
  };

  const timeSlots: string[][] = [
    ['09.00 AM', '09.30 AM', '10.00 AM'],
    ['10.30 AM', '11.00 AM', '11.30 AM'],
    ['03.00 PM', '03.30 PM', '04.00 PM'],
    ['04.30 PM', '05.00 PM', '05.30 PM']
  ];

  const handleDateSelect = (date: number): void => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string): void => {
    setSelectedTime(time);
  };

  const handleConfirm = (): void => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Missing Information', 'Please select both date and time');
      return;
    }

    Alert.alert(
      'Appointment Confirmed',
      `Your appointment with ${doctor.name} is confirmed for ${selectedDate} June at ${selectedTime}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home')
        }
      ]
    );
  };

  const isCurrentMonth = (date: number): boolean => {
    return date >= 1 && date <= 30;
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
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={styles.headerIcon} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Doctor Info */}
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
          <Text style={styles.doctorClinic}>{doctor.clinic}</Text>
        </View>

        {/* Select Date Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          
          <View style={styles.calendarContainer}>
            <Text style={styles.monthTitle}>{calendarData.month}</Text>
            
            {/* Day headers */}
            <View style={styles.daysHeader}>
              {calendarData.days.map((day) => (
                <Text key={day} style={styles.dayHeader}>{day}</Text>
              ))}
            </View>

            {/* Calendar grid */}
            {calendarData.dates.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.weekRow}>
                {week.map((date, dayIndex) => (
                  <TouchableOpacity
                    key={`${weekIndex}-${dayIndex}`}
                    style={[
                      styles.dateCell,
                      selectedDate === date && styles.selectedDateCell,
                      !isCurrentMonth(date) && styles.otherMonthDate
                    ]}
                    onPress={() => isCurrentMonth(date) && handleDateSelect(date)}
                    disabled={!isCurrentMonth(date)}
                  >
                    <Text style={[
                      styles.dateText,
                      selectedDate === date && styles.selectedDateText,
                      !isCurrentMonth(date) && styles.otherMonthDateText
                    ]}>
                      {date}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Select Hour Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Hour</Text>
          
          <View style={styles.timeSlotsContainer}>
            {timeSlots.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.timeRow}>
                {row.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeSlot,
                      selectedTime === time && styles.selectedTimeSlot
                    ]}
                    onPress={() => handleTimeSelect(time)}
                  >
                    <Text style={[
                      styles.timeText,
                      selectedTime === time && styles.selectedTimeText
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Spacer for confirm button */}
        <View style={styles.spacer} />
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.confirmContainer}>
        <TouchableOpacity 
          style={[
            styles.confirmButton,
            (!selectedDate || !selectedTime) && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirm}
          disabled={!selectedDate || !selectedTime}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
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
  doctorInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 16,
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
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  calendarContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  dayHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 40,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dateCell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  selectedDateCell: {
    backgroundColor: '#2A7DE1',
  },
  otherMonthDate: {
    opacity: 0.3,
  },
  dateText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  selectedDateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  otherMonthDateText: {
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  timeSlotsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeSlot: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#2A7DE1',
    borderColor: '#2A7DE1',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  spacer: {
    height: 100,
  },
  confirmContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#2A7DE1',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookAppointmentScreen;