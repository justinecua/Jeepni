import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavBar from './BottomNavbar';

const HomePage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>

      <BottomNavBar onNavigate={onNavigate} />
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

export default HomePage;
