import { StyleSheet, Image, Text, Button, View, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({ navigation }) {
  return (
    <SafeAreaView>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.message}>
      <View style ={styles.buttonContainer}>
        <Button
          title="Messages"
          onPress={() => navigation.navigate('Chat')}
          color="grey"
        />
      </View>
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
      icon: {
        marginRight: 10,
      }
})
