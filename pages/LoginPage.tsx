import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import LinearGradient from 'react-native-linear-gradient';

const LoginPage = () => {
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
      <Text style={styles.RPTop}>Already have an account? Login</Text>
      <View style={styles.RPTitleDiv}>
        <Text style={styles.RPTitle}>JEEPNI</Text>
      </View>
    </View>

      <View style={styles.registerContainer2}>
        <View style={styles.RC2Top}>
          <Text style={styles.RC2Title}>Welcome Back</Text>
          <Text style={styles.RC2Subtitle}>Ready to ride again? Sakay ka, Larga Ta!</Text>
        </View>
        <View style={styles.RC2Mid}>
          <View style={styles.InputDiv}>
              <Text style={styles.InputDivLabel}>Email Address</Text>
              <TextInput
              style={styles.input}
              placeholder="Input your email address"
              value={text}
              onChangeText={setText}
              />

              <Text style={styles.InputDivLabel}>Password</Text>
              <TextInput
              style={styles.input}
              placeholder="Input your email address"
              value={text2}
              onChangeText={setText2}
              />
          </View>
          <TouchableOpacity style={styles.RPButton}>
          <LinearGradient
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            colors={["#005F4F", "#053143"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={ styles.FPDiv}>
            <Text style={styles.FPDivText}>Forgot Your Password?</Text>
        </View>

        <View style={styles.SignInWith}>
          <View style={styles.horizontalLine} />
          <Text style={styles.orText}>or Sign in with</Text>
          <View style={styles.horizontalLine} />
        </View>

        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={ require('../src/img/Logo-google-icon-PNG.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.registerContainer3}>
      </View>
    </RadialGradient>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    width: '83%',
    alignSelf: 'center',
    marginBottom: 20,
  },

  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  googleButtonText: {
    color: '#056756',
    fontSize: 16,
    fontWeight: '500',
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
    marginBottom: '5%',
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
    fontSize: 27,
    fontWeight: '800',
    color: '#056756',
  },
  RC2Top: {
    marginTop: '10%',
    alignItems: 'center',
  },
  RC2Mid: {
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
    height: '78%',
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
  RPTitleDiv:{
    width: '100%',
    height: '100%',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    },
  RPTitle:{
    width: '100%',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 36,
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

export default LoginPage;
