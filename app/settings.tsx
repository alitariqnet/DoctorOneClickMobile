// screens/SettingsScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type RootStackParamList = {
  Settings: undefined;
};

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;

interface SettingsScreenProps {
  navigation: SettingsScreenNavigationProp;
}

interface SettingItem {
  id: string;
  title: string;
  type: 'toggle' | 'navigation' | 'button';
  value?: boolean;
  description?: string;
  icon: string;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: '1',
      title: 'Dark Mode',
      type: 'toggle',
      value: false,
      description: 'Switch between light and dark theme',
      icon: 'moon-outline'
    },
    {
      id: '2',
      title: 'Biometric Login',
      type: 'toggle',
      value: true,
      description: 'Use fingerprint or face ID to login',
      icon: 'finger-print-outline'
    },
    {
      id: '3',
      title: 'Language',
      type: 'navigation',
      description: 'English',
      icon: 'language-outline'
    },
    {
      id: '4',
      title: 'Currency',
      type: 'navigation',
      description: 'USD - US Dollar',
      icon: 'cash-outline'
    },
    {
      id: '5',
      title: 'Privacy & Security',
      type: 'navigation',
      icon: 'shield-checkmark-outline'
    },
    {
      id: '6',
      title: 'Clear Cache',
      type: 'button',
      description: 'Clear all cached data',
      icon: 'trash-outline'
    },
    {
      id: '7',
      title: 'App Version',
      type: 'button',
      description: 'Version 1.0.0',
      icon: 'information-circle-outline'
    }
  ]);

  const handleSettingPress = (item: SettingItem): void => {
    if (item.type === 'toggle') {
      setSettings(settings.map(setting =>
        setting.id === item.id
          ? { ...setting, value: !setting.value }
          : setting
      ));
    } else if (item.type === 'button' && item.title === 'Clear Cache') {
      Alert.alert(
        'Clear Cache',
        'Are you sure you want to clear all cached data?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Clear', 
            style: 'destructive',
            onPress: () => {
              Alert.alert('Success', 'Cache cleared successfully');
            }
          }
        ]
      );
    }
  };

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={() => handleSettingPress(item)}
      disabled={item.type === 'button' && item.title === 'App Version'}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={item.icon as any} size={24} color="#666" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          {item.description && (
            <Text style={styles.settingDescription}>{item.description}</Text>
          )}
        </View>
      </View>
      
      {item.type === 'toggle' && (
        <Switch
          value={item.value}
          onValueChange={() => handleSettingPress(item)}
          trackColor={{ false: '#f0f0f0', true: '#2A7DE1' }}
          thumbColor={item.value ? '#fff' : '#f4f3f4'}
        />
      )}
      {(item.type === 'navigation' || item.type === 'button') && (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      )}
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
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.settingsContainer}>
          {settings.map(renderSettingItem)}
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
  settingsContainer: {
    paddingVertical: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default SettingsScreen;