import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

import homeIcon from '../src/img/Home-3--Streamline-Solar.png';
import homeIconActive from '../src/img/Vector.png';
import mapIcon from '../src/img/map.png';
import mapIconActive from '../src/img/Location-Pin-3--Streamline-Core.png';
import notificationsIcon from '../src/img/Bell-Notification--Streamline-Flex-Remix.png';
import notificationsIconActive from '../src/img/Bell-Notification--Streamline-Flex-Gradient.png';
import profileIcon from '../src/img/User--Streamline-Solar-Ar.png';
import profileIconActive from '../src/img/User-2-Fill--Streamline-Mingcute-Fill.png';

const BottomNavBar = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [activeTab, setActiveTab] = useState<string>('HomePage');

  const handlePress = (page: string) => {
    setActiveTab(page);
    onNavigate(page);
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handlePress('HomePage')}>
        <Image
          source={activeTab === 'HomePage' ? homeIconActive : homeIcon}
          style={styles.navItem}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handlePress('MapPage')}>
        <Image
          source={activeTab === 'MapPage' ? mapIconActive : mapIcon}
          style={styles.navItem}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handlePress('NotificationsPage')}>
        <Image
          source={activeTab === 'NotificationsPage' ? notificationsIconActive : notificationsIcon}
          style={styles.navItem}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => handlePress('ProfilePage')}>
        <Image
          source={activeTab === 'ProfilePage' ? profileIconActive : profileIcon}
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
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 0,
  },
  iconContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  navItem: {
    width: 22,
    height: 19,
    resizeMode: 'contain',
    borderRadius: 15,
  },
});

export default BottomNavBar;
