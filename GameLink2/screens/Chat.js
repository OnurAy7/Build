import { StyleSheet, Image, Text, Button, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { collection, onSnapshot, query, where, getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { ChatRow} from '../functions/ChatRow.js'

const ChatList = () => {
  const [matches, setMatches] = useState('');
  const {user} = getAuth();
  const db = getFirestore();

  useEffect(() => 
    onSnapshot(query(collection(db, 'matches'), where(matchedUsers,
      'array-contains' ,  user.uid)),
       (snapShot) => 
       setMatches(
        snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
       }))
    )

  ),
   [user]
  );

  return matches.length > 0 ? (
      <FlatList>
          data={matches}
          keyExtractor={item => item.id}
          renderitem={({item}) => <ChatRow>
            matchDetails={item}
          </ChatRow>}
      </FlatList>
       
    ) : (
      <View>
      <Text style={styles.message}>
        No matches at the moment
      </Text>
      </View>
  );
};

export default function Chat({ navigation }) {
  return (
    <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.back}>
        <Icon name="chevron-left" size={30} color="#0827F5"/>
        </TouchableOpacity>
        <Text style ={styles.chat}>
            Chat
        </Text>
        <ChatList>

        </ChatList>
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
      },
      message: {
        fontSize: 18,
        textAlign: 'center',
      },
      
})
