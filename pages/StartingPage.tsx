import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const StartingPage = () => {

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#005F4F", "#053143"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image
          source={require('../src/img/35lm.png')}
          style={styles.image}
          resizeMode='cover'
        />
        <Text style={styles.SPtitle}>Sakay Ka, Larga Ta</Text>
        <Text style={styles.SPsubtitle}>
          Ready to ride? Make your jeepney rides easy and fast! With just a tap, you can find nearby jeepneys and enjoy safe travels around Iligan City
        </Text>

        <TouchableOpacity style={styles.RPButton}>
          <LinearGradient
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            colors={["#005F4F", "#053143"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Register</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.DriverText}>Are you a driver? Click here</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '85%',
    height: 410,
    borderRadius: 30,
    marginBottom: '7%',
    elevation: 30,
    shadowColor: '#52006A',
  },
  SPtitle: {
    fontFamily: 'Acme-Regular',
    fontSize: 35,
    fontWeight: '600',
    color: 'white',
    marginBottom: '2%',
  },
  SPsubtitle: {
    fontFamily: 'ADLaMDisplay-Regular',
    width: '80%',
    textAlign: 'center',
    color: '#FDFDFD',
    fontSize: 15,
    lineHeight: 28,
    marginBottom: '8%',
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  RPButton: {
    width: '85%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: '5%',
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'ADLaMDisplay-Regular',

  },
  DriverText:{
    color: '#FDFDFD',
    fontFamily: 'ADLaMDisplay-Regular',
  }
});

export default StartingPage;