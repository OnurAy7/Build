import { StyleSheet, Image, Text, Button, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';


export default function Home({}) {
    const navigation = useNavigation();
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
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.send}>
                <Icon name="send" size={30} color="#0827F5"/>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profile}>
                <Icon name="user" size={30} color="#0827F5"/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
      
      buttonContainer: {
        marginVertical: 150,
        marginHorizontal: 110,
        width: 200,
        borderRadius: 15,
        overflow: 'hidden',
      },
      send: {
        marginTop: 40,
        width: 40,
        marginHorizontal: 10,
        alignSelf: 'flex-end',
        position: 'absolute',

      },
      profile: {
        marginTop: 40,
        width: 30,
        alignSelf: 'flex-start',
        marginHorizontal: 10,
        position: 'absolute',

      }
      
})
