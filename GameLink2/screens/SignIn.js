import { StyleSheet, Button, Text, View, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";



export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Access the signed-in user
      const user = userCredential.user;
      console.log('Signed in:', user.email);
      navigation.navigate('Home');

    } catch (error) {
      // Handle sign-in errors
      console.error('Sign In Failed:', error.message);

      let errorMessage = 'An error occurred. Please try again.';

      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        errorMessage = 'Incorrect Email or Password.';
      }
  
      Alert.alert('Sign In Failed', errorMessage);
    }
  };

  return (
    <SafeAreaView style ={styles.container}>
      <Text style={styles.title}>
        Login
      </Text>
      <Text style={styles.message}>
        Sign in to continue
      </Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="gray" style={styles.icon} />
        <TextInput
          placeholder='Email' 
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
      </View>
      <View style ={styles.signinButton}>
        <Button
          title="Sign In"
          onPress={handleSignIn}
          color="#0827F5"
        />
      </View>
      <View style ={styles.accountButton}>
        <Button
          title="Create an account"
          onPress={() => navigation.navigate('SignUp')}
          color="#FF0000"
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  signinButton: {
    marginTop: 20,
    width: '80%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  message: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 30,
  },
  accountButton: {
    marginTop: 5,
    width: '80%',
    borderRadius: 15,
    overflow: 'hidden',
  },
});
