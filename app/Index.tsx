import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: 'Meet Doctors Online',
      description: 'Connect with Specialized Doctors Online for Convenient and Comprehensive Medical Consultations.',
      image: require('../assets/images/doctor1.jpg'),
    },
    {
      title: 'Connect with Specialists',
      description: 'Connect with Specialized Doctors Online for Convenient and Comprehensive Medical Consultations.',
      image: require('../assets/images/doctor2.jpg'),
    },
    {
      title: 'Thousands of Online Specialists',
      description: 'Explore a Vast Array of Online Medical Specialists, Offering an Extensive Range of Expertise Tailored to Your Healthcare Needs.',
      image: require('../assets/images/doctor3.jpg'),
    },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Navigate to the next screen, for example, HomeScreen
      navigation.replace('SignIn'); // Assuming you have a Home screen to navigate to
    }
  };

  const handleSkip = () => {
    navigation.replace('SignIn'); // Skip the onboarding and navigate directly to the Home screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Onboarding Slide Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer} horizontal pagingEnabled>
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
            <TouchableOpacity onPress={handleNext} style={styles.button}>
              <Text style={styles.buttonText}>{index === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Skip Button */}
      <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  slide: {
    width: 350,
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0F1C2E',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#A0A0A0',
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#0F1C2E',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  skipText: {
    fontSize: 16,
    color: '#0F1C2E',
    fontWeight: '600',
  },
});
