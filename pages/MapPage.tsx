import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity, Alert, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import { Picker } from '@react-native-picker/picker';

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
  const [mapType, setMapType] = useState("standard");
  const [selectedPlaceName, setSelectedPlaceName] = useState('');
  const [route, setroute] = useState('');
  
  const mapTypes = ["standard", "satellite", "terrain", "hybrid"]; 
  const [currentMapTypeIndex, setCurrentMapTypeIndex] = useState(0); 
useEffect(() => {
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        try {
          const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
          const response = await fetch(API_URL);
          const data = await response.json();

          if (data.status === "OK" && data.results.length > 0) {
            setSelectedPlaceName(data.results[0].formatted_address);
          } else {
            console.error("Geocoding API Error:", data);
          }
        } catch (error) {
          console.error("Error fetching geocoding data:", error);
        }
      },
      (error) => {
        Alert.alert("Error", "Unable to retrieve your location.");

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
      Alert.alert("Location not found", "No results found for the entered location.");
    }
  } catch (error) {
    Alert.alert("Error", "There was an issue fetching suggestions.");
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
        setSearchQuery(data.result.name);
      } else {
        console.error("Place Details API Error:", data);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  const handleMapTypeChange = () => {
    const nextIndex = (currentMapTypeIndex + 1) % mapTypes.length; // Cycle through map types
    setCurrentMapTypeIndex(nextIndex);
    setMapType(mapTypes[nextIndex]);
  };

  const userLocationText = `Latitude: ${userLocation.latitude.toFixed(5)}, Longitude: ${userLocation.longitude.toFixed(5)}`;
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.elevation]}
          placeholder="Search for a specific location ..."
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
        <TouchableOpacity 
          style={[styles.imageButton, styles.elevation]} 
          onPress={handleMapTypeChange}
        >
          <Image 
            source={require('../src/img/Map-Grid--Streamline-Flex.png')} // Adjust the path as necessary
            style={styles.imageIcon} 
          />
	</TouchableOpacity>
	<TouchableOpacity 
          style={styles.ProfButton} 
        >
          <Image 
            source={require('../src/img/prof.jpg')} // Adjust the path as necessary
            style={styles.profIcon} 
          />
	</TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        region={region}
        mapType={mapType} 
        showsCompass={false}
      >
        <Marker coordinate={userLocation} />
      </MapView>

      <View style={styles.MapInfo}>
	<Text style={styles.LocationInfo}>Your Location</Text>	
	<Text style={styles.UserLocation}>{selectedPlaceName} </Text>	
	<View style={styles.pickerContainer}>
	    <Picker
	      selectedValue={route}
	      onValueChange={(itemValue) => setroute(itemValue)}
	      style={styles.picker}
	        mode="dropdown"
	    >
	      <Picker.Item label="Choose Destination" value="" />
	      <Picker.Item label="Male" value="male" />
	      <Picker.Item label="Female" value="female" />
	      <Picker.Item label="Other" value="other" />
	    </Picker>
	</View>

      	<TouchableOpacity style={styles.JeepneyBtn} >
            <Text style={styles.buttonText}> Find Nearby Jeepneys</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 17,
  },
  JeepneyBtn:{
    width: '100%',
    marginTop: '3%',
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#056756',

  },
  pickerContainer: {
   marginTop: 10,
   borderColor: '#056756',
   borderRadius: 7,
   borderWidth: 1,
   backgroundColor: 'transparent',
   height: 45,
   display: 'flex',
   justifyContent: 'center',
   overflow: 'hidden',
   textAlign: 'center',
},
  picker: {
   width: '100%',
   color: '#333',
   fontSize: 15,
  },
  UserLocation:{
   color: '#056756',
   fontSize: 17,
   paddingVertical: 5,
  },
  LocationInfo:{
   fontWeight: 600,
   color: '#056756',
   fontSize: 15,
  },
  MapInfo:{
   width: '100%',
   height: '33%',
   backgroundColor: '#f1f3fb',
   bottom: 0,
   position: 'absolute',
   borderTopRightRadius: 30,
   borderTopLeftRadius: 30,
   paddingHorizontal: 30,
   paddingVertical: 19,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '98%',
    marginTop: 10,
  },
  input: {
    height: 45,
    borderRadius: 30,
    borderWidth: 0,
    margin: 10,
    paddingHorizontal: 20, 
    width: '69%',
    zIndex: 5,
    backgroundColor: 'white',
    color: '#053143', 
  },
  suggestionsList: {
    position: "absolute",
    top: 60,
    left: "2.5%", // Center the list by offsetting the left edge
    width: "95%", // Matches the parent width minus padding
    backgroundColor: "#f1f3fb",
    maxHeight: 200,
    zIndex: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  suggestionItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  elevation: {
    elevation: 20,
    shadowColor: '#053143',
  },
  imageButton: {
    marginTop: 11,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 7,
    width: 40,
    height: 40,
    backgroundColor: '#056756',
    borderRadius: '50%',
    marginRight: 6,
  },
  ProfButton: {
    marginTop: 11,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 7,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profIcon: {
   width: 40,
   height: 40,
   resizeMode: 'cover',
  },
  imageIcon: {
    width: 20,
    height: 20,
  },
  mapTypeText: {
    marginTop: 5,
    color: '#053143',
  },
});

export default MapPage;
