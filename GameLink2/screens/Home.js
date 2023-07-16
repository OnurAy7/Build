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
    
    {/* Header */}
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.send}>
                <Icon name="send" size={30} color="#0827F5"/>
            </TouchableOpacity>
        </View>

    {/* End of Header */}

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
      
      buttonContainer: {
        marginVertical: 150,
        marginHorizontal: 110,
        width: 200,
        borderRadius: 15,
        overflow: 'hidden',
      },
      send: {
        marginTop: 40,
        width: 30,
        alignSelf: 'flex-end',
        marginHorizontal: 10,
      }
})
