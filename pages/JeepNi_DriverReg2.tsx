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

const DriverReg2 = ({ onDriverReg1, onDriverReg3}) => {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [licensePhoto, setLicensePhoto] = useState(null);
  const [registrationPhoto, setRegistrationPhoto] = useState(null);

  const selectPhoto = (setPhoto) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const source = { uri: response.assets[0].uri };
          setPhoto(source);
        }
      }
    );
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
          <TouchableOpacity onPress={onDriverReg1} style={styles.backButton}>
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
          <View style={styles.RC2Top}>
            <Text style={styles.RC2Title}>Documents</Text>
          </View>
          <View style={styles.RC2Mid}>
            <View style={styles.InputDiv}>
              <Text style={styles.InputDivLabel}>
                Jeepney License Plate Number
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Input Jeepney License Plate Number"
                placeholderTextColor="#888"
                value={text}
                onChangeText={setText}
              />

              <Text style={styles.InputDivLabel}>
                Code No. & Route / Destination
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Format eg: 7A Tambo Gerona - City Proper"
                placeholderTextColor="#888"
                value={text}
                onChangeText={setText}
              />

              <Text style={styles.InputDivLabel}>Driver's License Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Input your License Number"
                placeholderTextColor="#888"
                value={text2}
                onChangeText={setText2}
              />

              <Text style={styles.InputDivLabel}>Driver's License Photo</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectPhoto(setLicensePhoto)}
              >
                <Text style={styles.uploadButtonText}>
                  {licensePhoto ? 'Change Photo' : 'Upload Photo'}
                </Text>
              </TouchableOpacity>
              {licensePhoto && <Image source={licensePhoto} style={styles.image} />}

              <Text style={styles.InputDivLabel}>
                Jeepney Registration Photo (CR / OR)
              </Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => selectPhoto(setRegistrationPhoto)}
              >
                <Text style={styles.uploadButtonText}>
                  {registrationPhoto ? 'Change Photo' : 'Upload Photo'}
                </Text>
              </TouchableOpacity>
              {registrationPhoto && <Image source={registrationPhoto} style={styles.image} />}
            </View>

            <TouchableOpacity style={styles.RPButton} onPress={onDriverReg3}>
              <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
                colors={['#005F4F', '#053143']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Proceed to Account Info</Text>
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
    marginTop: '6%',
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

export default DriverReg2;
