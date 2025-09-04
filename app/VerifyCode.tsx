import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    TextInput as RNTextInput,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
  VerifyCode: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerifyCode'>;

const CODE_LENGTH = 6;

const VerifyCodeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const inputs = useRef<Array<RNTextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (index < CODE_LENGTH - 1 && inputs.current[index + 1]) {
        inputs.current[index + 1]?.focus();
      }
    } else if (text === '') {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join('');
    console.log('Entered code:', enteredCode);

    // Add verification logic here
    navigation.navigate('ResetPassword'); // Uncomment when implemented
  };

  const handleResend = () => {
    console.log('Resending code...');
    // Trigger resend logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Icon name="medical-bag" size={50} color="#0F1C2E" />
          <Text style={styles.logoText}>
            <Text style={{ color: '#A0A0A0' }}>Doctor</Text>
            <Text style={{ color: '#0F1C2E' }}>OneClick</Text>
          </Text>
        </View>

        {/* Text */}
        <Text style={styles.title}>Verify Code</Text>
        <Text style={styles.description}>
          Enter the code we just sent you on your registered Email
        </Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              returnKeyType="done"
              autoFocus={index === 0}
              placeholder=""
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

        {/* Resend */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't get the Code? </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyCodeScreen;

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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    backgroundColor: '#F4F4F4',
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
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  resendText: {
    color: '#808080',
    fontSize: 14,
  },
  resendLink: {
    color: '#3366FF',
    fontSize: 14,
    fontWeight: '600',
  },
});
