// screens/TermsConditionsScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type RootStackParamList = {
  TermsConditions: undefined;
};

type TermsConditionsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TermsConditions'
>;

interface TermsConditionsScreenProps {
  navigation: TermsConditionsScreenNavigationProp;
}

interface TermSection {
  id: string;
  title: string;
  content: string;
}

const TermsConditionsScreen: React.FC<TermsConditionsScreenProps> = ({ navigation }) => {
  const [accepted, setAccepted] = useState<boolean>(false);

  const termsSections: TermSection[] = [
    {
      id: '1',
      title: 'Acceptance of Terms',
      content: 'By accessing and using HealthPal, you accept and agree to be bound by the terms and provision of this agreement.'
    },
    {
      id: '2',
      title: 'Use License',
      content: 'Permission is granted to temporarily use HealthPal for personal, non-commercial transitory viewing only.'
    },
    {
      id: '3',
      title: 'Medical Disclaimer',
      content: 'HealthPal provides health information for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.'
    },
    {
      id: '4',
      title: 'Privacy Policy',
      content: 'Your privacy is important to us. We collect and use your personal information in accordance with our Privacy Policy.'
    },
    {
      id: '5',
      title: 'User Account',
      content: 'You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device.'
    },
    {
      id: '6',
      title: 'Prohibited Uses',
      content: 'You may not use HealthPal in any way that causes, or may cause, damage to the app or impairment of the availability or accessibility of the service.'
    },
    {
      id: '7',
      title: 'Termination',
      content: 'We may terminate or suspend access to our service immediately, without prior notice, for any reason whatsoever.'
    },
    {
      id: '8',
      title: 'Changes to Terms',
      content: 'HealthPal reserves the right to modify these terms at any time. We will provide notice of significant changes.'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms and Conditions</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.lastUpdated}>Last updated: December 1, 2024</Text>
          
          <Text style={styles.introText}>
            Please read these terms and conditions carefully before using HealthPal.
          </Text>

          {termsSections.map((section) => (
            <View key={section.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}

          {/* Acceptance Section */}
          <View style={styles.acceptanceSection}>
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setAccepted(!accepted)}
            >
              <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
                {accepted && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>
              <Text style={styles.checkboxText}>
                I have read and agree to the Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  introText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2A7DE1',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  acceptanceSection: {
    marginTop: 32,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2A7DE1',
    borderColor: '#2A7DE1',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default TermsConditionsScreen;