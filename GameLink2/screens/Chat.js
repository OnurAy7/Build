import { StyleSheet, Image, Text, Button, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Chat({ navigation }) {
  return (
    <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.back}>
        <Icon name="chevron-left" size={30} color="#0827F5"/>
        </TouchableOpacity>
        <Text style ={styles.chat}>
            Chat
        </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

    chat: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      back: {
        marginTop: 40,
        width: 30,
        alignSelf: 'flex-start',
        marginHorizontal: 10,
      }
      
})
