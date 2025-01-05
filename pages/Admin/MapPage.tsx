import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminMapPage = () => {
  return (
    <View style={styles.container}>
      <Text>Map Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A202C', 
  },
});

export default AdminMapPage;
