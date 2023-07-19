import { initializeApp } from 'firebase/app';
import { StyleSheet, Button, Text, View, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';



export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [favoriteGame, setFavoriteGame] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('User created:', user);
  
        // Save additional user data to Firestore
        const db = getFirestore();
        const userRef = doc(collection(db, 'users'), user.uid);
        const userData = {
          aboutMe,
          favoriteGame,
          username
        };
  
        setDoc(userRef, userData)
          .then(() => {
            console.log('User data saved to Firestore');
          })
          .catch((error) => {
            console.error('Error saving user data:', error);
          });
  
        Alert.alert('User Created', 'The user has been successfully created.');
        navigation.navigate('SignIn');
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        let errorMessage = 'An error occurred. Please try again.';
  
        if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid Email.';
        }
  
        console.log(error); // Add this line to log the error object
        Alert.alert('Sign Up Failed', errorMessage);
      });
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.message}>Fill in the details</Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="gray" style={styles.icon} />
        <TextInput
          placeholder='Email'
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="gray" style={styles.icon} />
        <TextInput
          placeholder='Username'
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="gray" style={styles.icon} />
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='About Me'
          style={styles.input}
          onChangeText={(text) => setAboutMe(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Favourite Game'
          style={styles.input}
          onChangeText={(text) => setFavoriteGame(text)}
        />
      </View>
      <View style={styles.signupButton}>
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          color="#0827F5"
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
  signupButton: {
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

});
