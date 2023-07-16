import { StyleSheet, Image, Text, Button, View, SafeAreaView, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signOut } from "firebase/auth";


export default function Home({ navigation }) {
    const Logout = () => {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            console.log('logged Out');
            Alert.alert('Logged Out');
            // Navigate to the login screen or any other desired screen
            navigation.navigate('SignIn');
          })
          .catch((error) => {
            console.log('Error logging out:', error);
          });
      };
  return (
    <SafeAreaView>
      <Text style={styles.title}>Home Screen</Text>
      <View style ={styles.buttonContainer}>
        <Button
          title="Messages"
          onPress={() => navigation.navigate('Chat')}
          color="#0827F5"
        />
      </View>
      <View style ={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress= {Logout}
          color="#0827F5"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 70,
        marginBottom: 50,
        textAlign: 'center',
      },
      message: {
        fontSize: 18,
        textAlign: 'center',
      },
      buttonContainer: {
        marginVertical: 150,
        marginHorizontal: 110,
        width: 200,
        borderRadius: 15,
        overflow: 'hidden',
      },
      icon: {
        marginRight: 10,
      }
})
