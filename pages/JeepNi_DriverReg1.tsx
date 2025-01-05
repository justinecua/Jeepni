import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';import RadialGradient from 'react-native-radial-gradient';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import BASE_URL from "../config.js";
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

const DriverReg1 = ({ onDriver, onDriverDocuments }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await fetch('http://34.162.235.125/JeepNi/fetchRoutes.php');
      const data = await response.json();
      if (data.success) setRoutes(data.data);
      else Alert.alert('Error', data.message);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch routes.');
    }
  };

  const handleSubmit = async () => {
    if (!username || !email || !firstname || !lastname || !password || !selectedRoute) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append('username', username);
      formData.append('email', email);
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('password', password);
      formData.append('selectedRoute', selectedRoute);

      const response = await axios.post(`${BASE_URL}/JeepNi/registerDriver2.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Registration successful!');
        onDriverDocuments('DriverMainPage');
      } else {
        alert(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Axios error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      alert('There was an error submitting the form.');
    }
  };

  return (
    <RadialGradient
      style={styles.gradient2}
      colors={["#005F4F", "#053143"]}
      center={[100, 100]}
      radius={600}
    >
      <View style={styles.registerContainer}>
        <View style={styles.RPTop}>
          <TouchableOpacity onPress={onDriver} style={styles.backButton}>
            <Text style={styles.backText}>Go back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.RPTitleDiv}>
          <Text style={styles.RPTitle}>JEEPNI</Text>
          <Text style={styles.RPTitle2}>DRIVER REGISTRATION</Text>
        </View>
      </View>

      <View style={styles.registerContainer2}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.RC2Top}>
            <Text style={styles.RC2Title}>Personal Information</Text>
          </View>
          <View style={styles.RC2Mid}>
            <View style={styles.InputDiv}>
              <Text style={styles.InputDivLabel}>Firstname</Text>
              <TextInput
                style={styles.input}
                placeholder="Input your firstname"
                placeholderTextColor="#888"
                value={firstname}
                onChangeText={(value) => setFirstname(value)}
              />

              <Text style={styles.InputDivLabel}>Lastname</Text>
              <TextInput
                style={styles.input}
                placeholder="Input your lastname"
                placeholderTextColor="#888"
                value={lastname}
                onChangeText={(value) => setLastname(value)}
              />

              <Text style={styles.InputDivLabel}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Input your username"
                placeholderTextColor="#888"
                value={username}
                onChangeText={(value) => setUsername(value)}
              />

              <Text style={styles.InputDivLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Input your email address"
                placeholderTextColor="#888"
                value={email}
                onChangeText={(value) => setEmail(value)}
              />

              <Text style={styles.InputDivLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Input your password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={(value) => setPassword(value)}
              />

              <Text style={styles.InputDivLabel}>Select Route</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedRoute}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedRoute(itemValue)}
                >
                  <Picker.Item label="Select a route" value="" />
                  {routes.map((route) => (
                    <Picker.Item key={route.route_id} label={route.route} value={route.route_id} />
                  ))}
                </Picker>
              </View>
            </View>
            <TouchableOpacity style={styles.RPButton} onPress={handleSubmit}>
              <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
                colors={["#005F4F", "#053143"]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Register</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </RadialGradient>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    marginTop: 10,
    borderColor: '#056756',
    borderRadius: 7,
    borderWidth: 1,
    backgroundColor: 'transparent',
    height: 48,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    fontSize: 15,
    color: '#056756',
  },  cameraIcon: {
    width: 30,
    height: 25,
    alignSelf: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  DriverProfile: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#90C5BC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputDivLabel: {
    color: '#056756',
    fontWeight: '800',
    fontSize: 15,
    fontFamily: 'Geologica-Regular',
    marginBottom: '2%',
    marginTop: '5%',
  },
  input: {
    borderColor: '#BDBDBD',
    borderRadius: 7,
    borderWidth: 1,
    width: '100%',
    height: 48,
    textAlign: 'left',
    padding: 10,
    color: 'black',
  },
  RPButton: {
    width: '85%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: '2%',
  },
  buttonGradient: {
    paddingVertical: 13,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    height: 24,
  },

  InputDiv: {
    padding: 30,
    width: '100%',
    textAlign: 'left',
    justifyContent: 'center',

  },
  RC2Subtitle: {
    fontFamily: 'Geologica-Regular',
    fontSize: 14,
    fontWeight: '600',
    color: '#056756',
  },
  RC2Title: {
    fontFamily: 'Geologica-Regular',
    fontSize: 22,
    fontWeight: '800',
    color: '#056756',
  },
  RC2Top: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
  },
  RC2Mid: {
    marginTop: '-6%',
    width: '100%',
    alignItems: 'center',
  },
  registerContainer:{
    width: '100%',
    height: '100%',
    zIndex: 1,

  },
  registerContainer2: {
    width: '100%',
    height: '79%',
    backgroundColor: 'white',
    zIndex: 3,
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  registerContainer3: {
    width: '100%',
    height: '81.5%',
    backgroundColor: 'white',
    zIndex: 2,
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    opacity: 0.25,
  },
  RPTitleDiv: {
    marginTop: '-4%',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  },
  RPTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Viga-Regular',
  },
  RPTitle2: {
    fontSize: 19,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Viga-Regular',
  },

  gradient2: {
    width: '100%',
    height: '100%',
  },
  RPTop: {
    width: '100%',
    height: '6%',
    textAlign: 'center',
    color: '#FDFDFD',
    marginTop: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FDFDFD',
    marginRight: 5,
    paddingHorizontal: 10,
  },
  gotoLogin: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FDFDFD',
    marginRight: 5,
    paddingHorizontal: 10,
  },
  backButton: {
    marginLeft: 10,
  },
  loginButton: {
    marginRight: 10,
  },
});

export default DriverReg1;
