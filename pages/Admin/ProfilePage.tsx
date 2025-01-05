import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AdminProfilePage = ({onBack}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.ProfileTitle}>Profile Page</Text>
      <TouchableOpacity style={styles.RPButton}>
          <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.RPButton}>
            <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.RPButton} onPress={onBack}>
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ProfileTitle:{
    marginBottom: '3%',
    fontSize: 15,
    fontWeight: 600,
  },
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#1A202C', 
  },
  RPButton: {
    width: '100%',
    marginTop: '3%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#E0E9E9',
    padding: 16,
  },
  buttonText: {
    color: 'black',
  },
});

export default AdminProfilePage;
