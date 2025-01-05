import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DriverMainPage = () => {
  const [driverLocations, setDriverLocations] = useState([]);

  useEffect(() => {
    const fetchDriverLocations = async () => {

      const locations = [
        { id: 1, latitude: 37.78825, longitude: -122.4324 },
        { id: 2, latitude: 37.78925, longitude: -122.4224 },
      ];
      setDriverLocations(locations);
    };

    fetchDriverLocations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Driver Main Page!</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {driverLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={`Driver ${location.id}`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  map: {
    flex: 1,
  },
});

export default DriverMainPage;

