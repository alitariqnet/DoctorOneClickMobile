// navigation/AppNavigator.tsx
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EditProfileScreen from './editProfile';
import HelpSupportScreen from './helpSupport';
import FavoriteScreen from './myFavorites';
import NotificationsScreen from './notifications';
import ProfileScreen from './profile';
import SettingsScreen from './settings';
import TermsConditionsScreen from './termsConditions';
// navigation/AppNavigator.tsx (Add these to your existing navigator)

// Add to your Stack Navigator

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Favorite: undefined;
  Notifications: undefined;
  Settings: undefined;
  HelpSupport: undefined;
  TermsConditions: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' }
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="TermsConditions" component={TermsConditionsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;