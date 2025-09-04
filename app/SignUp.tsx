import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateAccountScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    // Handle account creation logic (e.g., API call)
    console.log('Account created with:', { name, email, password });
    navigation.navigate('Home'); // Navigate to Home screen or next step
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
    // Add Google login logic
  };

  const handleFacebookLogin = () => {
    console.log('Login with Facebook');
    // Add Facebook login logic
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Icon name="stethoscope" size={40} color="#0F1C2E" />
        <Text style={styles.appName}>HealthPal</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>We are here to help you!</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Create Account Button */}
      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Or Divider */}
      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.orLine} />
      </View>

      {/* Social Login Buttons */}
      <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
        <Text style={styles.socialButtonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      {/* Sign In Link */}
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Do you have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
  createAccountButton: {
    backgroundColor: '#0F1C2E',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    fontSize: 14,
    color: '#A0A0A0',
    marginHorizontal: 10,
  },
  socialButton: {
    backgroundColor: '#F4F4F4',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#0F1C2E',
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  signInLink: {
    color: '#0F1C2E',
    fontSize: 14,
    fontWeight: '600',
  },
});
