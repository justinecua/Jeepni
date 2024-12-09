import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminBottomNavBar from './AdminBottomNavbar';

const AdminHomePage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <View style={styles.container}>
      <Text>Admin Page</Text>

      <AdminBottomNavBar onNavigate={onNavigate} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default AdminHomePage;
