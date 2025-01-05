import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import { Picker } from '@react-native-picker/picker'; // Updated import

// Replace with your Google API key
const GOOGLE_API_KEY = 'AIzaSyA61RyJVBywmz_PXkMwvUMRXj8pzruMsGc';

export function MapPage() {
  const [userLocation, setUserLocation] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
  });
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [mapType, setMapType] = useState("standard"); // State to handle map style

  useEffect(() => {
    const getLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        (error) => {
          Alert.alert("Error", "Unable to retrieve your location.");
          console.error(error);
        },
      );
    };

    getLocation();
  }, []);

  const fetchSuggestions = async (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const API_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        query
      )}&key=${GOOGLE_API_KEY}&location=${userLocation.latitude},${userLocation.longitude}&radius=50000`;

      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.status === "OK") {
        setSuggestions(data.predictions);
      } else {
        console.error("Autocomplete API Error:", data);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionSelect = async (placeId) => {
    setSuggestions([]);

    try {
      const API_URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.status === "OK") {
        const { lat, lng } = data.result.geometry.location;

        const newRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setRegion(newRegion);
        setUserLocation({ latitude: lat, longitude: lng });
        setSearchQuery(data.result.name); // Update search query with the selected place name
      } else {
        console.error("Place Details API Error:", data);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a location"
	placeholderTextColor="#053143" 
        value={searchQuery}
        onChangeText={fetchSuggestions}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          style={styles.suggestionsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleSuggestionSelect(item.place_id)}
            >
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.mapStylePicker}>
        <Text style={styles.pickerLabel}>Select Map Style:</Text>
        <Picker
          selectedValue={mapType}
          style={styles.picker}
          onValueChange={(itemValue) => setMapType(itemValue)}
        >
          <Picker.Item label="Standard" value="standard" />
          <Picker.Item label="Satellite" value="satellite" />
          <Picker.Item label="Terrain" value="terrain" />
          <Picker.Item label="Hybrid" value="hybrid" />
        </Picker>
      </View>

      <MapView
        style={styles.map}
        region={region}
        mapType={mapType} 
        showsCompass={false}
      >
        <Marker coordinate={userLocation} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    height: 45,
    borderRadius: 30,
    borderColor: '#053143',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 20, 
    width: '90%',
    zIndex: 5,
    backgroundColor: 'white',
    color: '#053143', 
  },
  suggestionsList: {
    position: "absolute",
    top: 60,
    backgroundColor: "#fff",
    width: "90%",
    maxHeight: 200,
    zIndex: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  mapStylePicker: {
    width: '90%',
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
  zIndex: 6,
    height: 50,
    width: '100%',
  },
});

export default MapPage;

