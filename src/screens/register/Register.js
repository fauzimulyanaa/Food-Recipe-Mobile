/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
// src/screens/authentication/Login/Login.js
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const Login = () => {
  const navigation = useNavigation();

  const handleSignInPress = () => {
    navigation.navigate('Login');
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      alert('Login berhasil!');
    } else {
      alert('Mohon masukkan username dan password.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper_image}>
        <Image
          source={require('../../assets/image-auth.png')}
          style={styles.image_auth}
        />
      </View>
      <View style={styles.tagline}>
        <Text style={styles.welcome}>Welcome !</Text>
        <Text style={styles.desc}>Register to Recipe App</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/user.png')}
            style={styles.icon}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="myname"
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/user.png')}
            style={styles.icon}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="examplexxx@gmail.com"
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../../assets/lock.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Masukkan password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.dontHaveAccountText}>have an account? </Text>
        <TouchableOpacity onPress={handleSignInPress}>
          <Text style={styles.signUpText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: -19,
    padding: 0,
  },
  tagline: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  welcome: {
    color: '#EFC81A',
    fontSize: 28,
  },
  desc: {
    color: '#C4C4C4',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 9,
    marginHorizontal: 20,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  image_auth: {
    width: 393,
    margin: 'auto',
  },

  wrapper_image: {
    padding: 0,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 4,
    marginRight: 30,
  },
  forgotPasswordText: {
    color: '#999999',
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#EFC81A',
    padding: 19,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
  },
  dontHaveAccountText: {
    color: 'black',
  },
  signUpText: {
    color: '#EFC81A',
  },
});

export default Login;
