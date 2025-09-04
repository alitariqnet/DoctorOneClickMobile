import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, Picker, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileUpdateScreen: React.FC = () => {
  const [name, setName] = useState('Michael Jordan');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('name@example.com');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [isGenderModalVisible, setGenderModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleSave = () => {
    console.log('Profile saved with:', { name, nickname, email, dob, gender });
    // You can add actual saving logic here (e.g., API call)
  };

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
    setGenderModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Icon name="account-circle" size={100} color="#A0A0A0" />
        <TouchableOpacity style={styles.editProfileIcon}>
          <Icon name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <Text style={styles.title}>Fill Your Profile</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      {/* Nickname Input */}
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Date of Birth Input */}
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dob}
        onChangeText={setDob}
      />

      {/* Gender Picker */}
      <TouchableOpacity style={styles.genderPicker} onPress={() => setGenderModalVisible(true)}>
        <Text style={styles.genderText}>{gender ? gender : 'Gender'}</Text>
        <Icon name="chevron-down" size={20} color="#A0A0A0" />
      </TouchableOpacity>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* Gender Modal */}
      <Modal
        transparent={true}
        visible={isGenderModalVisible}
        animationType="slide"
        onRequestClose={() => setGenderModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            <Picker
              selectedValue={gender}
              onValueChange={handleGenderSelect}
              style={styles.picker}>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setGenderModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileUpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 10,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  editProfileIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0F1C2E',
    borderRadius: 50,
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0F1C2E',
    textAlign: 'center',
    marginBottom: 20,
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
  genderPicker: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  genderText: {
    fontSize: 16,
    color: '#A0A0A0',
    flex: 1,
  },
  saveButton: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F1C2E',
    marginBottom: 20,
  },
  picker: {
    height: 50,
  },
  modalCloseButton: {
    backgroundColor: '#0F1C2E',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
});

