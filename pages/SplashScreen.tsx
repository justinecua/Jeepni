// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (

      <View style={styles.container}>
        <Image
          source={require('../src/img/JeepNiLogo.png')}
          style={styles.image}
          resizeMode='cover'
        />
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
  image: {
    width: '32%',
    height: '22%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
  },

});

export default SplashScreen;