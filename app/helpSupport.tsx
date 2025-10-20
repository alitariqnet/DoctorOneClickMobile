// screens/HelpSupportScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
    Linking,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type RootStackParamList = {
  HelpSupport: undefined;
};

type HelpSupportScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HelpSupport'
>;

interface HelpSupportScreenProps {
  navigation: HelpSupportScreenNavigationProp;
}

interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
}

const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({ navigation }) => {
  const supportOptions: SupportOption[] = [
    {
      id: '1',
      title: 'Contact Support',
      description: 'Get in touch with our support team',
      icon: 'chatbubble-ellipses-outline',
      action: () => Linking.openURL('mailto:support@healthpal.com')
    },
    {
      id: '2',
      title: 'FAQ',
      description: 'Frequently asked questions',
      icon: 'help-circle-outline',
      action: () => console.log('Navigate to FAQ')
    },
    {
      id: '3',
      title: 'Live Chat',
      description: 'Chat with our support agents',
      icon: 'chatbubble-outline',
      action: () => console.log('Open live chat')
    },
    {
      id: '4',
      title: 'Call Us',
      description: '+1-800-HEALTH-PAL',
      icon: 'call-outline',
      action: () => Linking.openURL('tel:+1800432584725')
    },
    {
      id: '5',
      title: 'Send Feedback',
      description: 'Share your experience with us',
      icon: 'megaphone-outline',
      action: () => Linking.openURL('mailto:feedback@healthpal.com')
    },
    {
      id: '6',
      title: 'Report a Problem',
      description: 'Report any issues you encounter',
      icon: 'warning-outline',
      action: () => console.log('Report problem')
    }
  ];

  const renderSupportOption = (option: SupportOption) => (
    <TouchableOpacity
      key={option.id}
      style={styles.optionCard}
      onPress={option.action}
    >
      <View style={styles.optionLeft}>
        <Ionicons name={option.icon as any} size={24} color="#2A7DE1" />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{option.title}</Text>
          <Text style={styles.optionDescription}>{option.description}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Help and Support</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.helpSection}>
          <Text style={styles.sectionTitle}>How can we help you?</Text>
          <Text style={styles.sectionDescription}>
            Get assistance with any issues or questions you might have about HealthPal.
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {supportOptions.map(renderSupportOption)}
        </View>

        {/* Emergency Section */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Emergency Contact</Text>
          <Text style={styles.emergencyDescription}>
            For medical emergencies, please call your local emergency services immediately.
          </Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => Linking.openURL('tel:911')}
          >
            <Ionicons name="alert-circle" size={24} color="#fff" />
            <Text style={styles.emergencyButtonText}>Call Emergency Services</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  helpSection: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  optionsContainer: {
    paddingVertical: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    marginLeft: 16,
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  emergencySection: {
    backgroundColor: '#fff5f5',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#fed7d7',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c53030',
    marginBottom: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#744210',
    lineHeight: 20,
    marginBottom: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e53e3e',
    borderRadius: 8,
    padding: 16,
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default HelpSupportScreen;