import { StyleSheet, Image, Text, Button, View, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function Chat({ navigation }) {
  return (
    <SafeAreaView>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.message}>
        
      </Text>
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
})
