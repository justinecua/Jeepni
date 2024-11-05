import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import LinearGradient from 'react-native-linear-gradient';

const DriverReg1 = () => {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');

  return (
    <RadialGradient
    style={{ width: 300, height: 200, borderRadius: 100 }}
    colors={["#005F4F", "#053143"]}
    center={[100, 100]}
    radius={600}
    style={styles.gradient2}
  >
    <View style={styles.registerContainer}>
      <View style={styles.RPTitleDiv}>
        <Text style={styles.RPTitle}>JEEPNI</Text>
        <Text style={styles.RPTitle2}>DRIVER REGISTRATION</Text>
      </View>
    </View>

      <View style={styles.registerContainer2}>
        <View style={styles.RC2Top}>
          <Text style={styles.RC2Title}>Personal Information</Text>
        </View>
        <View style={styles.RC2Mid}>
          <View style={styles.InputDiv}>
              <Text style={styles.InputDivLabel}>First Name</Text>
              <TextInput
              style={styles.input}
              placeholder="Input your first name"
              value={text}
              onChangeText={setText}
              />

              <Text style={styles.InputDivLabel}>Last Name</Text>
              <TextInput
              style={styles.input}
              placeholder="Input your last name"
              value={text}
              onChangeText={setText}
              />

              <Text style={styles.InputDivLabel}>Mobile Number</Text>
              <TextInput
              style={styles.input}
              placeholder="Input your Mobile Number"
              value={text2}
              onChangeText={setText2}
              />

              <Text style={styles.InputDivLabel}>Home Address</Text>
              <TextInput
              style={styles.input}
              placeholder="Input your Home Address"
              value={text2}
              onChangeText={setText2}
              />

              <Text style={styles.InputDivLabel}>Email Address</Text>
              <TextInput
              style={styles.input}
              placeholder="Input your email address"
              value={text}
              onChangeText={setText}
              />


          </View>
          <TouchableOpacity style={styles.RPButton}>
          <LinearGradient
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            colors={["#005F4F", "#053143"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Proceed to Documents</Text>
          </LinearGradient>
        </TouchableOpacity>

        </View>

      </View>
      <View style={styles.registerContainer3}>
      </View>
    </RadialGradient>
  );
}

const styles = StyleSheet.create({

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
    height: 28,
  },
  InputDivLabel:{
    color: '#056756',
    fontWeight: 800,
    fontSize: 15,
    fontFamily: 'Geologica-Regular',
    marginBottom: '3%',
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
    marginTop: '7%',
    alignItems: 'center',
  },
  RC2Mid: {
    marginTop: '-4%',
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
    height: '81%',
    backgroundColor: 'white',
    zIndex: 3,
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  registerContainer3: {
    width: '100%',
    height: '83.5%',
    backgroundColor: 'white',
    zIndex: 2,
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    opacity: 0.25,
  },
  RPTitleDiv: {
    width: '100%',
    height: '16%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 10,
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
    marginTop: '5%',
  }
});

export default DriverReg1;
