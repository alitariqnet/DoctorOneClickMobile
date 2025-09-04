import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
  ForgotPassword: undefined;
  VerifyCode: undefined;
  ResetPassword: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const navigation = useNavigation<NavigationProp>();

  const handleSendCode = () => {
    console.log('Send code to:', email);
    // Add logic to send verification code, navigate to the VerifyCode screen
    navigation.navigate('VerifyCode');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Icon name="medical-bag" size={50} color="#0F1C2E" />
        <Text style={styles.logoText}>
          <Text style={{ color: '#A0A0A0' }}>Health</Text>
          <Text style={{ color: '#0F1C2E' }}>Pal</Text>
        </Text>
      </View>

      {/* Title & Description */}
      <Text style={styles.title}>Forget Password?</Text>
      <Text style={styles.description}>
        Enter your Email, we will send you a verification code.
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Send Code Button */}
      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 10,
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0F1C2E',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  button: {
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
});
