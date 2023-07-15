import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-gesture-handler';
import WelcomeScreen from './screens/WelcomeScreen';
import SignIn from './screens/SignIn';
import SignUp from './screens/Signup';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          Screen options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          Screen options={{headerShown: false}}
          />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          Screen options={{headerShown: false}}
          />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}