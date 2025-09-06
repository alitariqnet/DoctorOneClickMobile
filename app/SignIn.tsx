import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = () => {
    console.log('Sign In with:', { email, password });
    // Add sign-in logic here (e.g., API call)
    navigation.navigate('Dashboard'); // Navigate to Home screen or next screen
  };

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
    // Add Google sign-in logic
  };

  const handleFacebookSignIn = () => {
    console.log('Sign in with Facebook');
    // Add Facebook sign-in logic
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Icon name="stethoscope" size={40} color="#0F1C2E" />
        <Text style={styles.appName}>HealthPal</Text>
      </View>

      {/* Welcome Message */}
      <Text style={styles.title}>Hi, Welcome Back!</Text>
      <Text style={styles.subtitle}>Hope you're doing fine.</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
        <Link href='/dashboard'></Link>
      </TouchableOpacity>

      {/* Or Divider */}
      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.orLine} />
      </View>

      {/* Social Login Buttons */}
      <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
        <Text style={styles.socialButtonText}>Sign In with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignIn}>
        <Text style={styles.socialButtonText}>Sign In with Facebook</Text>
      </TouchableOpacity>

      {/* Forgot Password & Sign Up Links */}
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.footerText}>Forgot password?</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}> | </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

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
  signInButton: {
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#0F1C2E',
  },
});
