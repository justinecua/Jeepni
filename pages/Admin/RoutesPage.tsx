import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const RoutePage = ({ onBack }) => {
  const [code, setCode] = useState('');
  const [route, setRoute] = useState('');
  const [boundId, setBoundId] = useState('');

  const handleSave = () => {
    if (code && route && boundId) {
      // Example save logic; replace this with actual logic for saving to the database
      Alert.alert('Data Saved', `Code: ${code}, Route: ${route}, Bound ID: ${boundId}`);
    } else {
      Alert.alert('Validation Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Page Title */}
      <Text style={styles.title}>Route Page</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Code</Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder="Enter code"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Route</Text>
        <TextInput
          style={styles.input}
          value={route}
          onChangeText={setRoute}
          placeholder="Enter route"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Bound ID</Text>
        <TextInput
          style={styles.input}
          value={boundId}
          onChangeText={setBoundId}
          placeholder="Enter bound ID"
          keyboardType="numeric"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#1A73E8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#1A9B88',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RoutePage;
