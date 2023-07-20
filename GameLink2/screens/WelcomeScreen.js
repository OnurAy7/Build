import { StyleSheet, Image, Text, Button, View, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

// Defining WelcomeScreen
export default function WelcomeScreen({ navigation }) {
  return (
    // Setting up the welcome screen
    <SafeAreaView>
      <Text style={styles.title}>Welcome to GameLink</Text>
      <Text style={styles.message}>
        Prepare for exciting gaming adventures with other gamers. Prepare to
        take your gaming experience to the next level with GameLink. Continue to
        connect with other gamers that share your passion for gaming!
      </Text>
      <View>
      <Image 
      style={{
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginTop: 100,
        marginHorizontal: 110,
      }}
      source={require('../assets/Gamer.png')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={() => navigation.navigate('SignIn')}
          color="#0827F5"
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
// Styles for the above
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
