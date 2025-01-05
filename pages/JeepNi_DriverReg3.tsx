import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import BASE_URL from "../config.js";

const DriverReg3 = ({onDriverReg2, driverData}) => {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState(null);
  const [confirmPass, setConfirmPass] = useState(null);
  const [photo, setPhoto] = useState(null);
  
  const selectPhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.5},
      (response) => {
        if (response.assets && response.assets.length > 0) {
          setPhoto(response.assets[0].uri); 
        }
      }
    );
  };

  const handleSubmit = async () => {
    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append('first_name', driverData.firstname);
    formData.append('last_name', driverData.lastname);
    formData.append('mobile_number', driverData.mobileNumber);
    formData.append('home_address', driverData.homeAddress);
    formData.append('email_address', driverData.emailAddress);
    formData.append('license_plate_no', driverData.licensePlateNo);
    formData.append('code_no_route', driverData.codeNo);
    formData.append('driver_license_no', driverData.licenseNo);
    formData.append('driver_license_photo', driverData.licensePhoto);
    formData.append('jeepney_registration_photo', driverData.registrationPhoto);

    if (photo) {
      formData.append('account_photo', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'account_photo.jpg',
      });
    }

    formData.append('gender', gender);
    formData.append('account_username', username);
    formData.append('account_password', password);
    console.log(formData);
    try {
      const response = await axios.post(`${BASE_URL}/JeepNi/insertDriver.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.status === 'success') {
        console.log('Driver Registered:', response.data.message);
      } else {
        console.log('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error registering driver:', error);
    }
  };

  return (
    <RadialGradient
      colors={['#005F4F', '#053143']}
      center={[100, 100]}
      radius={600}
      style={styles.gradient2}
    >
      <View style={styles.registerContainer}>
        <View style={styles.RPTop}>
          <TouchableOpacity onPress={onDriverReg2} style={styles.backButton}>
            <Text style={styles.backText}>Go back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.RPTitleDiv}>
          <Text style={styles.RPTitle}>JEEPNI</Text>
          <Text style={styles.RPTitle2}>DRIVER REGISTRATION</Text>
        </View>
      </View>

      <View style={styles.registerContainer2}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={styles.DriverProfile}>
            {photo ? (
              <Image source={{uri: photo}} style={styles.profileImage} />
            ) : (
              <TouchableOpacity onPress={selectPhoto} style={styles.cameraIcon}>
                <Image source={require('../src/img/camera.png')} style={styles.cameraIcon} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.RC2Top}>
            <Text style={styles.RC2Title}>Account Information</Text>
          </View>
          <View style={styles.RC2Mid}>
            <View style={styles.InputDiv}>
              <Text style={styles.InputDivLabel}>
                Username
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Input your username"
                placeholderTextColor="#888"
                value={username}
                onChangeText={setUsername}
              />
              <Text style={styles.InputDivLabel}>Gender</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={gender}
                      onValueChange={(itemValue) => setGender(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Select Gender" value="" />
                      <Picker.Item label="Male" value="male" />
                      <Picker.Item label="Female" value="female" />
                      <Picker.Item label="Other" value="other" />
                    </Picker>
                </View>

              <Text style={styles.InputDivLabel}>
                Password
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Input your password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
              />

              <Text style={styles.InputDivLabel}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Input your password"
                placeholderTextColor="#888"
                value={confirmPass}
                onChangeText={setConfirmPass}
              />

            </View>

            <TouchableOpacity style={styles.RPButton} onPress={handleSubmit}>
              <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
                colors={['#005F4F', '#053143']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Submit Application</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View style={styles.registerContainer3}></View>
    </RadialGradient>
  );
};

const styles = StyleSheet.create({
  cameraIcon:{
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
    marginTop: '5%',
    margin: 'auto',
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#90C5BC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  FPDivText:{
    marginTop: '4%',
    color: '#056756',
    fontWeight: 800,
    fontSize: 15,
    fontFamily: 'Geologica-Regular',
    marginBottom: '3%',
  },
  SignInWith: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  horizontalLine: {
    height: 1,
    backgroundColor: '#BDBDBD',
    width: '28%',
  },

  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#92A59E',
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
  InputDivLabel:{
    color: '#056756',
    fontWeight: 800,
    fontSize: 15,
    fontFamily: 'Geologica-Regular',
    marginBottom: '2%',
    marginTop: '5%',
  },
  pickerContainer:{
    borderColor: '#888',
    borderRadius: 7,
    borderWidth: 1,
    color: '#888',
  },
  picker:{
    borderColor: '#BDBDBD',
    borderRadius: 7,
    borderWidth: 1,
    width: '100%',
    height:48,
    textAlign: 'left',
    padding: 10,
    color: '#888',
  },
  input:{
    borderColor: '#BDBDBD',
    borderRadius: 7,
    borderWidth: 1,
    width: '100%',
    height:48,
    textAlign: 'left',
    padding: 10,
    color: 'black',
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
    marginTop: '3%',
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
  uploadButton: {
    borderColor: '#BDBDBD',
    borderRadius: 7,
    borderWidth: 1,
    width: '100%',
    height: 48,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    color: 'black',
  },
  uploadButtonText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 100,
    marginTop: 10,
  },
});

export default DriverReg3;
