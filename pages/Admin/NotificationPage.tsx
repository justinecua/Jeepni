import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminNotificationPage = () => {
  return (
    <View style={styles.container}>
      <Text>Notification Page</Text>
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

export default AdminNotificationPage;
