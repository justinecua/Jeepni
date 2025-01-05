import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import homeIcon from '../../src/img/Home-3--Streamline-Solar.png';
import homeIconActive from '../../src/img/Vector.png';
import mapIcon from '../../src/img/map.png';
import mapIconActive from '../../src/img/Location-Pin-3--Streamline-Core.png';
import notificationsIcon from '../../src/img/Bell-Notification--Streamline-Flex-Remix.png';
import notificationsIconActive from '../../src/img/Bell-Notification--Streamline-Flex-Gradient.png';
import profileIcon from '../../src/img/User--Streamline-Solar-Ar.png';
import profileIconActive from '../../src/img/User-2-Fill--Streamline-Mingcute-Fill.png';

const AdminBottomNavBar = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [activeTab, setActiveTab] = useState<string>('AdminHomePage');

  const handlePress = (page: string) => {
    setActiveTab(page);
    onNavigate(page);
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handlePress('AdminHomePage')}>
        <Image
          source={activeTab === 'AdminHomePage' ? homeIconActive : homeIcon}
          style={styles.navItem}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handlePress('AdminMapPage')}>
        <Image
          source={activeTab === 'AdminMapPage' ? mapIconActive : mapIcon}
          style={styles.navItem}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handlePress('AdminNotificationPage')}>
        <Image
          source={activeTab === 'AdminNotificationPage' ? notificationsIconActive : notificationsIcon}
          style={styles.navItem}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handlePress('AdminProfilePage')}>
        <Image
          source={activeTab === 'AdminProfilePage' ? profileIconActive : profileIcon}
          style={styles.navItem}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1A202C', 
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 0,
  },
  iconContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },
  navItem: {
    width: 22,
    height: 25,
    resizeMode: 'contain',
    borderRadius: 15,
  },
});

export default AdminBottomNavBar;
