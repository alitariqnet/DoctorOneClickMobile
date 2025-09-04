import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ResetPasswordScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = () => {
    if (password === confirmPassword) {
      console.log('Password reset successfully with:', { password });
      navigation.navigate('SignIn'); // Navigate to the home screen or next step
    } else {
      setError('Passwords do not match');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Icon name="stethoscope" size={40} color="#0F1C2E" />
        <Text style={styles.appName}>HealthPal</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Create new password</Text>
      <Text style={styles.subtitle}>Your new password must be different from previously used password</Text>

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Confirm Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Reset Password Button */}
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0F1C2E',
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0F1C2E',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  resetButton: {
    backgroundColor: '#0F1C2E',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
});
